import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3001;

// Serve static files from 'public' directory
app.use(express.static('public'));

// Proxy request to MicroserviceA
app.get('/cities', async (req, res) => {
    try {
        const response = await fetch('http://localhost:3000/cities');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching cities from microservice" });
    }
});

app.listen(port, () => {
    console.log(`Frontend server running on http://localhost:${port}`);
});
