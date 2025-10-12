const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

// GET all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching blogs', error: err.message });
  }
});

// GET blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching blog', error: err.message });
  }
});

// POST create new blog
router.post('/', async (req, res) => {
  try {
    const newBlog = new Blog({
      title: req.body.title,
      excerpt: req.body.excerpt,
      imageUrl: req.body.imageUrl,
      createdAt: req.body.createdAt || Date.now(),
      author: req.body.author,
      category: req.body.category,
      content: req.body.content,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(400).json({ message: 'Error creating blog post', error: err.message });
  }
});

// PUT update blog by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBlog) return res.status(404).json({ message: 'Blog not found' });
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: 'Error updating blog', error: err.message });
  }
});

// DELETE blog by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting blog', error: err.message });
  }
});

// POST bookmark a blog
router.post('/:id/bookmark', async (req, res) => {
  try {
    const { userId } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if already bookmarked
    if (blog.bookmarkedBy.includes(userId)) {
      return res.status(400).json({ message: 'Blog already bookmarked' });
    }

    blog.bookmarkedBy.push(userId);
    user.bookmarkedPosts.push(blog._id);

    await blog.save();
    await user.save();

    res.json({ message: 'Blog bookmarked successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error bookmarking blog', error: err.message });
  }
});

// DELETE unbookmark a blog
router.delete('/:id/bookmark', async (req, res) => {
  try {
    const { userId } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    blog.bookmarkedBy = blog.bookmarkedBy.filter(id => id.toString() !== userId);
    user.bookmarkedPosts = user.bookmarkedPosts.filter(id => id.toString() !== req.params.id);

    await blog.save();
    await user.save();

    res.json({ message: 'Blog unbookmarked successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error unbookmarking blog', error: err.message });
  }
});

// GET bookmarked blogs for a user
router.get('/user/:userId/bookmarks', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('bookmarkedPosts');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user.bookmarkedPosts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookmarks', error: err.message });
  }
});

// POST increment view count
router.post('/:id/view', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.json({ views: blog.views });
  } catch (err) {
    res.status(500).json({ message: 'Error updating views', error: err.message });
  }
});

module.exports = router;
