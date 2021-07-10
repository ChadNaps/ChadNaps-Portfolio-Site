const email = [
    document.getElementById("logo-email"),
    document.getElementById("text-email")
];

const twitter = [
    document.getElementById("logo-twitter"),
    document.getElementById("text-twitter")
];

const github = [
    document.getElementById("logo-github"),
    document.getElementById("text-github")
];

const linkedin = [
    document.getElementById("logo-linkedin"),
    document.getElementById("text-linkedin")
];

for (child of email) {
    child.addEventListener("click", () => {
        parent.location = "mailto:contact@chadnaps.com";
    });
};

for (child of twitter) {
    child.addEventListener("click", () => {
        window.open("https://twitter.com/Chad_Napper", "_blank");
    });
};

for (child of github) {
    child.addEventListener("click", () => {
        window.open("https://github.com/ChadNaps", "_blank");
    });
};

for (child of linkedin) {
    child.addEventListener("click", () => {
        window.open("https://www.linkedin.com/in/chad-napper-66114812a/", "_blank");
    });
};