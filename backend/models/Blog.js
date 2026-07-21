const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  excerpt: String,
  imageUrl: String,
  createdAt: Date,
  author: String,
  category: String,
  content: String,
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  bookmarkedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Blog', blogSchema);
