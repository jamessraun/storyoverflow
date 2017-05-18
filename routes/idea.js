const express = require('express');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const db = require('../models');
const helper = require('../helper/helper');
const tokenValidation = require('../helper/tokenValidation');

var router = express.Router();

router.get('/',(req,res,next)=>{
  res.render ('idea')
})
module.exports = router