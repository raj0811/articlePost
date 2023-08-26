const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const isAuthenticatedUser = require('../config/auth')

router.get('/',adminController.renderRegister)
router.get('/renderlogin',adminController.renderlogin)
router.get('/rendercreate',isAuthenticatedUser,adminController.rendercreate)

router.post('/register',adminController.register)
router.post('/login',adminController.login)

router.post('/create',isAuthenticatedUser,adminController.createPost)
module.exports = router; 