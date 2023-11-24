import React, { useState, useEffect, useRef } from 'react';

const GooglePlaces = () => {
    const [autocomplete, setAutocomplete] = useState(null);
    const [places, setPlaces] = useState([]);
    const mapRef = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initAutocomplete`;
        script.async = true;

        window.initAutocomplete = () => {
            setAutocomplete(new window.google.maps.places.Autocomplete(
                document.getElementById('autocomplete'), { types: ['geocode'] }
            ));

            map.current = new window.google.maps.Map(mapRef.current, {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
            });
        };

        script.onerror = () => {
            console.error("Google Maps script failed to load.");
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (autocomplete) {
            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                console.log(place);

                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }

                map.current.setCenter(place.geometry.location);
                map.current.setZoom(15);

                const service = new window.google.maps.places.PlacesService(map.current);
                service.nearbySearch({
                    location: place.geometry.location,
                    radius: '500',
                    type: ['restaurant']
                }, (results, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                        setPlaces(results);
                    }
                });
            });
        }
    }, [autocomplete]);

    return (
        <div className="google-container">
            <h1>Nearby Places Finder</h1>
            <div>
                <label>Enter location: </label>
                <input type="text" id="autocomplete" placeholder="Enter location" />
            </div>
            <div ref={mapRef} style={{ height: '400px', width: '100%' }}></div>
            <table className="table table-bordered table-striped">
                <tbody>
                {places.map((place, index) => (
                    <tr key={index}>
                        <td>{place.name}</td>
                        <td>
                            {place.photos ? (
                                <img src={place.photos[0].getUrl()} alt={place.name} width="100" height="100" />
                            ) : (
                                <img src="https://via.placeholder.com/100" alt="Placeholder" />
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default GooglePlaces;
