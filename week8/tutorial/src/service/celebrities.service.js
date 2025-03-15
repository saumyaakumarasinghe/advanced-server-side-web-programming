const CelebrityDao = require("../dao/celebrities.dao");

const CelebrityService = {
    celebritiesList: async (req, res) => {
    try {
        const names = await CelebrityDao.getAllCelebritiesList();
        res.json(names);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch celebrity names." });
    }
    },

    celebritySearch: async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) return res.status(400).json({ error: "Name is required." });

        const celebrity = await CelebrityDao.getCelebrityByName(name);
        if (!celebrity) return res.status(404).json({ error: "Celebrity not found." });

        res.json(celebrity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    },

    addCelebrity: async (req, res) => {
        try {
            const { name, image, bio } = req.body;
            if (!name || !image || !bio) {
                return res.status(400).json({ error: "All fields (name, image, bio) are required." });
            }

            const newCelebrity = await CelebrityDao.addCelebrity(name, image, bio);
            res.status(201).json(newCelebrity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }
};

module.exports = CelebrityService;
