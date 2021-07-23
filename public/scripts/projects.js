const projects = document.getElementsByClassName("card");
const projectTitle = document.getElementsByClassName("card-title");
const projectViewSimple = document.getElementsByClassName("view-simple");
const projectViewAdvanced = document.getElementsByClassName("view-advanced");
const toggleViewButton = document.getElementById("toggle-view-button");

// Add progressive opacity changes to each project
for (let x = 0; x < projects.length; x++) {
    // Calculate alpha based on number of projects
    const alpha = 1 - (x * (1 / (projects.length + 2)));
    
    // Get default colors
    let titleColor = getComputedStyle(projectTitle[x]).getPropertyValue('--projects-cards-title');
    let descriptionColor = getComputedStyle(projectViewSimple[x]).getPropertyValue('--projects-cards-description');
    
    // Alter alpha of current colors
    titleColor = changeAlpha(titleColor, alpha);
    descriptionColor = changeAlpha(descriptionColor, alpha);

    // Apply colors to cards
    projectTitle[x].style.setProperty('--projects-cards-title', titleColor);
    projectViewSimple[x].style.setProperty('--projects-cards-description', descriptionColor);
    projectViewAdvanced[x].style.setProperty('--projects-cards-description', descriptionColor);
}

// Add click and hover event listeners to projects
for (let project of projects) {
    let projectName = encodeURIComponent(project.firstElementChild.innerHTML);
    
    // On click, navigate
    project.addEventListener("click", () => {
        window.open(`/projects/${projectName}`, "_blank");
    });

    // On hover, invert title and description backgrounds
    project.addEventListener("mouseenter", () => {
        let elementsToSwap = [];

        // Find elements
        if (elementsToSwap.length == 0) {
            for (child of project.children) {
                if (child.tagName == "H3" || child.tagName == "P") {
                    elementsToSwap.push(child);
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
                if (child.tagName == "H3" || child.tagName == "P") {
                    elementsToSwap.push(child);
                }
            }
        }

        // Swap
        elementsToSwap = swapColors(elementsToSwap);
    });
}

// Helper Functions
function swapColors(elements) {
    elements[1].style.backgroundColor = elements[0].style.backgroundColor;
    elements[0].style.backgroundColor = elements[2].style.backgroundColor;
    elements[2].style.backgroundColor = elements[1].style.backgroundColor;

    return elements;
}

function changeAlpha(originalValue, newAlpha) {
    // Check for proper input
    if (originalValue.slice(1, 5) != "hsla") {
        console.error(`Improper value for card header/description. 
        Received ${originalValue.slice(1, 5)}(), was expecting hsla().`);

        return;
    }

    const newValue = originalValue.slice(0, -2) + newAlpha.toString() + ')';

    return newValue;
}

// Logic for advanced view toggle is in global.js