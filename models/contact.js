module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING
});

return Contact;
};
