const express = require('express');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const db = require('../models');
const OAuth = require('oauth');
const helper = require('../helper/helper');
var router = express.Router();
var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  'QsfM5d9LjYPqj7vlSnq1qH7SJ',
  'Iwnxj7GV2jML1Kaa8d0v5copUaxM1ii2CNLRItvZ3IDiUTJ8xA',
  '1.0A',
  null,
  'HMAC-SHA1'
);


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
      if(user.token==='true'){
      password = user.password.replace(/[0-9,a-z]/gi, '*')
      res.render('profile', {
        title: user.name,
        user: user,
        password: password
      })
    }else res.redirect('/');
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
      db.User.findOne({where:{id:req.params.id}})
      .then (user =>{
        console.log(user);
          if(user.token==='true'){
            res.render('mystory', {stories:stories,user: req.params.id})
          }else {
            res.redirect('/');
          }
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
      db.User.findOne({where:{id:req.params.id}})
      .then (user => {
        oauth.post(
                    `https://api.twitter.com/1.1/statuses/update.json?status=Storyoverflow Title ${req.body.title} by ${user.username}`,
                    '92482986-txPe9Om42nzISmAgErpDxV5Zt343cFOP81h465kpR',
                    'WbQ6LiF3l53jnVvB6E8nbg43JSEbJViPB2bamjqjzMpbx',
                    req.body.title,
                    'text',
                    function(e, data) {
                      if (e) console.error(data);
                      console.log(story);
                      res.redirect(`/user/mystories/${story.user_id}`)
                    }
                  );
      })

    })
})

router.get('/logout/:id',(req,res,next) => {
  db.User.update({token:'false'},{
      where: {
        id: +req.params.id
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

router.get('/:id/delete/mystory/:story_id',(req,res,next)=>{
  db.Story.destroy({
    where:{
      id:req.params.story_id
    }
  })
  .then(data=>{
    res.redirect(`/user/mystories/${req.params.id}`)
  })
})

router.get('/:id/idea/story/:story_id',(req,res,next)=>{

  db.User.findOne({where:{id:req.params.id}})
  .then (user =>{
    console.log(user);
      if(user.token==='true'){
        db.Story.findOne({
          where:{
            id: req.params.story_id
          }
        })
        .then(story=>{
          db.User.findOne({
            where:{
              id: req.params.id
            }
          })
          .then(user=>{
              db.Idea.findAll({where:{story_id:req.params.story_id},order:'"createdAt" DESC'})
              .then(ideas => {
                db.User.findAll()
                .then(listUser =>{
                  res.render('ideaStory',{story:story,user:user,ideas:ideas,listUser:listUser})
                })
              })
          })
        })
      }else {
        res.redirect('/');
      }
  })

})




module.exports = router;
