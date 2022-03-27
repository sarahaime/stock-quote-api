var express = require('express');
var router = express.Router();
var userController = require('../user/user-controller');
var stockController = require('../stock/stock-controller');
var authorize = require('../middlewares/access-validations');

router.get('/', function(req, res, next) {
  res.status(200).json({Say: "Hello world"})
});

router.route('/user/register')
  .post( userController.register);

router.route('/user/login')
  .post( userController.login);



router.route('/stock')
  .get(authorize.authorize(), stockController.getStock);

router.route('/stock/history')
  .get(authorize.authorize(), stockController.getHistory);

router.route('/stock/stats')
  .get(authorize.authorize(['super_user']), stockController.getStats);



module.exports = router;
