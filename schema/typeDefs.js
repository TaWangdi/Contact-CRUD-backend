const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    token: String
  }

  type Contact {
    id: ID!
    username: String!
    email: String!
    phone: String!
}


  input ContactInput {
    username: String!
    email: String!
    phone: String!
  }

  type Query {
    contacts: [Contact]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    createContact(input: ContactInput!): Contact
    updateContact(id: ID!, input: ContactInput!): Contact
    deleteContact(id: ID!): Boolean
  }
`;

module.exports = typeDefs;
