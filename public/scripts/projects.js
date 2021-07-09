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

// Add click event listeners to projects
for (let project of projects) {
    let projectName = encodeURIComponent(project.firstElementChild.innerHTML);
    
    project.addEventListener("click", () => {
        window.location = `/projects/${projectName}`;
    });
}

// Logic for advanced view toggle is in global.js