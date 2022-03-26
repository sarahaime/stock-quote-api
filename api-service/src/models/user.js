const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: {
    type: String, required: true,
    trim: true, unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  },
  password: { type: String, required: true },
  role: { type: String, required: true }
});

const model = mongoose.model('User', UserSchema);

module.exports = model;

