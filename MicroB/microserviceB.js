const express = require('express');
const geoTz = require('geo-tz');
const https = require('https');
const app = express();
const port = 3000;

app.use(express.json());

const cities = [
    { name: "Corvallis, OR", timezone: "America/Los_Angeles" },
    { name: "New York, NY", timezone: "America/New_York" },
    { name: "London, UK", timezone: "Europe/London" }
    // Add more cities and timezones here
];

app.get('/cities', (req, res) => {
    res.json(cities);
});

app.post('/add-city', async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ success: false, message: 'Invalid city name' });
    }

    // Check if the city already exists
    if (cities.some(city => city.name === name)) {
        return res.status(400).json({ success: false, message: 'City already exists' });
    }

    try {
        // Use a geocoding API to get the latitude and longitude for the city
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(name)}`;
        const options = {
            headers: {
                'User-Agent': 'TimeWatcher/1.0'
            }
        };
        https.get(url, options, response => {
            let data = '';

            response.on('data', chunk => {
                data += chunk;
            });

            response.on('end', () => {
                try {
                    // Check if the response content type is JSON
                    const contentType = response.headers['content-type'];
                    if (contentType && contentType.includes('application/json')) {
                        const parsedData = JSON.parse(data);

                        if (!parsedData || parsedData.length === 0) {
                            return res.status(400).json({ success: false, message: 'City not found' });
                        }

                        const { lat, lon } = parsedData[0];
                        const timezone = geoTz.find(parseFloat(lat), parseFloat(lon))[0];

                        const newCity = { name, timezone };
                        cities.push(newCity);

                        res.json({ success: true });
                    } else {
                        console.error('Invalid response format:', data);
                        res.status(500).json({ success: false, message: 'Invalid response format from geocoding API' });
                    }
                } catch (error) {
                    console.error('Error parsing response:', error, data);
                    res.status(500).json({ success: false, message: 'Error parsing response from geocoding API' });
                }
            });
        }).on('error', err => {
            console.error('Error with request:', err);
            res.status(500).json({ success: false, message: 'Error adding city' });
        });
    } catch (error) {
        console.error('Error during city addition:', error);
        res.status(500).json({ success: false, message: 'Error adding city' });
    }
});

app.listen(port, () => {
    console.log(`City timezone service running on http://localhost:${port}`);
});
