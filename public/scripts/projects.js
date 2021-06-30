const projects = document.getElementsByClassName("div-projects");
const toggleViewButton = document.getElementById("toggle-view-button");

// Add progressive opacity changes to each project
for (let x = 0; x < projects.length; x++) {
    // Calculate alpha based on number of projects
    const alpha = 1 - (x * (1 / projects.length));
    projects[x].style.backgroundColor = `hsla(0, 0%, 75%, ${alpha})`;
}

// Add event listeners to projects
for (let project of projects) {
    let projectName = encodeURIComponent(project.firstElementChild.innerHTML);
    
    project.addEventListener("click", () => {
        window.location = `/projects/${projectName}`;
    });
}

// Toggle View Button logic
toggleViewButton.addEventListener("click", () => {
    simpleText = "Simplify (Standard View)";
    advancedText = "Delve Deeper (Advanced View)";

    if (toggleViewButton.innerHTML === advancedText) {
        toggleViewButton.innerHTML = simpleText;   
    }
    else {
        toggleViewButton.innerHTML = advancedText;   
    }

    for (project of projects) {
        for (child of project.children) {
            if (child.classList.contains("view-simple")) {
                child.classList.toggle("hidden");
            }

            if (child.classList.contains("view-advanced")) {
                child.classList.toggle("hidden");
            }
        }
    }
});