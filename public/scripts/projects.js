const projects = document.getElementsByClassName("card");
const projectTitle = document.getElementsByClassName("card-title");
const projectViewSimple = document.getElementsByClassName("view-simple");
const projectViewAdvanced = document.getElementsByClassName("view-advanced");
const toggleViewButton = document.getElementById("toggle-view-button");

// Add progressive opacity changes to each project
for (let x = 0; x < projects.length; x++) {
    // Calculate alpha based on number of projects
    const alpha = 1 - (x * (1 / (projects.length + 2)));
    projectTitle[x].style.backgroundColor = `hsla(240, 100%, 30%, ${alpha})`;
    projectViewSimple[x].style.backgroundColor = `hsla(0, 0%, 30%, ${alpha})`;
    projectViewAdvanced[x].style.backgroundColor = `hsla(0, 0%, 30%, ${alpha})`;
}

// Add click and hover event listeners to projects
for (let project of projects) {
    let projectName = encodeURIComponent(project.firstElementChild.innerHTML);
    
    // On click, navigate
    project.addEventListener("click", () => {
        window.location = `/projects/${projectName}`;
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

// Logic for advanced view toggle is in global.js