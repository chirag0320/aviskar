import React, { useEffect, useState } from 'react'

const useDeviceDetails = () => {
    const [deviceInfo, setDeviceInfo] = useState(null);
    const [locationInfo, setLocationInfo] = useState(null);

    useEffect(() => {
        // Fetch device information
        const deviceData: any = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            browserLanguage: navigator.language,
        };
        setDeviceInfo(deviceData);

        // Fetch location information
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                const ip = data.ip;
                // Use IP to fetch location data from another API
                fetch(`https://ipapi.co/${ip}/json/`)
                    .then(response => response.json())
                    .then(locationData => setLocationInfo(locationData))
                    .catch(error => console.error('Error fetching location data:', error));
            })
            .catch(error => console.error('Error fetching IP:', error));
    }, []);
    return ({ deviceInfo, locationInfo })
}

export default useDeviceDetails