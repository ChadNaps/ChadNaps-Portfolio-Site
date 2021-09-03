/**************
*** Imports ***
**************/

import ThemeSelect from "./ThemeSelectClass.js";


/****************
*** Variables ***
****************/
const toggleViewButtonExists = document.getElementById("toggle-view-button") != null;
const navbarExists = document.getElementById("nav") != null;


/***********
*** Main ***
***********/

// Navigation
if (navbarExists) {
    attachClickEventListenersToNavbarItems();
}

// Toggle View Button
if (toggleViewButtonExists) {
    attachClickEventListenerToToggleViewButton();
}

// Theme Select
const initializeThemeSelection = new ThemeSelect();


/****************
 *** Functions ***
 ****************/

function attachClickEventListenersToNavbarItems() {
    /* Local Variables */
    const navItems = document.getElementById("nav").children;

    /* Main */
    for (let item of navItems) {
        item.addEventListener("click", () => {
            navigateTo(item);
        });
    }
    
    /* Local Functions */
    function navigateTo(item) {
        const destination = setDestinationForNavItem(item);
        window.location = `/${destination}`;
    }

    function setDestinationForNavItem(item) {
        // Destination of "" means directs to Home
        let destination = "";
        if (item.innerHTML !== "Home") {
            destination = encodeURIComponent(item.innerHTML).toLowerCase();
        }

        return destination;
    }
}

function attachClickEventListenerToToggleViewButton() {
    /* Local Variables */
    const toggleViewButton = document.getElementById("toggle-view-button");

    /* Main */
    toggleViewButton.addEventListener("click", () => {
        toggleButtonText();
        toggleCardText();
    });

    /* Local Functions */
    function toggleButtonText() {
        /* Local Variables */
        const simpleText = "Simplify (Standard View)";
        const advancedText = "Delve Deeper (Advanced View)";
    
        /* Main */
        if (toggleViewButton.innerHTML === advancedText) {
            toggleViewButton.innerHTML = simpleText;
        } else {
            toggleViewButton.innerHTML = advancedText;
        }
    }

    function toggleCardText() {
        /* Local Variable */
        const cards = document.getElementsByClassName("card");

        /* Main */
        for (const card of cards) {
            for (const child of card.children) {
                if (child.classList.contains("view-simple")) {
                    child.classList.toggle("hidden");
                }
    
                if (child.classList.contains("view-advanced")) {
                    child.classList.toggle("hidden");
                }
            }
        }
    }
}
