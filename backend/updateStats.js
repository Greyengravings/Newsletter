const mongoose = require('mongoose');
const Blog = require('./models/Blog');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error('Error: MONGODB_URI not found in .env file');
  process.exit(1);
}

const updateStats = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    const blogs = await Blog.find();
    console.log(`Found ${blogs.length} blogs`);

    for (const blog of blogs) {
      const randomViews = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
      const randomLikes = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;

      blog.views = randomViews;
      blog.likes = randomLikes;
      await blog.save();
      console.log(`Updated blog "${blog.title}": Views=${randomViews}, Likes=${randomLikes}`);
    }

    console.log('All blogs updated successfully');
    mongoose.disconnect();
  } catch (err) {
    console.error('Error updating stats:', err);
  }
};

updateStats();
