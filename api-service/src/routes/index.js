var express = require('express');
var router = express.Router();
var userController = require('../user/user-controller');
var stockController = require('../stock/stock-controller');
var authorize = require('../middlewares/access-validations');

router.get('/', function(req, res, next) {
  res.status(200).json({Say: "Hello world"})
});

module.exports = router;
