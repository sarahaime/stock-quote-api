const stockService = require('./stocks-service');

const getStock = async(req, res) =>{
    const stockCode = req.params.stock_code;
    let stock = await stockService.getStock(stockCode);
    return res.json(stock);
}


module.exports = { getStock };