const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  idCode: { type: String, required: true },   // Must be 'D15C' (case-insensitive check done in route)
  passwordHash: { type: String, required: true }, // Hashed password
  displayName: { type: String, default: '' }, // Optional display name
  profilePicture: { type: String, default: '' }, // URL or path to profile picture
});

module.exports = mongoose.model('AdminUser', adminUserSchema);
