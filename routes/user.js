const express = require('express');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const db = require('../models');

var router = express.Router();
const helper = require('../helper/helper');


router.get('/:id', (req, res, next) => {

  db.User.findOne({where:{id:req.params.id}})
  .then (user =>{
    console.log(user);
      if(user.token==='true'){
        db.Story.getAllData(stories => {
          res.render('index', {
            stories: stories,
            user: user
          })
        })
      }else {
        res.redirect('/');
      }
  })
})

router.get('/profile/:id', (req, res, send) => {
  let password;
  db.User.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(user => {
      password = user.password.replace(/[0-9,a-z]/gi, '*')
      res.render('profile', {
        title: user.name,
        user: user,
        password: password
      })
    })
})

router.get('/edit/:id', (req, res, send) => {
  db.User.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(user => {
      res.render('edit', {
        user: user
      })
    })
})

router.post('/update/:id', function(req, res, next) {
  db.User.update({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      phone: req.body.phone
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(function() {
      db.User.findOne({
          where: {
            id: req.params.id
          }
        })
        .then(user => {
          res.redirect(`/user/profile/${user.id}`)
        })
    })
})


router.get('/mystories/:id', (req, res, next) => {

  db.Story.findAll({
      where: {
        user_id: req.params.id
      }
    })
    .then(stories => {
      let token = helper[1].token
      db.Story.getAllData(stories => {
        jwt.verify(token, 'secret', function(err, decoded) {
          res.render('mystory', {
            stories: stories,
            user: decoded
          })
        })
      })
    })
})

router.post('/mystories/add/:id', (req, res, next) => {

  db.Story.create({
      user_id: req.params.id,
      title: req.body.title,
      premise: req.body.premise,
      story: req.body.story,
      question: req.body.question
    })
    .then(story => {
      console.log(story);
      res.redirect(`/user/mystories/${story.user_id}`)
    })
})

router.get('/logout/:id',(req,res,next) => {
  db.User.update({token:'false'},{
      where: {
        id: req.params.id
      }
    })
    .then(user => {
      res.redirect('/')
    })
})

module.exports = router;
