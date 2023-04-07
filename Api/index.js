require('dotenv').config();
const express = require('express');
const giphy = require('giphy-api')(process.env.GIPHY_KEY);
const bodyParser = require('body-parser');
const PORT = process.env.API_PORT || 3001;

const api = express();
api.use(bodyParser.json())

api.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next()
});

api.get('/current', async (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;

    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&models=best_match&current_weather=true&timeformat=unixtime&timezone=America%2FNew_York`);
        const jsonResponse = await response.json();

        res.json(jsonResponse);
    } catch (error) {
        res.status(500).json({error: "API Error"})
    }
});

api.get('/sevenDay', async (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;

    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&models=best_match&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_hours,precipitation_probability_max&timeformat=unixtime&timezone=America%2FNew_York`);
        const jsonResponse = await response.json();

        res.json(jsonResponse);
    } catch (error) {
        res.status(500).json({error: "API Error"})
    }
});

api.get('/gif', async (req, res) => {
    const gif = await giphy.search('rain');
    res.json(gif.data[Math.floor(Math.random() * 5)].images.fixed_height.url);

});

api.get('/geo', async (req, res) => {
    const loc = req.query.loc;
    const API_KEY = process.env.OPENWEATHER_API_KEY;

    try {
        const API_ENDPOINT = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(loc)}&limit=5&appid=${API_KEY}`;
        const response = await fetch(API_ENDPOINT);
        const jsonResponse = await response.json();

        res.json(jsonResponse);
    } catch (error) {
        res.status(500).json({ error: "API Error" })
    }
});

api.listen(PORT, () => {
    // Use for local testing
    const lat = 40.33;
    const lon = -78.92;
    console.log(`/current http://localhost:${PORT}/current?lat=${lat}&lon=${lon}`);
    console.log(`/sevenDay http://localhost:${PORT}/sevenDay?lat=${lat}&lon=${lon}`);
});
