const express = require('express');
const router = express.Router();
const db = require('../models')

router.get('/', (req, res, next) => {
  res.render('index')
})


router.get('/SignUp',(req,res,next)=>{
  res.render('./SignUp',{user:req.session.user, message:'',error:''})
})

router.post('/SignUp', (req,res,next)=>{
  const username = req.body.username
  const password = req.body.password
  const phone = req.body.phone
  const email = req.body.email


db.User.create({username: username,password: password, phone: phone, email:email})
.then (user =>{
  console.log(`Created user ${user.username}`);
  res.render('./login', {user: req.session.user, message:`Success registered ${user.username},please login to continue`, error: ''})
  })
})

router.get('/login', (req,res,render)=>{
  res.render('./login', {user: req.session.user, message: '', error: ''})
})

router.post('/login', (req,res,next)=>{
  db.User.findOne({where: {username:req.body.username, password:req.body.password}})
  .then(user =>{
    if(user){
      console.log(`Login Success!`);
      req.session.user = user
      res.redirect('/')
    }
    else{
      res.render('./login', {user: req.session.user, message:'', error: 'Invalid Username/Password!'} )
    }
  })
})

router.get('/profile', (req,res,render)=>{
  res.render('./profile/profile', {user: req.session.user, message: '', error: ''})
})







module.exports = router;
