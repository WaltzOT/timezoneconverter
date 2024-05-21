const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Convert metric to imperial
app.post('/metric-to-imperial', (req, res) => {
    const gramsArray = req.body.grams 
    const poundsArray = gramsArray.map(grams => grams * 0.00220462)
    res.json({ pounds: poundsArray })
})

// Convert imperial to metric
app.post('/imperial-to-metric', (req, res) => {
    const poundsArray = req.body.pounds 
    const gramsArray = poundsArray.map(pounds => pounds / 0.00220462) 
    res.json({ grams: gramsArray })
})

// Convert metric to metric
app.post('/metric-to-metric', (req, res) => {
    const gramsArray = req.body.grams
    const milligramsArray = gramsArray.map(grams => grams * 0.001)
    res.json({ milligrams: milligramsArray })
})

// Convert imperial to imperial
app.post('/imperial-to-imperial', (req, res) => {
    const tbspArray = req.body.tablespoon
    const tspArray = tbspArray.map(tablespoon => tablespoon * 3)
    res.json({ teaspoons: tspArray })
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
