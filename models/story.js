'use strict';
module.exports = function(sequelize, DataTypes) {
  var Story = sequelize.define('Story', {
    title: DataTypes.STRING,
    premise: DataTypes.STRING,
    story: DataTypes.TEXT,
    question:DataTypes.STRING,
    user_id:DataTypes.INTEGER

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Story.belongsTo(models.User,{foreignKey:'user_id'})
      },
      getAllData: function(callback){
        sequelize.query('select s.id,s.story,s.title,s.premise,s.question,u.username,s."createdAt" from "Stories" s left join "Users" u on s.user_id=u.id order by "createdAt" DESC',{type:sequelize.QueryTypes.SELECT})
        .then (stories=>{
          callback(stories)
        })
        .catch(err => {
          console.log(err);
        })
      }

    }
  });
  return Story;
};
