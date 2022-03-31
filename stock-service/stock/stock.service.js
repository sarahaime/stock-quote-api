
const axios = require('axios');

const getStock = async (stockCode) =>{
    let resp = await axios.get(`https://stooq.com/q/l/?s=${stockCode}&f=sd2t2ohlcvn&h&e=csv`).catch( err => {
       return {  error: 'Internal problem on stooq, please try again later', status: 502 }
    });

    if(resp.error)
        return resp;

    const stock = getStockReadFromCsv(resp.data);
    if(stock.open == 'N/D')
        return {  error: `${stockCode} is not available on stooq.com`, status: 404 };

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