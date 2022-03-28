const stockService = require('./stock-service');

const getStock = async (req, res) =>{
    const quote = req.query.q;

    if(!quote)
        return res.status(400).json({error: "Stock code is required"});

    let stockRead = await stockService.getStock(req.user.id, quote)

    if(stockRead.error)
        return res.status(stockRead.status).json({ error: stockRead.error });

    return res.json(stockRead);
}

const getHistory = async (req, res) =>{
    try{
        let history = await stockService.getHistory(req.user.id);
        return res.json(history);
    }catch (error) {
        console.error("****************************", error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
      }
      
}

const getStats = async (req, res) =>{
    let stats = await stockService.getStats();
    return res.json(stats);
}


module.exports = { getStock, getHistory, getStats };