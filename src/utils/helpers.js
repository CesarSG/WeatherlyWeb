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

export const getTimes = () => {
    //let hours = Math.abs(now - date_2) / 36e5;
}

const appHelper = { getFormatTime, getLocation };

export default appHelper;