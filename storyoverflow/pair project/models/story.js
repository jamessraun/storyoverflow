'use strict';
module.exports = function(sequelize, DataTypes) {
  var Story = sequelize.define('Story', {
    title: DataTypes.STRING,
    premise: DataTypes.STRING,
    ask_story: DataTypes.STRING,
    is_answered: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Story;
};