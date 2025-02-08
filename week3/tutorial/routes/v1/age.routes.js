const express = require('express');
const ageController = require('../../controllers/age.controller');

const router = express.Router();

router.post('/calculate', ageController.calculateAge);

module.exports = router;
