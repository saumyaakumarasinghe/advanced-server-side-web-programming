const dinosaursService = require('../services/dinosaurs.service');

const periods = async (req, res) => {
    try {
        const periods = await dinosaursService.periods();

        res.status(201).json(periods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPeriodInfo = async (req, res) => {
    try {
        const periodInfo = await dinosaursService.periodInfo(req.params.periodId);

        res.status(201).json(periodInfo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    periods, getPeriodInfo
}
