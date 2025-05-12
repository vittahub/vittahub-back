const express = require('express');
const AuthController = require('./controllers/AuthController');
const authMiddleware = require('./middleware/authMiddleware');

const routes = express.Router();

routes.post('/register', AuthController.register);
routes.post('/login', AuthController.login);

routes.get('/private', authMiddleware, (req, res) => {
  console.log(req.userId);
  return res.json({ message: `Hello User ${req.userId}` });
});

module.exports = routes;