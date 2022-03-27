const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = Schema({
  email: {
    type: String,
    required: true,
    trim: true, 
    unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String,
    enum : ['user','admin', 'super_user', 'super_admin'],
    required: true 
  },
  stockReads: [{
    type: Schema.Types.ObjectId,
    ref: "stockRead"
  }]
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

