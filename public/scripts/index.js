const projectsBtn = document.getElementsByClassName('nav-projects');
const aboutmeBtn = document.getElementsByClassName('nav-aboutme');
const socialsBtn = document.getElementsByClassName('nav-socials');

for (const element of projectsBtn) {
    element.addEventListener("click", () => {
        window.location = "/projects";
    });
}

for (const element of aboutmeBtn) {
    element.addEventListener("click", () => {
        window.location = "/about me";
    });
}