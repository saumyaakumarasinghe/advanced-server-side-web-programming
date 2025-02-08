const express = require('express');
const userRoutes = require("../v1/user.routes");

const router = express.Router();

router.use('/user', userRoutes);

module.exports = router;