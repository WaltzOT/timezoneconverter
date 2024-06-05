const express = require('express');
const app = express();
const port = 3003;

app.get('/cities/local', async (req, res) => {
    try {
        const fetch = await import('node-fetch').then(mod => mod.default);
        const response = await fetch('http://localhost:3000/cities');
        const cities = await response.json();
        res.json(cities);
    } catch (error) {
        res.status(500).json({ error: "Error fetching cities and converting to local time" });
    }
});

app.listen(port, () => {
    console.log(`Local timezone service running on http://localhost:${port}`);
});
