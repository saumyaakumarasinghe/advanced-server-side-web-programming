const ageService = require('../services/age.service');

const calculateAge = async (req, res) => {
    try {
        console.log("b-day: ", req.body.birthday);

        // convert the birthday to a Date object
        const birthDate = new Date(req.body.birthday.replace(/\./g, '-'));

        console.log("b-day converted: ", birthDate);

        const calcAge = await ageService.calculateAge(birthDate);

        res.status(201).json(calcAge);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    calculateAge
}
