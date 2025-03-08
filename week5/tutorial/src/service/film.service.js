const filmService = require('../dao/film.dao');

async function getFilms(req, res) {
    try {
        const films = await filmService.getAllFilms();
        res.json(films);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getComedies(req, res) {
    try {
        const films = await filmService.getComediesWithHighRating();
        res.json(films);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createFilm(req, res) {
    try {
        const { title, director, genre, imdb_rating, release_year } = req.body;
        if (!title || !director || !genre || imdb_rating === undefined || !release_year) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newFilm = await filmService.addFilm(title, director, genre, imdb_rating, release_year);
        res.status(201).json(newFilm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteFilm(req, res) {
    try {
        const { id } = req.params;
        const success = await filmService.deleteFilm(id);
        if (!success) return res.status(404).json({ message: 'Film not found' });

        res.json({ message: 'Film deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getFilms, getComedies, createFilm, deleteFilm };
