require('dotenv').config();
const express = require('express');
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static("public")); // Serve frontend files from 'public' folder

const celebritiesRoutes = require('./src/routes/celebrities.routes');

app.use(express.json());

app.use('/api/celebrities', celebritiesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
