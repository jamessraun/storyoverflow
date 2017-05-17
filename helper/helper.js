const db = require('../models');

function validation (id){
    db.User.findOne({where:{id:id}})
    .then (user =>{
      return user;
    })
}

module.exports =validation;
