const express = require('express');
const router = express.Router();
const OAuth = require('oauth');
const db = require('../models')

router.get('/', (req, res) => {
  db.Story.findAll()
    .then(stories=>{
      res.render('index', {user: req.session.user, story: stories, message: '', error: 'No Story Yet' });
    })
})



var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  'QsfM5d9LjYPqj7vlSnq1qH7SJ',
  'Iwnxj7GV2jML1Kaa8d0v5copUaxM1ii2CNLRItvZ3IDiUTJ8xA',
  '1.0A',
  null,
  'HMAC-SHA1'
);




router.post('/story', (req, res) => {
  oauth.post(
    `https://api.twitter.com/1.1/statuses/update.json?status=${req.body.premise}`,
    '92482986-txPe9Om42nzISmAgErpDxV5Zt343cFOP81h465kpR',
    'WbQ6LiF3l53jnVvB6E8nbg43JSEbJViPB2bamjqjzMpbx',
    req.body.premise,
    'text',
    function(e, data) {
      if (e) console.error(e);
      console.log('success');
      res.redirect('/');
    }
  );
})


module.exports = router;
