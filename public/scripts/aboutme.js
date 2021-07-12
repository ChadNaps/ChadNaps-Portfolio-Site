const currentTimeSpan = document.getElementById("currentTime");

// Advanced view toggle is found in global.js //

// Cool little current time thingy //
let currentTime = getTime();
currentTimeSpan.innerHTML = `${currentTime.hours}:${currentTime.minutes}`;

// Update time regularly //
setInterval(() => {
    if (timeHasChanged(currentTime.hours, currentTime.minutes)) {
        currentTime = getTime();

        currentTimeSpan.innerHTML = `${currentTime.hours}:${currentTime.minutes}`;
    }
}, 1000);

// Helper functions //
function timeHasChanged(hrs, mins) {
    const newCurrentTime = getTime();
    if (newCurrentTime.hours != hrs || newCurrentTime.minutes != mins) {
        return true;
    }

    return false;
}

// Get formatted time object
function getTime() {
    const tempDate = new Date();
    return {
        hours: tempDate.getHours() % 12,
        minutes: ('0' + tempDate.getMinutes()).slice(-2)
    }
}