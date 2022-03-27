const StockReadModel = require('../models/stockRead'); 
const ObjectId = require('mongoose').Types.ObjectId; 
const getStock = async (userId, symbol) =>{

    //call stock service
    const stock = {
            name: "APPLE",
            symbol: symbol,
            open: 123.66,
            high: 123.66,
            low: 122.49,
            close: 123
        };
      
    //store read
    await saveRead(userId, stock );
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