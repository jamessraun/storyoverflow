'use strict';
module.exports = function(sequelize, DataTypes) {
  var Stories = sequelize.define('Stories', {
    title: DataTypes.STRING,
    premise: DataTypes.STRING,
    story: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Stories;
};