const express = require('express');
const app = express();
const port = 3002;

app.get('/cities/utc', async (req, res) => {
    try {
        const fetch = await import('node-fetch').then(mod => mod.default);
        const response = await fetch('http://localhost:3000/cities');
        const cities = await response.json();
        const citiesInUTC = cities.map(city => ({
            name: city.name,
            timezone: 'UTC'
        }));
        res.json(citiesInUTC);
    } catch (error) {
        res.status(500).json({ error: "Error fetching cities and converting to UTC" });
    }
});

app.listen(port, () => {
    console.log(`Timezone conversion service running on http://localhost:${port}`);
});
