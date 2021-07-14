const navBtns = document.getElementsByClassName('nav-container');

for (let buttonNumber = 0; buttonNumber < navBtns.length; buttonNumber++) {
    let label = "";
    for (let childNumber = 0; childNumber < navBtns[buttonNumber].children.length; childNumber++) {
        for (let grandchildNumber = 0; grandchildNumber < navBtns[buttonNumber].children[childNumber].children.length; grandchildNumber++) {
            const tempLabel = navBtns[buttonNumber].children[childNumber].children[grandchildNumber].innerHTML;

            if (tempLabel == "Projects" ||
                tempLabel == "About Me" ||
                tempLabel == "Socials") {
                label = tempLabel;
            }
        }
    }
    
    if (label == "Projects") {
        // Click Event Listener
        navBtns[buttonNumber].addEventListener("click", () => {
            // window.location = "/projects";
        });
    });
}

for (const element of aboutmeBtn) {
    element.addEventListener("click", () => {
        window.location = "/about me";
    });
}

        navBtns[buttonNumber].addEventListener("mouseup", function () {
            console.log("Mouse up...");
        });

    } else if (label == "About Me") {
        navBtns[buttonNumber].addEventListener("click", () => {
            window.location = "/about%20me";
        });
    } else if (label == "Socials") {
        navBtns[buttonNumber].addEventListener("click", () => {
        window.location = "/socials";
    });
    } else {
        console.error(`Path ${label} not found!`);
}