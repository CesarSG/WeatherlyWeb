export const API = {

    // API key
    key: '598292ec4574045b19d00371177cd2ea',
    id: '&appid=',

    // API current wheather
    current: 'https://api.openweathermap.org/data/2.5/weather?q=',

    // API By geographic coordinates
    coordinates: 'https://api.openweathermap.org/data/2.5/weather?',

    // API forecast
    forecast: 'https://api.openweathermap.org/data/2.5/forecast?q=',

    // API for multiple locations
    multiple: 'https://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743',

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