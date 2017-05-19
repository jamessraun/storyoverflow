'use strict';
module.exports = function(sequelize, DataTypes) {
  var Vote = sequelize.define('Vote', {
    idea_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      counter: function(ideaID,callback){
          sequelize.query(`select count(idea_id) from "Votes" where idea_id=${ideaID}`,{type:sequelize.QueryTypes.SELECT})
          .then (vote=>{
            callback(vote)
          })
          .catch(err => {
            console.log(err);
          })
      }
    }
  });
  return Vote;
};
