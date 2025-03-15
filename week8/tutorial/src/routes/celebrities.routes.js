const express = require('express');
const router = express.Router();
const celebritiesController = require('../service/celebrities.service');

router.get('/', celebritiesController.celebritiesList);
router.get('/search', celebritiesController.celebritySearch);
router.post('/', celebritiesController.addCelebrity);

module.exports = router;
