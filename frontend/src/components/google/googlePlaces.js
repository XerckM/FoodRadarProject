import React, { useState, useEffect } from 'react';
import './googlePlaces.css';
import { loadGoogleMapsScript } from '../../utils/googleMapsScript';

const GooglePlaces = () => {
    const [places, setPlaces] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedPlace, setSelectedPlace] = useState(null);

    useEffect(() => {
        const initAutocomplete = () => {
            const autocompleteInstance = new window.google.maps.places.Autocomplete(
                document.getElementById('autocomplete'), { types: ['geocode'] }
            );
            autocompleteInstance.addListener('place_changed', () => {
                const place = autocompleteInstance.getPlace();
                if (place && place.formatted_address) {
                    setInputValue(place.formatted_address);
                    setSelectedPlace(place);
                }
            });
        };

        loadGoogleMapsScript('initAutocomplete')
            .then(initAutocomplete)
            .catch(error => console.error('Error loading Google Maps script', error));
    }, []);

    const handleSearch = () => {
        if (!selectedPlace || !selectedPlace.geometry) {
            console.log("No place selected or place contains no geometry");
            return;
        }

        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        service.nearbySearch({
            location: selectedPlace.geometry.location,
            radius: '500',
            type: ['restaurant']
        }, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                setPlaces(results);
            }
        });
    };

    return (
        <div className="google-container">
            <h1>Nearby Restaurants Finder</h1>
            <div className="search-bar-container">
                <input
                    type="text"
                    id="autocomplete"
                    placeholder="Enter location"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="output-grid">
                {places.map((place, index) => (
                    <div key={index} className="output-item">
                        <p>{place.name}</p>
                        {place.photos ? (
                            <img src={place.photos[0].getUrl()} alt={place.name} />
                        ) : (
                            <img src="https://via.placeholder.com/100" alt="Placeholder" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GooglePlaces;
