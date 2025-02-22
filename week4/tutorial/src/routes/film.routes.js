const express = require('express');
const router = express.Router();
const filmController = require('../service/film.service');

router.get('/', filmController.getFilms);
router.get('/comedies', filmController.getComedies);
router.post('/', filmController.createFilm);
router.delete('/:id', filmController.deleteFilm);

module.exports = router;
