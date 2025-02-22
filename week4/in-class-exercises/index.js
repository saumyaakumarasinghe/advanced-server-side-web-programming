require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./src/routes/user.routes');

app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
