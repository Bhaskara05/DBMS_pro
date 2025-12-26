const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id, role: 'admin' }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// @desc    Register admin
// @route   POST /api/admin/auth/register
// @access  Public
exports.registerAdmin = async (req, res, next) => {
  try {
    const { name, email, phone, password, theaterName } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin with this email already exists'
      });
    }

    // Create admin
    const admin = await Admin.create({
      name,
      email,
      phone,
      password,
      theaterName
    });

    const token = generateToken(admin._id);

    res.status(201).json({
      success: true,
      token,
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        theaterName: admin.theaterName,
        role: admin.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login admin
// @route   POST /api/admin/auth/login
// @access  Public
exports.loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Check for admin (include password field)
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      token,
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        theaterName: admin.theaterName,
        role: admin.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current admin profile
// @route   GET /api/admin/auth/me
// @access  Private (Admin only)
exports.getAdminProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    res.status(200).json({
      success: true,
      data: admin
    });
  } catch (error) {
    next(error);
  }
};