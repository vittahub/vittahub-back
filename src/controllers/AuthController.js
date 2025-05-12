const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
  async register(req, res) {
    const { email, password } = req.body;

    const userExists = await User.findByEmail(email);
    if (userExists) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 8);
    const [user] = await User.create({ email, password: hashedPassword });

    return res.json(user);
  },

  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) return res.status(400).json({ error: 'User not found' });

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return res.json({ user, token });
  },
};