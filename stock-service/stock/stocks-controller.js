const stockService = require('./stocks-service');

const getStock = async(req, res) =>{
    const stockCode = req.params.stock_code;
    let stockResult = await stockService.getStock(stockCode);
    if(stockResult.error)
        return res.status(stockResult.status).json(stockResult);

    return res.json(stockResult);
}


module.exports =  { getStock };