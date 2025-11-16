const express = require('express');
const { body, validationResult } = require('express-validator');
const Blog = require('../models/Blog');
const authMiddleware = require('../middleware/auth');
const { upload } = require('../utils/cloudinary');

const router = express.Router();

// @route   GET /api/blogs
// @desc    Get all public blogs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({ visibility: 'public' })
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    
    res.json(blogs);
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blogs/my-blogs
// @desc    Get current user's blogs
// @access  Private
router.get('/my-blogs', authMiddleware, async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id })
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    
    res.json(blogs);
  } catch (error) {
    console.error('Get my blogs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blogs/:id
// @desc    Get a single blog by ID
// @access  Public (if public) / Private (if private and owner)
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'username');
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // If blog is private, check if user is the author
    if (blog.visibility === 'private') {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return res.status(403).json({ message: 'Access denied. This blog is private.' });
      }

      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const User = require('../models/User');
        const user = await User.findById(decoded.userId);
        
        if (!user || blog.author._id.toString() !== decoded.userId.toString()) {
          return res.status(403).json({ message: 'Access denied. This blog is private.' });
        }
      } catch (error) {
        return res.status(403).json({ message: 'Access denied. This blog is private.' });
      }
    }

    res.json(blog);
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/blogs
// @desc    Create a new blog
// @access  Private
router.post('/', authMiddleware, upload.single('featuredImage'), [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('content')
    .notEmpty()
    .withMessage('Content is required'),
  body('visibility')
    .optional()
    .isIn(['public', 'private'])
    .withMessage('Visibility must be either public or private')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, visibility } = req.body;
    const featuredImage = req.file ? req.file.path : '';

    const blog = new Blog({
      title,
      content,
      featuredImage,
      visibility: visibility || 'public',
      author: req.user._id
    });

    await blog.save();
    await blog.populate('author', 'username');

    res.status(201).json(blog);
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/blogs/:id
// @desc    Update a blog
// @access  Private (only author)
router.put('/:id', authMiddleware, upload.single('featuredImage'), [
  body('title')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('visibility')
    .optional()
    .isIn(['public', 'private'])
    .withMessage('Visibility must be either public or private')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if user is the author
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this blog' });
    }

    const { title, content, visibility } = req.body;
    
    if (title) blog.title = title;
    if (content) blog.content = content;
    if (visibility) blog.visibility = visibility;
    if (req.file) {
      // Delete old image from Cloudinary if exists
      if (blog.featuredImage) {
        const { cloudinary } = require('../utils/cloudinary');
        const publicId = blog.featuredImage.split('/').slice(-2).join('/').split('.')[0];
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.error('Error deleting old image:', error);
        }
      }
      blog.featuredImage = req.file.path;
    }

    await blog.save();
    await blog.populate('author', 'username');

    res.json(blog);
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete a blog
// @access  Private (only author)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if user is the author
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this blog' });
    }

    // Delete image from Cloudinary if exists
    if (blog.featuredImage) {
      const { cloudinary } = require('../utils/cloudinary');
      const publicId = blog.featuredImage.split('/').slice(-2).join('/').split('.')[0];
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

