const { string } = require("@hapi/joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tokenSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true, 
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 24*60*60,
  },
});

const tokenModel =  mongoose.model("Token", tokenSchema);

module.exports = tokenModel;