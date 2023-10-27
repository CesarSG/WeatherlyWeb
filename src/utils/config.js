export const API = {

    // API key
    key: process.env.REACT_APP_API_KEY_OPENWEATHERMAP,
    id: '&appid=',

    // API current wheather
    current: 'https://api.openweathermap.org/data/2.5/weather?q=',

    // API By geographic coordinates
    coordinates: 'https://api.openweathermap.org/data/2.5/weather?',

    // API forecast
    forecast: 'https://api.openweathermap.org/data/2.5/forecast?q=',

    // API for multiple locations
    multiple: 'https://api.openweathermap.org/data/2.5/group?id=5128581,2968815,2643743',

    // API One Call
    onecall: 'https://api.openweathermap.org/data/2.5/onecall?',

    // API configurations
    units: '&units=',
    lang: '&lang=',

    lat: 'lat=',
    lon: '&lon=',
    exclude: '&exclude=',

    // Example construction url for api

    // API current wheather
    // current + {city} + units + {unit} + lang + {language} + id + key

    // API One Call
    // onecall + lat + {latitude} + lon + {longitude} + exclude + {'minutely'} + id + key 
    
};

const appConfig = { API };

export default appConfig;