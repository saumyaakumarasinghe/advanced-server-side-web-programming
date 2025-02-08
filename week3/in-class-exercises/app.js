const express = require("express");
const routesV1 = require('./routes/v1/index');

const app = express();

const PORT = 3000;

app.use(express.json());

app.use('/api/v1', routesV1);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});