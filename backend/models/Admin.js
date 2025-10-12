const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: String,
  password: String, // Remember to store hashed passwords in production!
  phoneNumber: String,
  specialId: String,
  createdAt: Date,
});

module.exports = mongoose.model('Admin', adminSchema);
