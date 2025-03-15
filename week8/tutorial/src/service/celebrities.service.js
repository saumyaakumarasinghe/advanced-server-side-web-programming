const CelebrityDao = require("../dao/celebrities.dao");

const CelebrityService = {
    celebritiesList: async (req, res) => {
    try {
        const names = await CelebrityDao.getAllCelebrities();
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

        const topFilms = JSON.parse(celebrity.films);

        res.json({
            name: celebrity.name,
            age: celebrity.age,
            image: celebrity.image,
            bio: celebrity.bio,
            films: topFilms
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    },

    addCelebrity: async (req, res) => {
        try {
            const { name, image, bio, age, films } = req.body;
            if (!name || !image || !bio || !age || !films) {
                return res.status(400).json({ error: "All fields (name, image, bio, age, films) are required." });
            }

            const newCelebrity = await CelebrityDao.addCelebrity(name, image, bio, age, films);
            res.status(201).json(newCelebrity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }
};

module.exports = CelebrityService;
