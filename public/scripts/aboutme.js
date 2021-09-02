/************
*** Notes ***
************/

// Advanced view toggle is found in global.js

/**************
*** Classes ***
**************/

class Time {
    constructor() {
        this.currentTimeSpan = document.getElementById("currentTime");
        this.currentTime = this.#initializeTime();
    }

    /* Public Methods */
    
    updateTimeOnInterval(milliseconds) {
        // The context of keyword 'this' changes to Window (instead of Time) within setInterval(),
        // so the variable 'that' is used as a cache
        const that = this;
        setInterval(function() {that.updateTime();}, milliseconds);
    }
    
    updateTime() {
        if (this.#timeHasChanged(this.currentTime.hours, this.currentTime.minutes)) {
            this.currentTime = this.#getTime();
            
            this.currentTimeSpan.innerHTML = `${this.currentTime.hours}:${this.currentTime.minutes}`;
        }
    }

    /* Private Methods */
    
    #initializeTime() {
        const currentTime = this.#getTime();
        this.currentTimeSpan.innerHTML = `${currentTime.hours}:${currentTime.minutes}`;
        return currentTime;
    }
    
    #timeHasChanged(hrs, mins) {
        const newCurrentTime = this.#getTime();
        if (newCurrentTime.hours != hrs || newCurrentTime.minutes != mins) {
            return true;
        }
        
        return false;
    }
    
    #getTime() {
        const tempDate = new Date();
        // Returns time formatted as ##:## as 12hr clock, without AM/PM
        return {
            hours: tempDate.getHours() % 12 == 0 ? 12 : tempDate.getHours() % 12,
            minutes: ('0' + tempDate.getMinutes()).slice(-2)
        }
}
}

/****************
*** Variables ***
****************/

/* DOM Variables */
const card2 = document.getElementById("card2");
const card3 = document.getElementById("card3");

/* Public Variables */
let currentTime = new Time();

/***********
*** Main ***
***********/

/* Update time regularly */
currentTime.updateTimeOnInterval(1000);

/* Card Hover Effects:
Creates a clone of the card where a "fade-to-front" effect is desired;
gives the cloned card an opacity of 0, making it invisible;
when hovered over, opacity is transitioned to 1 with a CSS transition */
const card2Clone = cloneCard(card2);
card2Clone.addEventListener("mouseenter", toggleCardOpacity);
card2Clone.addEventListener("mouseleave", toggleCardOpacity);

const card3Clone = cloneCard(card3);
card3Clone.addEventListener("mouseenter", toggleCardOpacity);
card3Clone.addEventListener("mouseleave", toggleCardOpacity);

/****************
*** Functions ***
****************/

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
