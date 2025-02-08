const express = require('express');
const dinosaursController = require("../../controllers/dinosaurs.controller");

const router = express.Router();

router.get("/periods", dinosaursController.periods);
router.get("/getinfo/:periodId", dinosaursController.getPeriodInfo);

module.exports = router;