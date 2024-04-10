const express = require("express");
const app = express();
var router = express.Router();

const db = require("../routes/database");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/index', (req, res) => {
  res.send('<h1>Homepage!</h1>');
});

module.exports = router;
