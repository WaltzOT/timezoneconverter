import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.static('public'));

// Proxy request to MicroserviceB for fetching cities
app.get('/cities', async (req, res) => {
    try {
        const response = await fetch('http://localhost:3000/cities');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching cities from microservice" });
    }
});

// Proxy request to MicroserviceC for fetching cities in UTC timezone
app.get('/cities/utc', async (req, res) => {
    try {
        const response = await fetch('http://localhost:3002/cities/utc');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching cities in UTC timezone from microservice" });
    }
});

// Proxy request to MicroserviceD for fetching cities in local timezone
app.get('/cities/local', async (req, res) => {
    try {
        const response = await fetch('http://localhost:3003/cities/local');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status500().json({ error: "Error fetching cities in local timezone from microservice" });
    }
});

// Proxy request to MicroserviceB for adding a new city
app.post('/add-city', async (req, res) => {
    try {
        const response = await fetch('http://localhost:3000/add-city', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error adding city to microservice" });
    }
});

// Proxy request to MicroserviceF for comparing time difference
app.get('/api/time-difference', async (req, res) => {
    try {
        const { timeZone1, timeZone2 } = req.query;
        const response = await fetch(`http://localhost:3004/api/time-difference?timeZone1=${timeZone1}&timeZone2=${timeZone2}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching time difference from microservice" });
    }
});

app.listen(port, () => {
    console.log(`Frontend server running on http://localhost:${port}`);
});
