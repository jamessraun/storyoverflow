const express = require('express');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const db = require('../models');


var router = express.Router();





router.get('/signup',(req,res,next) => {

  db.User.create(req.body)
  .then(user => {
    res.redirect('/user/login');
  })

})






module.exports = router;
