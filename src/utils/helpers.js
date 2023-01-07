// Return Time in format HH:MM PM/AM
export const getFormatTime = (dt, now = false) => {
    let date
    now ? date = dt : date = new Date(dt * 1000);
    let time = date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});

    return time;
}

const appHelper = { getFormatTime };

export default appHelper;