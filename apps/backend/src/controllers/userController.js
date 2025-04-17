import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export const registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { name: user.name, email: user.email } });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get logged-in user's details
export const getUserDetails = async (req, res) => {
  try {
    // Decode the JWT token from the Authorization header
    const token = req.header('Authorization').replace('Bearer ', '');  // Extract the token from the header
    if (!token) return res.status(401).json({ message: 'No token provided' });

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');  // Find user and exclude password field

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user details (excluding password)
    res.status(200).json({ name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};