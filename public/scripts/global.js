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
