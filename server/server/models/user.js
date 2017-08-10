'use strict';

export default (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      notNull: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      notNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      notNull: true,
    },
    image: {
      type: DataTypes.STRING,
      notNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
    } 
  },
  {
    freezeTableName: true,
  });
  User.associate = (models) => {
    User.belongsTo(models.UserType, {foreignKey: 'user_type_id', targetKey: 'id'});
    User.belongsTo(models.AccountType, {foreignKey: 'account_type_id', targetKey: 'id'});
  }
  return User;
};
