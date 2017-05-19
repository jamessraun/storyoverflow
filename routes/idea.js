const express = require('express');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const db = require('../models');
const helper = require('../helper/helper');
const tokenValidation = require('../helper/tokenValidation');

var router = express.Router();

// router.get('/',(req,res,next)=>{
//   res.render ('idea')
// })

router.post('/add/:id/:story_id',(req,res,next)=>{
  db.Idea.create({idea:req.body.idea,user_id:req.params.id,story_id:req.params.story_id})
  .then(idea=>{
      res.redirect(`/user/${req.params.id}/idea/story/${req.params.story_id}`)
  })
})

router.get('/vote/:idea_id/:story_id/:id',(req,res,next)=>{

    db.Vote.create({idea_id:req.params.idea_id,user_id:req.params.id})
    .then((asu)=> {
      console.log(asu);
      res.redirect(`user/${req.params.id}/idea/story/${req.params.story_id}`)
    })
})

module.exports = router
