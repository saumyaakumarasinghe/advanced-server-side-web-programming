const db = require('../config/database');

async function getAllFilms() {
    const [films] = await db.query('SELECT * FROM films');
    return films;
}

async function getComediesWithHighRating() {
    const [films] = await db.query('SELECT * FROM `advanced-server-side`.films WHERE genre = ? AND imdb_rating > ?', ['Comedy', 5]);
    return films;
}

async function addFilm(title, director, genre, imdb_rating, release_year) {
    const [result] = await db.query(
        'INSERT INTO `advanced-server-side`.films (title, director, genre, imdb_rating, release_year) VALUES (?, ?, ?, ?, ?)',
        [title, director, genre, imdb_rating, release_year]
    );
    return { id: result.insertId, title, director, genre, imdb_rating, release_year };
}

async function deleteFilm(id) {
    const [result] = await db.query('DELETE FROM `advanced-server-side`.films WHERE id = ?', [id]);
    return result.affectedRows > 0;
}

module.exports = { getAllFilms, getComediesWithHighRating, addFilm, deleteFilm };
