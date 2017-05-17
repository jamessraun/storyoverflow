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
      email: req.body.email,
      phone: req.body.phone
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(function() {
    res.redirect(`/user/profile/${req.params.id}`)
    })
})


router.get('/mystories/:id', (req, res, next) => {
  db.Story.findAll({
      where: {
        user_id: +req.params.id
      }
    })
    .then(stories => {
      res.render('mystory', {stories:stories,user: req.params.id})
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

router.get('/:id/edit/mystory/:story_id',(req,res,next)=>{
  db.Story.findOne({
    where:{
      id:req.params.story_id
    }
  })
  .then(story=>{
    res.render('editmystory',{story:story})
  })
})

router.post('/:id/edit/mystory/:story_id',(req,res,next)=>{
  db.Story.update({
    title: req.body.title,
    premise: req.body.premise,
    question: req.body.question,
    story: req.body.story
  },{
    where:{
      id: req.params.story_id
    }
  })
  .then(data=>{
    console.log(req.params);
    res.redirect(`/user/mystories/${req.params.id}`)
  })
})

module.exports = router;
