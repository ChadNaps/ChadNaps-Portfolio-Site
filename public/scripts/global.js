if (document.getElementById("nav") != null) {
    const navItems = document.getElementById("nav").children;

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

    // Toggle View Button logic

if (document.getElementById("toggle-view-button") != null) {
    const toggleViewButton = document.getElementById("toggle-view-button");
    const cards = document.getElementsByClassName("card");
    toggleViewButton.addEventListener("click", () => {
        simpleText = "Simplify (Standard View)";
        advancedText = "Delve Deeper (Advanced View)";

        if (toggleViewButton.innerHTML === advancedText) {
            toggleViewButton.innerHTML = simpleText;   
        }
        else {
            toggleViewButton.innerHTML = advancedText;   
        }

        for (card of cards) {
            for (child of card.children) {
                if (child.classList.contains("view-simple")) {
                    child.classList.toggle("hidden");
                }

                if (child.classList.contains("view-advanced")) {
                    child.classList.toggle("hidden");
                }
            }
        }
    });
}

// Theme Select Logic
const darkTheme = document.getElementById("theme-dark");
const lightTheme = document.getElementById("theme-light");
const carmineTheme = document.getElementById("theme-carmine");
const colorBlindTheme = document.getElementById("theme-colorblind");
const themes = [darkTheme, lightTheme, carmineTheme, colorBlindTheme];

for (theme of themes) {
    if (document.body.classList.contains(theme.id)) {
        theme.classList.add("current-theme");
    }
}