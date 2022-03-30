var express = require('express');
var router = express.Router();
var stockController = require('../stock/stock.controller');

router.route('/:stock_code')
  .get(stockController.getStock);

module.exports = router;
