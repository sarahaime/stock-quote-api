const stockService = require('./stock-service');

const getStock = async (req, res) =>{
    const quote = req.query.q;

    if(!quote)
        return res.status(400).json({error: "Stock code is required"});

    let ans = await stockService.getStock(req.user.id, quote)
    return res.json(ans);
}

const getHistory = async (req, res) =>{
    let history = await stockService.getHistory(req.user.id);
    return res.json(history);
}

const getStats = async (req, res) =>{
    let stats = await stockService.getStats();
    return res.json(stats);
}


module.exports = { getStock, getHistory, getStats };