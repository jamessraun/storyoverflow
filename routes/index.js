const express = require('express');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const db = require('../models');
const helper = require('../helper/helper');
const tokenValidation = require('../helper/tokenValidation');

var router = express.Router();

 router.get('/',(req,res,next) => {
   let user={id:0};
   console.log(user);
  db.Story.getAllData(stories=>{
    res.render('index',{stories:stories,user:user})
  })
})

router.get('/signup', (req, res, next) => {

  res.render('signup')
})

router.post('/signup', (req, res, next) => {

  let pwdHash = req.body.password

  db.User.create({
    username: req.body.username,
    password: passwordHash.generate(pwdHash),
    email:req.body.email,
    phone: req.body.phone,
    name: req.body.name
  })
    .then(user => {
      res.redirect('/');
    })
})


router.get('/login', (req, res, next) => {
  res.render('login')
})


router.post('/login', (req, res, next) => {

  db.User.findOne({
    where: {
      username: req.body.username
    }
  })
  .then (record => {

    let pwdHash = req.body.password
    if (passwordHash.verify(pwdHash, record.password)) {
        let data = Object.assign({}, record.toJSON())
        console.log(data);

        let tokenData = jwt.sign(data, 'secret', {
            expiresIn: '1h'
        })
        record.update({token:'true'})
        .then (user => {
          res.redirect(`/user/${record.id}`);
        })

    } else {
        res.json({
            message: 'Your password is not match'
        })
}
  })

})

router.get('/story/:story_id',(req,res,next)=>{
  db.Story.findOne({
    where:{
      id: req.params.story_id
    }
  })
  .then(story=>{
      res.render('story',{story:story})
  })
})




module.exports = router;
