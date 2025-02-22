require('dotenv').config();
const express = require('express');
const app = express();
const filmRoutes = require('./src/routes/film.routes');

app.use(express.json());

app.use('/api/films', filmRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
