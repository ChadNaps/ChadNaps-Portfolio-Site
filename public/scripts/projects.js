const projects = document.getElementsByClassName("card");
const projectTitle = document.getElementsByClassName("card-title");
const projectViewSimple = document.getElementsByClassName("view-simple");
const projectViewAdvanced = document.getElementsByClassName("view-advanced");

// Initial Coloring
window.addEventListener("load", () => {
    colorTheCards();
});

// Add hover event listeners to projects
for (let project of projects) {
    // On hover, invert title and description backgrounds
    project.addEventListener("mouseenter", () => {
        let elementsToSwap = [];

        // Find elements
        if (elementsToSwap.length == 0) {
            for (child of project.children) {
                if (child.tagName == "H1" || child.tagName == "P") {
                    elementsToSwap.push(child);
                }

                for (grandchild of child.children) {
                    if (grandchild.tagName == "H1" || grandchild.tagName == "P") {
                        elementsToSwap.push(grandchild);
                    }
                }
            }
        }

        // Swap
        elementsToSwap = swapColors(elementsToSwap);
    });

    project.addEventListener("mouseleave", () => {
        let elementsToSwap = [];

        // Find elements
        if (elementsToSwap.length == 0) {
            for (child of project.children) {
                if (child.tagName == "H1" || child.tagName == "P") {
                    elementsToSwap.push(child);
                }
                
                for (grandchild of child.children) {
                    if (grandchild.tagName == "H1" || grandchild.tagName == "P") {
                        elementsToSwap.push(grandchild);
                    }
                }
            }
        }

        // Swap
        elementsToSwap = swapColors(elementsToSwap);
    });
}

// Helper Functions
function swapColors(elements) {
    const title = getComputedStyle(elements[0]).getPropertyValue("--projects-cards-title-background-color");
    const desc = getComputedStyle(elements[1]).getPropertyValue("--projects-cards-description-background-color");

    if (getComputedStyle(elements[0]).getPropertyValue("--projects-cards-title-background-color") == title) {
        elements[0].style.setProperty("--projects-cards-title-background-color", desc);
        elements[1].style.setProperty("--projects-cards-description-background-color", title);
        elements[2].style.setProperty("--projects-cards-description-background-color", title);
    } else {
        elements[0].style.setProperty("--projects-cards-title-background-color", title);
        elements[1].style.setProperty("--projects-cards-description-background-color", desc);
        elements[2].style.setProperty("--projects-cards-description-background-color", desc);
    }

    return elements;
}

function changeAlpha(originalValue, newAlpha) {
    // Check for proper input
    if (originalValue.slice(0, 4) == "hsl(") {
        // Reformat to hsla(): hsl(xxx, xxx, xxx) ==> hsla(xxx, xxx, xxx, alpha)
        return originalValue.slice(0, 3) + 'a(' + originalValue.slice(4, -1) + ', ' + newAlpha.toString() + ')';

    } else if (originalValue.slice(0, 5) == "hsla(") {
        return originalValue.slice(0, -2) + newAlpha.toString() + ')';

    } else {
        console.error(`Improper value for card header/description. 
        Received ${originalValue}, was expecting hsla() or hsl().`);

        return;
    }
}

function colorTheCards() {
    // Add progressive opacity changes to each project
    for (let x = 0; x < projects.length; x++) {
        // Calculate alpha based on number of projects
        const alpha = 1 - (x * (1 / (projects.length + 2)));
        
        // Get default colors
        let titleColor = getComputedStyle(document.body).getPropertyValue('--projects-cards-title-background-color').trim();
        let descriptionColor = getComputedStyle(document.body).getPropertyValue('--projects-cards-description-background-color').trim();
        
        // Alter alpha of current colors
        titleColor = changeAlpha(titleColor, alpha);
        descriptionColor = changeAlpha(descriptionColor, alpha);

        // Apply colors to cards
        projectTitle[x].style.setProperty('--projects-cards-title-background-color', titleColor);
        projectViewSimple[x].style.setProperty('--projects-cards-description-background-color', descriptionColor);
        projectViewAdvanced[x].style.setProperty('--projects-cards-description-background-color', descriptionColor);
    }
}

// Logic for advanced view toggle is in global.js