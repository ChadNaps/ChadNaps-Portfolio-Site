const currentTimeSpan = document.getElementById("currentTime");

// Cool little current time thingy
const date = new Date();
let hours = date.getHours() % 12;
let minutes = ('0' + date.getMinutes()).slice(-2);

currentTimeSpan.innerHTML = `${hours}:${minutes}`;