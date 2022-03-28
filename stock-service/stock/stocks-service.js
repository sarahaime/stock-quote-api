
const axios = require('axios');

const getStock = async (stockCode) =>{
    let resp = await axios.get(`https://stooq.com/q/l/?s=${stockCode}&f=sd2t2ohlcvn&h&e=csv`);
    const stock = getStockReadFromCsv(resp.data);
    delete stock.date;
    return stock;
}

const getStockReadFromCsv = (csv) => {
    const rows = csv.replace('\r','').split('\n');
    const columns = rows[0].split(',');
    
    const jsonObj = {};

    const firsRow = rows[1].split(",");
    for(let j=0;j<columns.length;j++){
        jsonObj[columns[j].toLowerCase()] = firsRow[j].replace('\r','');
    }
      
    
    return jsonObj;
}

module.exports = { getStock };