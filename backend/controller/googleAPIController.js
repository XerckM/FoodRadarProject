const { Client } = require("@googlemaps/google-maps-services-js");
const asyncHandler = require("express-async-handler");

const client = new Client({});

const googlePlacesHandler = asyncHandler(async (req, res) => {
    const { placeId } = req.query;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!placeId) {
        return res.status(400).json({ message: "No place ID provided" });
    }

    try {
        // Use the place ID to get the location for a nearby search
        const detailsResponse = await client.placeDetails({
            params: {
                place_id: placeId,
                key: apiKey
            }
        });

        const location = detailsResponse.data.result.geometry.location;

        // Perform a nearby search
        const nearbySearchResponse = await client.placesNearby({
            params: {
                location: location,
                radius: 10000,
                type: 'restaurant',
                key: apiKey
            }
        });

        // Add photo URLs to each place
        const placesWithPhotos = nearbySearchResponse.data.results.map(place => {
            if (place.photos && place.photos.length > 0) {
                place.photoUrls = place.photos.map(photo =>
                    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${apiKey}`
                );
            }
            return place;
        });

        console.log("Places handler route hit")
        res.json({ results: placesWithPhotos });
    } catch (error) {
        res.status(500).json({ message: "Error fetching data from Google Places API" });
    }
});

const autocompleteHandler = asyncHandler(async (req, res) => {
    const { input } = req.query;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    try {
        const autocompleteResponse = await client.placeAutocomplete({
            params: {
                input: input,
                key: apiKey
            }
        });

        console.log("Autocomplete handler route hit")
        res.json(autocompleteResponse.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching autocomplete data" });
    }
});

module.exports = { googlePlacesHandler, autocompleteHandler };
