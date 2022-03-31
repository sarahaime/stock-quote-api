var express = require('express');
var router = express.Router();
var stockController = require('../app/stock/stock.controller');
var authorize = require('../middlewares/access-validations');


 /**
  * @swagger
  * /stock:
  *  get:
  *   summary: Get stock by stock code
  *   description: Get stock by stock code
  *   parameters:
  *      - name: q
  *        in: query
  *        required: true
  *        description: Stock code or symbol
  *        schema:
  *          type : string
  *   responses:
  *    200:
  *     description: Get stock success
  *     content:
  *      application/json:
  *    500:
  *     description: Internal server error
  *     content:
  *      application/json:
  *       schema:
  *        $ref: '#/definitions/ErrorRes'
  *    502:
  *     description: Stock service down
  *     content:
  *      application/json:
  *       schema:
  *        $ref: '#/definitions/ErrorRes'
  *    404:
  *     description: Not found
  *     content:
  *      application/json:
  *       schema:
  *        $ref: '#/definitions/ErrorRes'
  */
router.route('')
  .get(authorize.authorize(), stockController.getStock);

router.route('/history')
  .get(authorize.authorize(), stockController.getHistory);

router.route('/stats')
  .get(authorize.authorize(['super_user']), stockController.getStats);

module.exports = router;
