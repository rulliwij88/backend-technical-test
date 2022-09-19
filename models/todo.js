'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  todo.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    activity_group_id: {
      allowNull: false,
      foreignKey: true,
      type: DataTypes.STRING
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    is_active: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    priority: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'very-high'
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'todo',
    underscored: true,
  });
  return todo;
};