const asyncHandler = require("express-async-handler");
const axios = require('axios');

const googlePlacesHandler = asyncHandler(async (req, res) => {
    const { input } = req.query;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data from Google Places API" });
    }
});

module.exports = googlePlacesHandler;