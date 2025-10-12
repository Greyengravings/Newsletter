const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const AdminUser = require('../models/AdminUser');
const User = require('../models/User');
const router = express.Router();

router.post('/logout', (req, res) => {
  // Since authentication is stateless, just respond success
  res.json({ message: 'Logout successful' });
});

// Configure multer for profile picture uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Register new admin (specialId validation removed)
router.post('/register', async (req, res) => {
  const { username, email, phoneNumber, specialId, password } = req.body;

  console.log('Received register data:', req.body);

  if (!password || password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' });
  }

  try {
    const existingUser = await AdminUser.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      console.log('Email or username already exists:', email, username);
      return res.status(409).json({ message: 'Email or username already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newAdmin = new AdminUser({
      username,
      email,
      phoneNumber,
      idCode: specialId ? specialId.trim().toUpperCase() : '',
      passwordHash,
    });

    console.log('Saving new admin:', newAdmin);

    await newAdmin.save();
    console.log('Admin saved successfully');

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// Login admin (updated to return userId)
router.post('/login', async (req, res) => {
  const { email, password, specialId } = req.body;

  try {
    console.log('Admin login attempt for email:', email);
    const admin = await AdminUser.findOne({ email });
    if (!admin) {
      console.log('Admin not found for email:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (admin.idCode !== specialId.toUpperCase()) {
      console.log('Invalid special ID for admin:', email);
      return res.status(401).json({ message: 'Invalid special ID' });
    }

    const passwordMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!passwordMatch) {
      console.log('Password mismatch for admin:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      message: 'Login successful',
      userId: admin._id,
      username: admin.email
    }); // Return userId for bookmarking functionality
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

// Update admin profile
router.put('/profile/:email', upload.single('profilePictureFile'), async (req, res) => {
  const { email } = req.params;
  const { displayName, profilePicture } = req.body;

  console.log('PUT /profile/:email - Received request for email:', email);
  console.log('Request body:', req.body);
  console.log('Uploaded file:', req.file);

  try {
    const admin = await AdminUser.findOne({ email });
    console.log('Admin found in database:', admin ? 'YES' : 'NO');
    if (!admin) {
      console.log('Admin not found for email:', email);
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Update fields if provided
    if (displayName !== undefined) {
      admin.displayName = displayName;
    }

    // Handle profile picture - either URL or uploaded file
    if (req.file) {
      // File was uploaded
      admin.profilePicture = `/uploads/${req.file.filename}`;
      console.log('Profile picture updated with uploaded file:', admin.profilePicture);
    } else if (profilePicture !== undefined) {
      // URL was provided
      admin.profilePicture = profilePicture;
      console.log('Profile picture updated with URL:', admin.profilePicture);
    }

    // Ensure username is set (fallback to email if missing)
    if (!admin.username) {
      admin.username = admin.email;
    }

    await admin.save();

    res.json({
      message: 'Profile updated successfully',
      profile: {
        username: admin.email,
        displayName: admin.displayName,
        profilePicture: admin.profilePicture,
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Profile update failed', error: error.message });
  }
});

// Get admin profile
router.get('/profile/:email', async (req, res) => {
  const { email } = req.params;

  console.log('Profile fetch request for email:', email);

  try {
    const admin = await AdminUser.findOne({ email }).select('-passwordHash');
    console.log('Found admin in database for fetch:', admin ? { email: admin.email, displayName: admin.displayName, profilePicture: admin.profilePicture } : 'Not found');

    if (!admin) {
      // Let's also check what users exist in the database
      const allUsers = await AdminUser.find({}, 'email');
      console.log('All users in database for fetch:', allUsers.map(u => u.email));
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.json({
      profile: {
        username: admin.email,
        displayName: admin.displayName,
        profilePicture: admin.profilePicture || '/DefaultProfileImg.jpeg',
      },
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
  }
});

// User management routes for admins

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});

// Add new user (admin can create users)
router.post('/users', async (req, res) => {
  const { username, email, password, role, membershipDays } = req.body;

  if (!password || password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' });
  }

  if (!role || !['user', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const membershipEndDate = membershipDays ? new Date(Date.now() + membershipDays * 24 * 60 * 60 * 1000) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
      membershipEndDate,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: { username, email, role, membershipEndDate } });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Failed to create user', error: error.message });
  }
});

// Update user membership
router.put('/users/:userId/membership', async (req, res) => {
  const { userId } = req.params;
  const { membershipDays } = req.body;

  if (!membershipDays || membershipDays < 1) {
    return res.status(400).json({ message: 'Invalid membership days' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.membershipEndDate = new Date(Date.now() + membershipDays * 24 * 60 * 60 * 1000);
    await user.save();

    res.json({ message: 'Membership updated successfully', membershipEndDate: user.membershipEndDate });
  } catch (error) {
    console.error('Error updating membership:', error);
    res.status(500).json({ message: 'Failed to update membership', error: error.message });
  }
});

// Delete user
router.delete('/users/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.findByIdAndDelete(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
});

module.exports = router;
