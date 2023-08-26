const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAuthenticatedUser = require('../config/auth')

router.get('/',userController.showPost)

module.exports = router; 