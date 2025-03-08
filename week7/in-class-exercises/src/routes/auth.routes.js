const express = require('express');
const router = express.Router();
const authController = require('../service/auth.service');

router.get('/login', authController.login);

module.exports = router;
