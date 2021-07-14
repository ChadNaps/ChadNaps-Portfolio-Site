const navBtns = document.getElementsByClassName('nav-container');

// Helper Object
const helper = {
    attachElementToCursor: function (event) {
        event.preventDefault();
        const element = event.target.parentElement;

        helper.diff += event.movementX;

        if (helper.diff > 0 && helper.direction == "right") {
            element.style.left = helper.diff+"px";
        } else if (helper.diff < 0 && helper.direction == "left") {
            element.style.left = helper.diff+"px";
        }
    },
    diff: 0,
    direction: "",
    setDirection: function (buttonNumber) {
        if (typeof buttonNumber == "undefined") {
            helper.direction = "";
        } else {
            if (buttonNumber % 2 == 0) {
                helper.direction = "right";
            } else {
                helper.direction = "left";
            }
        }
    }
}

// Find button labels
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

    navBtns[buttonNumber].addEventListener("touchend", function () {
        if (diff < this.parentElement.clientWidth / 3) {
            this.style.left = "0px";
            start = end = diff = 0;

            this.style.position = "static";
        }

        e.preventDefault();
    });

    // Swipe Event Listener - Mouse
    navBtns[buttonNumber].addEventListener("mousedown", function (e) {
        e.preventDefault(e);
        start = e.pageX;
        this.style.position = "relative";
        helper.setDirection(buttonNumber);

        this.hasMouseMoveEL = true;
        this.addEventListener("mousemove", helper.attachElementToCursor);
    });

    document.addEventListener("mouseup", function (e) {
        e.preventDefault();
        if (navBtns[buttonNumber].hasMouseMoveEL) {
            navBtns[buttonNumber].removeEventListener("mousemove", helper.attachElementToCursor);
            if (helper.diff < navBtns[buttonNumber].parentElement.clientWidth / 3 && helper.direction == "right") {
                navBtns[buttonNumber].style.left = "0px";
                helper.setDirection();
                start = helper.diff = 0;
                navBtns[buttonNumber].style.position = "static";
            } else if (helper.diff > -navBtns[buttonNumber].parentElement.clientWidth / 3 && helper.direction == "left") {
                navBtns[buttonNumber].style.left = "0px";
                helper.setDirection();
                start = helper.diff = 0;
                navBtns[buttonNumber].style.position = "static";
            }
            navBtns[buttonNumber].hasMouseMoveEL = false;
        }
    });
    
    if (label == "Projects") {
        // Click Event Listener
        navBtns[buttonNumber].addEventListener("click", () => {
            // window.location = "/projects";
        });

    } else if (label == "About Me") {
        navBtns[buttonNumber].addEventListener("click", () => {
            // window.location = "/about%20me";
        });
    } else if (label == "Socials") {
        navBtns[buttonNumber].addEventListener("click", () => {
            // window.location = "/socials";
        });
    } else {
        console.error(`Path ${label} not found!`);
    }
}
