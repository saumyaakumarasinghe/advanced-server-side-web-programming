const express = require('express');
const ageRoutes = require("./age.routes");
const dinosaursRoutes = require("./dinosaurs.routes");

const router = express.Router();

router.use('/age', ageRoutes);
router.use('/dinosaurs', dinosaursRoutes);

module.exports = router;