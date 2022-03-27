var express = require('express');
var router = express.Router();
var userController = require('../user/user-controller');
var stockController = require('../stock/stock-controller');

router.get('/', function(req, res, next) {
  res.status(200).json({Say: "Hello world"})
});

router.route('/user/register')
  .post( userController.register);

router.route('/user/login')
  .post( userController.login);



router.route('/stock')
  .get(stockController.getStock);

router.route('/stock/history')
  .get(stockController.getHistory);

router.route('/stock/stats')
  .get(stockController.getStats);



module.exports = router;
