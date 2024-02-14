export function calculateElapsedTimeFormatted(dateTime) {
    //TODO: make API return TZ offset
    //TODO ERROR HANDLE
    if (dateTime === null) {
        return "--:--"
    }

    let elapsedSeconds = Math.ceil((Date.now() - new Date(dateTime + "+00:00")) / 1000);

    if (elapsedSeconds >= 3600) {
        let hours = Math.floor(elapsedSeconds / 3600);
        let minutes = Math.floor((elapsedSeconds % 3600) / 60);
        let seconds = Math.floor(elapsedSeconds % 60);

        return padZero(hours) + ":" + padZero(minutes) + ":" + padZero(seconds);
    } else if (elapsedSeconds >= 60) {
        let minutes = Math.floor(elapsedSeconds / 60);
        let seconds = elapsedSeconds % 60;

        return padZero(minutes) + ":" + padZero(seconds);
    } else if (elapsedSeconds < 60) {
        return "00:" + padZero(elapsedSeconds);
    }
}

const padZero = (nbr) => {
    return ("0" + nbr).slice(-2);
}