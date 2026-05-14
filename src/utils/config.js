export const API = {
    geocoding: 'https://geocoding-api.open-meteo.com/v1/search',
    weather: 'https://api.open-meteo.com/v1/forecast',
    cities: [
        { name: 'New York', country: 'US', lat: 40.7128, lon: -74.0060 },
        { name: 'Paris',    country: 'FR', lat: 48.8566, lon: 2.3522  },
        { name: 'London',   country: 'GB', lat: 51.5074, lon: -0.1278 },
    ],
};

const appConfig = { API };
export default appConfig;
