const express = require('express');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const db = require('../models');


var router = express.Router();



router.get('/profile/:id',(req,res,send)=>{
  let password;
  db.User.findOne({
    where:{
      id: req.params.id
    }
  })
  .then(user=>{
    password = user.password.replace(/[0-9,a-z]/gi,'*')
    res.render('profile',{title:user.name, user:user, password: password})
  })
})

router.get('/edit/:id', (req,res,send)=>{
  db.User.findOne({
    where:{
      id: req.params.id
    }
  })
  .then(user =>{    
    res.render('edit',{user: user})
  })
})

router.post('/update/:id',function(req,res,next){
  db.User.update({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    phone: req.body.phone
  },{
    where:{
      id:req.params.id
    }
  })
  .then(function(){
    db.User.findOne({
      where:{
        id: req.params.id
      }
    })
    .then(user=>{
      res.redirect(`/user/profile/${user.id}`)
    })    
  })
})

module.exports = router;
