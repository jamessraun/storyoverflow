const express = require('express');
const index = require('./routes/index');
const user = require('./routes/user');
const bodyParser = require('body-parser');
const ejs = require('ejs');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));


app.use('/',index);
app.use('/user',user);





app.listen(3000)
