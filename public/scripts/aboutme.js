const currentTimeSpan = document.getElementById("currentTime");
const card2 = document.getElementById("card2");
const card3 = document.getElementById("card3");

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

// Card Hover Effects
// Card 2
let card2Clone = card2.cloneNode(true);
card2Clone.id = "card2Clone";
card2.parentElement.appendChild(card2Clone);
card2Clone.addEventListener("mouseover", () => {
    card2Clone.style.opacity = 1;
    card2Clone.style.transition = "opacity ease 0.6s"
});
card2Clone.addEventListener("mouseleave", () => {
    card2Clone.style.opacity = 0;
    card2Clone.style.transition = "opacity ease 0.6s"
});

// Card 3
let card3Clone = card3.cloneNode(true);
card3Clone.id = "card3Clone";
card3.parentElement.appendChild(card3Clone);
card3Clone.addEventListener("mouseover", () => {
    card3Clone.style.opacity = 1;
    card3Clone.style.transition = "opacity ease 0.6s"
});
card3Clone.addEventListener("mouseleave", () => {
    card3Clone.style.opacity = 0;
    card3Clone.style.transition = "opacity ease 0.6s"
});


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
        hours: tempDate.getHours() % 12 == 0 ? 12 : tempDate.getHours() % 12,
        minutes: ('0' + tempDate.getMinutes()).slice(-2)
    }
}