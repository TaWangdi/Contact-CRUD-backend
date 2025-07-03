const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Contact } = require('../models');  // <-- Make sure this is correct path and import

const resolvers = {
  Query: {
    contacts: async () => await Contact.findAll(),
  },

  Mutation: {
    register: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hashedPassword });
      return { id: user.id, username: user.username, email: user.email };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('User not found');
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', {
        expiresIn: '1d',
      });

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        token,
      };
    },

    createContact: async (_, { input }) => {
      const { username, email, phone } = input;
      return await Contact.create({ username, email, phone });
    },

    updateContact: async (_, { id, input }) => {
      const contact = await Contact.findByPk(id);
      if (!contact) throw new Error('Contact not found');

      await contact.update(input);
      return contact;
    },

    deleteContact: async (_, { id }) => {
      const deleted = await Contact.destroy({ where: { id } });
      return deleted > 0;
    },
  },
};

module.exports = resolvers;
