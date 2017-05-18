'use strict';
module.exports = function(sequelize, DataTypes) {
  var Idea = sequelize.define('Idea', {
    idea: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Idea;
};