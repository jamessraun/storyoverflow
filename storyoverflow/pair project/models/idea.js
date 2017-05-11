'use strict';
module.exports = function(sequelize, DataTypes) {
  var Idea = sequelize.define('Idea', {
    idea: DataTypes.STRING,
    is_accepted: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Idea;
};