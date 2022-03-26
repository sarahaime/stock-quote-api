const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: {
    type: String, required: true,
    trim: true, unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  },
  password: { type: String, required: true },
  role: { type: String,
          enum : ['user','admin', 'super_user', 'super_admin'],
          required: true }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

