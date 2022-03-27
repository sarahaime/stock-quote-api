var express = require('express');
var router = express.Router();
var stockController = require('../stock/stock-controller');
var authorize = require('../middlewares/access-validations');

router.route('')
  .get(authorize.authorize(), stockController.getStock);

router.route('/history')
  .get(authorize.authorize(), stockController.getHistory);

router.route('/stats')
  .get(authorize.authorize(['super_user']), stockController.getStats);

module.exports = router;
