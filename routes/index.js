const express = require('express');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const db = require('../models');

var router = express.Router();



router.get('/', (req, res, next) => {

  res.render('index')

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
      // res.redirect('/login');
      res.json(user);
      //console.log(user);
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

        let token = jwt.sign(data, 'secret', {
            expiresIn: '1h'
        })
        res.json({
            message: 'Login is Successful',
            token,
            username: data.username
        })
    } else {
        res.json({
            message: 'Your password is not match'
        })
}
  })

})






module.exports = router;
