var express = require('express');
var router = express.Router();
var stockController = require('../stock/stocks-controller');

router.route('/:stock_code')
  .get(stockController.getStock);

module.exports = router;
