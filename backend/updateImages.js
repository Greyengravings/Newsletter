const mongoose = require('mongoose');
const Blog = require('./models/Blog');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const mongoURI = process.env.MONGODB_URI;

const updates = [
  {
    title: 'A Journey Through VESIT: More Than Just an Engineering College',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxm12O2yAp1cMyhZhm6VwsPHBChcH6IGDHuvfD6vepOb0sT4-A44dsS8Pz&s=10'
  },
  {
    title: 'My Smart India Hackathon Experience: Innovation Under Pressure',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000'
  },
  {
    title: 'Getting Started with Full Stack Development: A Beginner\'s Guide',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000'
  },
  {
    title: 'A Deep Dive into Tailwind CSS: Utility-First Styling',
    imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1000'
  }
];

const updateImages = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    for (const update of updates) {
      const result = await Blog.updateOne(
        { title: update.title },
        { $set: { imageUrl: update.imageUrl } }
      );
      if (result.matchedCount > 0) {
        console.log(`Updated image for: ${update.title}`);
      } else {
        console.log(`No blog found with title: ${update.title}`);
      }
    }

    console.log('Image update process completed');
    mongoose.disconnect();
  } catch (err) {
    console.error('Error updating images:', err);
  }
};

updateImages();
