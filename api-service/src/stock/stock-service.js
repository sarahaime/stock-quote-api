const StockReadModel = require('../models/stockRead'); 
const axios = require('axios');
require('dotenv').config();
const ObjectId = require('mongoose').Types.ObjectId; 

const getStock = async (userId, stockCode) =>{
    let url = `${process.env.STOCK_SERVICE_URL}/stock/${stockCode}`;
    
    const stockResp = await axios.get(url).catch( err => {
        return err.response.data;
    });

    if(stockResp.error)
        return stockResp;

    const stock = stockResp.data;
    await saveRead(userId, stock);
    return stock;
}

const getHistory = async (userId) =>{
    return await StockReadModel.aggregate( [
        {
            $match: {
                userId: new ObjectId(userId)
            }
        },
        {
            $sort: { 
                date: -1 
            }
         },
         { 
            $project: {
                _id: 0,
                __v: 0,
               userId: 0 
            }
        } ] );
}

const getStats = async (limit = 5) =>{
    return await StockReadModel.aggregate( [
        { 
            $group: {
              _id:  "$symbol",
              times_requested: { $sum: 1 } 
            } 
         },
         {
            $sort: { 
                times_requested: -1 
            }
         },
         { 
            $project: {
                _id: 0,
                stock: "$_id",
                times_requested: "$times_requested"
            }
        } ] ).limit(limit);
}

const saveRead = async ( userId, stock) =>{
    const newStockRead = new StockReadModel({...stock, userId: userId});
    await newStockRead.save();
};


module.exports = { getStock, getHistory, getStats}