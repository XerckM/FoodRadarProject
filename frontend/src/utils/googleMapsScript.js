export const loadGoogleMapsScript = (callbackName) => {
    return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
            resolve();
            return;
        }

        const existingScript = document.getElementById('googleMapsScript');
        if (existingScript) {
            // If script is already present, attach the callback and resolve
            window[callbackName] = () => resolve();
            existingScript.addEventListener('load', window[callbackName]);
            return;
        }

        // Create a new script element
        const script = document.createElement('script');
        script.id = 'googleMapsScript';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&callback=${callbackName}`;
        script.async = true;
        document.body.appendChild(script);

        window[callbackName] = () => resolve();

        script.onerror = reject;
    });
};

export const unloadGoogleMapsScript = () => {
    // Remove the script element
    const script = document.getElementById('googleMapsScript');
    if (script) {
        document.body.removeChild(script);
    }

    // Reset the global variables and callbacks
    if (window.google && window.google.maps) {
        delete window.google.maps;
    }

    if (window.initAutocomplete) {
        delete window.initAutocomplete;
    }
};

