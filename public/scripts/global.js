const keyboardBlackList = ["Tab", "Escape", "Shift"];

// Navigation Logic
if (document.getElementById("nav") != null) {
    const navItems = document.getElementById("nav").firstElementChild.children;

    // Add click event listeners to nav
    for (let item of navItems) {
        item.addEventListener("click", () => {
            let destination;
            if (item.innerHTML === "Home") {
                destination = "";
            }
            else {
                destination = encodeURIComponent(item.innerHTML);
            }

            destination = destination.toLowerCase();

            window.location = `/${destination}`;
        });
    }
}

// Toggle View Button Logic
if (document.getElementById("toggle-view-button") != null) {
    const toggleViewButton = document.getElementById("toggle-view-button");
    const viewSimple = document.getElementsByClassName("view-simple");
    const viewAdvanced = document.getElementsByClassName("view-advanced");
    toggleViewButton.addEventListener("click", () => {
        simpleText = "Simplify (Standard View)";
        advancedText = "Delve Deeper (Advanced View)";

        if (toggleViewButton.innerHTML === advancedText) {
            toggleViewButton.innerHTML = simpleText;   
        }
        else {
            toggleViewButton.innerHTML = advancedText;   
        }

        for (element of viewSimple) {
            element.classList.toggle("hidden");
        }

        for (element of viewAdvanced) {
            element.classList.toggle("hidden");
        }
    });
}

// Theme Select Logic

// Collapse Button
const themeSelectButton = document.getElementById("theme-select-button");
const themeSelectThemes = document.getElementById("theme-select-themes");

themeSelectButton.addEventListener("click", (e) => {
    // Stop menu from closing immediately when opened because of event bubbling
    e.stopPropagation();

    // Toggle Themes
    toggleThemeMenu();
});

themeSelectButton.addEventListener("keyup", (e) => {
    e.stopPropagation();

    if (!keyboardBlackList.includes(e.key)) {
        toggleThemeMenu();
    }

    if (e.key == "Escape" && themeSelectThemes.style.maxHeight) {
        toggleThemeMenu();
    }
})

// Collapse the theme list when not in focus
document.addEventListener("click", (e) => {
    if (themeSelectThemes.style.maxHeight && (document.activeElement != themeSelectThemes && !collectionContains(themeSelectThemes.firstElementChild.children, document.activeElement))) {
        toggleThemeMenu();
    }
});

// Collapse theme list when not in focus
document.addEventListener("keyup", (e) => {
    if (themeSelectThemes.style.maxHeight && (document.activeElement != themeSelectThemes && !collectionContains(themeSelectThemes.firstElementChild.children, document.activeElement))) {
        toggleThemeMenu();
    }
});

// Stop bubbling to prevent menu from shutting when clicking on the menu itself
themeSelectThemes.addEventListener("click", (e) => {
    e.stopPropagation();
});

// Confirm Current Theme
const darkTheme = document.getElementById("theme-dark");
const lightTheme = document.getElementById("theme-light");
const carmineTheme = document.getElementById("theme-carmine");
const colorBlindTheme = document.getElementById("theme-colorblind");
const themes = [darkTheme, lightTheme, carmineTheme, colorBlindTheme];

if (localStorage.getItem("theme")) {
    document.body.classList = "";
    document.body.classList.add(localStorage.getItem("theme"));
}

// Highlight Current Theme
for (theme of themes) {
    if (document.body.classList.contains(theme.id)) {
        theme.classList.add("current-theme");
    } else {
        theme.classList.remove("current-theme");
    }
}

// Change Current Theme
for (theme of themes) {
    // Mouse logic
    theme.addEventListener("click", function (e) {
        // If the theme clicked on isn't the current theme
        if (!document.body.classList.contains(this.id)) {
            // Clear the body's classList
            document.body.className = "";
            // Clear current theme
            document.getElementsByClassName("current-theme")[0].classList.remove("current-theme");
            // Add selected theme
            document.body.classList.add(this.id);
            // Set selected theme as current
            this.classList.add("current-theme");
            // Add selected theme to localStorage
            localStorage.setItem("theme", this.id);

            // Specifically for projects page cards
            if (typeof colorTheCards != "undefined") {
                colorTheCards();
            }
        }
    });

    // Keyboard logic
    theme.addEventListener("keydown", function (e) {
        if (!keyboardBlackList.includes(e.key) && !document.body.classList.contains(this.id)) {
            // Clear the body's classList
            document.body.className = "";
            // Clear current theme
            document.getElementsByClassName("current-theme")[0].classList.remove("current-theme");
            // Add selected theme
            document.body.classList.add(this.id);
            // Set selected theme as current
            this.classList.add("current-theme");
            // Add selected theme to localStorage
            localStorage.setItem("theme", this.id);

            // Specifically for projects page cards
            if (typeof colorTheCards != "undefined") {
                colorTheCards();
            }
        }
    });
}

// Functions
function toggleThemeMenu() {
    if (themeSelectThemes.style.maxHeight) {
        themeSelectThemes.style.maxHeight = null;
        themeSelectThemes.style.border = null;
        themeSelectThemes.style.paddingTop = null;
        themeSelectThemes.style.paddingBottom = null;
        for (child of themeSelectThemes.firstElementChild.children) {
            child.setAttribute("tabIndex", "-1");
        }
    } else {
        // Get computed style of 1rem (font-size of root element) * 2 (2rem, 1 top padding and 1 bottom padding) + scrollHeight of ul
        themeSelectThemes.style.maxHeight = parseInt(getComputedStyle(document.getElementsByTagName("body")[0]).getPropertyValue("font-size")) * 2 + themeSelectThemes.scrollHeight + "px";
        themeSelectThemes.style.borderWidth = "2px";
        themeSelectThemes.style.paddingTop = "1rem";
        themeSelectThemes.style.paddingBottom = "1rem";
        for (child of themeSelectThemes.firstElementChild.children) {
            child.setAttribute("tabIndex", "0");
        }
    }
}

function collectionContains(htmlCollection, element) {
    for (child of htmlCollection) {
        if (child == element) {
            return true;
        }
    }

    return false;
}