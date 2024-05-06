const express = require('express');
const app = express();
const port = 3000;

const cities = [
    { name: "Corvallis, OR", timezone: "America/Los_Angeles" },
    { name: "New York, NY", timezone: "America/New_York" },
    { name: "London, UK", timezone: "Europe/London" }
    // Add more cities and timezones here
];

app.get('/cities', (req, res) => {
    res.json(cities);
});

app.listen(port, () => {
    console.log(`City timezone service running on http://localhost:${port}`);
});
