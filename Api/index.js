require('dotenv').config();
const express = require('express');
const PORT = process.env.API_PORT || 3001;

const api = express();

api.get('/', (req, res) => {
    res.send('Hello World!');
});

api.listen(PORT, () => {
    console.log(`API listening on port ${PORT}!`);
});
