import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (await User.findOne({ email }))
      return res.status(400).json({ msg: 'User already exists' });

    const user = await User.create({ email, password });
    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ msg: 'Invalid credentials' });

    const token = generateToken(user._id);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
