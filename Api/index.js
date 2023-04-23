import express from 'express';
import dotenv from 'dotenv';
import giphyclient from 'giphy-api';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

dotenv.config();
const PORT = process.env.API_PORT || 3001;

const giphy = new giphyclient(process.env.GIPHY_KEY);

const api = express();
api.use(bodyParser.json());
api.use(cookieParser());

import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');

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
        res.status(500).json({ error: "API Error" })
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
        res.status(500).json({ error: "API Error" })
    }
});

api.get('/gif', async (req, res) => {
    const desc = req.query.desc;

    if (!desc) {
        const gif = await giphy.search('rain');
        res.json(gif.data[Math.floor(Math.random() * 5)].images.fixed_height.url);
    } else {
        const gif = await giphy.search(desc);
        res.json(gif.data[Math.floor(Math.random() * 5)].images.fixed_height.url);
    }
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

api.post('/auth/create', async (req, res) => {
    if (req.method !== 'POST') return res.status(405).json({ error: "Method Not Allowed" });

    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json({ error: "Username and password are required." });

    const data = {
        username: username,
        password: password,
        passwordConfirm: password,
    };

    try {
        const record = await pb.collection('users').create(data);
        res.status(200).json(record);
    } catch (error) {
        if (error.response !== undefined) {
            return res.status(error.response.code).json({ error: error.response.message });
        }
        res.status(500).json({ error: "API Error" });
    }
});

api.post('/auth/login', async (req, res) => {
    if (req.method !== 'POST') return res.status(405).json({ error: "Method Not Allowed" });

    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json({ error: "Username and password are required." });

    try {
        const data = {
            identity: username,
            password: password,
        }
        const req = await fetch('http://127.0.0.1:8090/api/collections/users/auth-with-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const authData = await req.json();

        res.cookie('token', authData.token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
        res.status(200).json(authData);
    } catch (error) {
        if (error.response !== undefined) {
            return res.status(error.response.code).json({ error: error.response.message });
        }
        res.status(500).json({ error: "API Error" });
    }
});

api.listen(PORT, () => {
    // Use for local testing
    const lat = 40.33;
    const lon = -78.92;
    console.log(`/current http://localhost:${PORT}/current?lat=${lat}&lon=${lon}`);
    console.log(`/sevenDay http://localhost:${PORT}/sevenDay?lat=${lat}&lon=${lon}`);
});
