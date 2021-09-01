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
const card2Clone = cloneCard(card2);
card2Clone.addEventListener("mouseenter", toggleCardOpacity);
card2Clone.addEventListener("mouseleave", toggleCardOpacity);

// Card 3
const card3Clone = cloneCard(card3);
card3Clone.addEventListener("mouseenter", toggleCardOpacity);
card3Clone.addEventListener("mouseleave", toggleCardOpacity);

// Global functions //

function toggleCardOpacity(event) {
    event.stopPropagation();
    
    if (this.style.opacity) {
        this.style.opacity = "";
    } else {
        this.style.opacity = "1";
    }

    this.style.transition = "opacity ease 0.6s";
}

function cloneCard(card) {
    let cardClone = card.cloneNode(true);
    if (card.id.match(/card\d{1,2}/gm)) {
        cardClone.id = `card${card.id.slice(4)}Clone`;
    }
    card.parentElement.appendChild(cardClone);
    return cardClone;
}

function timeHasChanged(hrs, mins) {
    const newCurrentTime = getTime();
    if (newCurrentTime.hours != hrs || newCurrentTime.minutes != mins) {
        return true;
    }

    return false;
}

// Helper functions //

// Get formatted time object
function getTime() {
    const tempDate = new Date();
    return {
        hours: tempDate.getHours() % 12 == 0 ? 12 : tempDate.getHours() % 12,
        minutes: ('0' + tempDate.getMinutes()).slice(-2)
    }
}