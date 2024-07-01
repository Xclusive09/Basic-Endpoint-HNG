const express = require('express');
const axios = require('axios');
const app = express();

const port = process.env.PORT || 3000;

app.get('/api/hello', async (req, res) => {
    const visitorName = req.query.visitor_name || 'Guest';
    const clientIp = req.ip;

    try {
        const weatherResponse = await axios.get('http://api.weatherapi.com/v1/current.json', {
            params: {
                key: 'a4867eeabfa1459ab3d225413240107',
                q: clientIp
            }
        });

        const { location, current } = weatherResponse.data;
        const city = location.name;
        const temperature = current.temp_c;

        res.json({
            client_ip: clientIp,
            location: city,
            greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${city}`
        });
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
