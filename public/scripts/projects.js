const projects = document.getElementsByClassName("div-projects");

// Add progressive opacity changes to each project
for (let x = 0; x < projects.length; x++) {
    // Calculate alpha based on number of projects
    const alpha = 1 - (x * (1 / projects.length));
    projects[x].style.backgroundColor = `hsla(0, 0%, 75%, ${alpha})`;
}