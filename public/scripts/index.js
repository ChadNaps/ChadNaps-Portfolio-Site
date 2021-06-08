const basicbtn = document.getElementById("basic-button");
const advbtn = document.getElementById("advanced-button");

basicbtn.addEventListener("click", () => {
    location.href = "/basic";
});

advbtn.addEventListener("click", () => {
    location.href = "/advanced";
});