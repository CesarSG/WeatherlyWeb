import { images } from '../utils';

// Return Time in format HH:MM PM/AM
export const getFormatTime = (dt, now = false) => {
    let date
    now ? date = dt : date = new Date(dt * 1000);
    let time = date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});

    return time;
}

export const getLocation = () => {
    if (!navigator.geolocation) {
        console.log('Geolocation is not supported by your browser');
    } else {
        console.log('Locating...');
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
        }, () => {
            console.log('Unable to retrieve your location');
        });
    }
}

export const getImageWeather = (id) => {
    let image;

    switch (id) {
        case '01d':
            image = images.clear_day;
            break;
        case '01n':
            image = images.clear_night;
            break;
        case '02d':
            image = images.few_cloud_day;
            break;
        case '02n':
            image = images.few_cloud_night;
            break;
        case '03d':
        case '04d':
            image = images.cloud_day;
            break;
        case '03n':
        case '04n':
            image = images.cloud_night;
            break;
        case '09d':
        case '09n':
            image = images.rain;
            break;
        case '10d':
        case '10n':
        case '11d':
        case '11n':
            image = images.thunderstorm;
            break;
        case '50d':
            image = images.few_cloud_day;
            break;
        case '50n':
            image = images.few_cloud_night;
            break;
    
        default:
            image = images.clear_day;
            break;
    }

    return image;
}

export const getTimes = () => {
    //let hours = Math.abs(now - date_2) / 36e5;
}

const appHelper = { getFormatTime, getLocation, getImageWeather };

export default appHelper;