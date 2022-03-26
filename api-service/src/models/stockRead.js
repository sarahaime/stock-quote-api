const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockReadSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
    },
    symbol: {
        type: String,
        required: true,
    },
    open: {
        type: Number
    },
    high: {
        type: Number
    },
    low: {
        type: Number
    },
    close: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const stockReadModel = mongoose.model('stockRead', stockReadSchema);
module.exports = stockReadModel;