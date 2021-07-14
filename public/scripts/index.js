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

        // Swipe Event Listener - Touch
        let start = 0, diff = 0, end = 0;
        navBtns[buttonNumber].addEventListener("touchstart", function (e) {
            start = e.touches[0].pageX;
            this.style.left = "0px";

            this.style.position = "relative";
    });

        navBtns[buttonNumber].addEventListener("touchmove", function (e) {
            end = e.touches[0].pageX;
            diff = end - start;

            if (diff > 0) {
                this.style.left = diff+"px";
}
        });

        navBtns[buttonNumber].addEventListener("touchend", function (e) {
            if (diff < this.parentElement.clientWidth / 3) {
                console.log(`diff: ${diff}`);
                console.log(`availWidth: ${this.parentElement.clientWidth}`);
                this.style.left = "0px";
                start = end = diff = 0;

                this.style.position = "static";
            }

            e.preventDefault();
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
}
