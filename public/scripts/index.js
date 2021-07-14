const navBtns = document.getElementsByClassName('nav-container');

/******************
 * Helper Object
 *****************/ 
const helper = {
    // Function to call when attaching mousemove event listeners
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
    // Used to calculate x-axis movement on nav arrows
    diff: 0,
    // Used to ensure nav arrow swipe proper directions
    direction: "",
    // Sets/Resets nav arrow direction
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

/****************
 * Button Logic
 ***************/
for (let buttonNumber = 0; buttonNumber < navBtns.length; buttonNumber++) {
    /**********************
     * Find button labels
     *********************/ 
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
    
    /********************************
     * Swipe Event Listener - Touch
     *******************************/
    let start = 0, diff = 0, end = 0;

    // Touch Start Event Listener
    navBtns[buttonNumber].addEventListener("touchstart", function (e) {
        start = e.touches[0].pageX;
        this.style.left = "0px";
        helper.setDirection(buttonNumber);

        this.style.position = "relative";
    });

    // Touch Move Event Listener
    navBtns[buttonNumber].addEventListener("touchmove", function (e) {
        end = e.touches[0].pageX;
        diff = end - start;

        if (diff > 0 && helper.direction == "right") {
            this.style.left = diff+"px";
        } else if (diff < 0 && helper.direction == "left") {
            this.style.left = diff+"px";
        }
    });

    // Touch End Event Listener
    navBtns[buttonNumber].addEventListener("touchend", function () {
        if (diff < this.parentElement.clientWidth / 3 && helper.direction == "right") {
            this.style.left = "0px";
            start = end = diff = 0;

            this.style.position = "static";
        } else if (diff > -this.parentElement.clientWidth / 3 && helper.direction == "left") {
            this.style.left = "0px";
            start = end = diff = 0;

            this.style.position = "static";
        } else if (helper.direction == "right") {
            this.classList.add("nav-swipe-right");
            window.location = encodeURIComponent(label.toLowerCase());
        } else {
            this.classList.add("nav-swipe-left");
            window.location = encodeURIComponent(label.toLowerCase());
        }

        helper.setDirection();

        e.preventDefault();
    });

    /********************************
     * Swipe Event Listener - Mouse
     *******************************/

    // Mouse Down Event Listener
    navBtns[buttonNumber].addEventListener("mousedown", function (e) {
        e.preventDefault(e);
        start = e.pageX;
        this.style.position = "relative";
        helper.setDirection(buttonNumber);

        // Mouse Move Event Listener
        this.hasMouseMoveEL = true;
        this.addEventListener("mousemove", helper.attachElementToCursor);
    });

    // Mouse Up Event Listener
    document.addEventListener("mouseup", function (e) {
        e.preventDefault();
        // Optimization - Check to see if button has mousemove event listener before doing other calculations
        if (navBtns[buttonNumber].hasMouseMoveEL) {
            navBtns[buttonNumber].removeEventListener("mousemove", helper.attachElementToCursor);
            // If the nav button moves right/left, it must be at least 33% through the parent element to register as swiped
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
            } else if (helper.direction == "right") {
                navBtns[buttonNumber].classList.add("nav-swipe-right");
                window.location = encodeURIComponent(label.toLowerCase());
            } else {
                navBtns[buttonNumber].classList.add("nav-swipe-left");
                window.location = encodeURIComponent(label.toLowerCase());
            }
            // Confirm mousemove was cleared
            navBtns[buttonNumber].hasMouseMoveEL = false;
        }
    });

    /************************
     * Click Event Listener
     ***********************/

    navBtns[buttonNumber].addEventListener("click", () => {
        if (navBtns[buttonNumber].style.left == "0px") {
            navBtns[buttonNumber].classList.add("jiggle");
            setTimeout(() => {
                navBtns[buttonNumber].classList.remove("jiggle");
            }, 500);
        }
    });
}
