import axios from 'axios';

const apiUrl = 'http://localhost:8000';

const fetchPlaces = async (placeId) => {
    try {
        const response = await axios.get(`${apiUrl}/api/google/google-places`, {
            params: { placeId } // Use placeId for the request
        });
        return response.data.results || []; // Assuming the backend returns 'results'
    } catch (error) {
        console.error("Error fetching places", error);
        return [];
    }
};

const fetchAutocompleteSuggestions = async (inputValue) => {
    try {
        const response = await axios.get(`${apiUrl}/api/google/autocomplete`, {
            params: { input: inputValue }
        });
        return response.data.predictions || [];
    } catch (error) {
        console.error("Error fetching autocomplete suggestions", error);
        return [];
    }
};

export { fetchPlaces, fetchAutocompleteSuggestions };
