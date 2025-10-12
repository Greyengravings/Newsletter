const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displayName: String,
  profilePicture: String,
  bookmarkedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  membershipEndDate: { type: Date, default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }, // 30 days from now
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
