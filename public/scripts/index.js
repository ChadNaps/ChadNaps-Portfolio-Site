const navBtns = document.getElementById('section-nav').firstElementChild.children;

/*********************
 *** Helper Object ***
 ********************/ 
const helper = {
    // Function to call when attaching mousemove event listeners
    attachElementToCursor: function (event) {
        event.preventDefault();
        
        const element = this;

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
 * Button Logic *
 ***************/
for (let buttonNumber = 0; buttonNumber < navBtns.length; buttonNumber++) {

    /*****************
     * Set Nav Delay *
     ****************/
    // In order to get the transition-duration automatically and avoid manually updating it when .nav-swipe-right/left
    // changes, I had to create an empty div and attach it to the body. window.getComputedStyle would hold blank values
    // otherwise.
    emptyDiv = document.createElement("DIV");
    emptyDiv.classList.add("nav-swipe-right", "hidden");
    document.getElementsByTagName("body")[0].appendChild(emptyDiv);
    navDelay = getComputedStyle(emptyDiv).getPropertyValue("transition-duration");

    // Doesn't quite look right, extending the delay a tiny bit longer before navigating
    const additionalDelay = 0.4;

    if (navDelay.slice(-2) == "ms") {
        navDelay = parseInt(navDelay) + additionalDelay;
    } else {
        navDelay = (parseFloat(navDelay) + additionalDelay) * 1000;
    }
    
    /********************************
     * Swipe Event Listener - Touch
     *******************************/
    // Initialize variables
    let start = 0, diff = 0, end = 0;
    navBtns[buttonNumber].style.left = "0px";

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
        if (diff < this.parentElement.clientWidth / 3 && helper.direction == "right" && diff > 0) {
            this.style.left = "0px";
            start = end = diff = 0;

            this.style.position = "static";
        } else if (diff > -this.parentElement.clientWidth / 3 && helper.direction == "left" && diff > 0) {
            this.style.left = "0px";
            start = end = diff = 0;

            this.style.position = "static";
        } else if (helper.direction == "right") {
            this.classList.add("nav-swipe-right");
            setTimeout(() => {navBtns[buttonNumber].firstElementChild.click();}, navDelay); 
        } else if (helper.direction == "left") {
            this.classList.add("nav-swipe-left");
            setTimeout(() => {navBtns[buttonNumber].firstElementChild.click();}, navDelay); 
        }

        helper.setDirection();
    });

    /********************************
     * Swipe Event Listener - Mouse *
     *******************************/

    // Mouse Down Event Listener
    navBtns[buttonNumber].addEventListener("mousedown", function (e) {
        e.preventDefault();
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
            if (helper.diff < navBtns[buttonNumber].parentElement.clientWidth / 3 && helper.direction == "right" && helper.diff > 0) {
                navBtns[buttonNumber].style.left = "0px";
                helper.setDirection();
                start = helper.diff = 0;
                navBtns[buttonNumber].style.position = "static";
            } else if (helper.diff > -navBtns[buttonNumber].parentElement.clientWidth / 3 && helper.direction == "left" && helper.diff > 0) {
                navBtns[buttonNumber].style.left = "0px";
                helper.setDirection();
                start = helper.diff = 0;
                navBtns[buttonNumber].style.position = "static";
            } else if (helper.direction == "right") {
                navBtns[buttonNumber].classList.add("nav-swipe-right");
                setTimeout(() => {navBtns[buttonNumber].firstElementChild.click();}, navDelay); 
            } else {
                navBtns[buttonNumber].classList.add("nav-swipe-left");
                setTimeout(() => {navBtns[buttonNumber].firstElementChild.click();}, navDelay); 
            }
            // Confirm mousemove was cleared
            navBtns[buttonNumber].hasMouseMoveEL = false;
        }
    });

    navBtns[buttonNumber].firstElementChild.addEventListener("click", (e) => {
        if (e.isTrusted == true) {
            e.returnValue = false;
        
            const target = e.currentTarget;

            
            setTimeout(() => {target.click()}, navDelay);
        }
    });
    
    navBtns[buttonNumber].firstElementChild.addEventListener("keypress", (e) => {
        if (e.isTrusted == true) {
            e.returnValue = false;
        
            const target = e.currentTarget;
            
            helper.setDirection(buttonNumber);

            if (helper.direction == "right") {
                navBtns[buttonNumber].classList.add("nav-swipe-right");
            } else {
                navBtns[buttonNumber].classList.add("nav-swipe-left");
            }
            setTimeout(() => {target.click()}, navDelay);
        }
    });
}

/***************************
 *** UI Addon Glitch Fix ***
 **************************/
// Some addons add 0 height divs to the body, but this causes the index page to realign
// sporadically, so this adds the hidden class to any elements added beyond the original

const body = document.getElementsByTagName("BODY")[0];

function logMutations(mutations, observer) {
    if (body.children.length > 8) {
        for (x = 8; x < body.children.length; x++) {
            body.children[x].style.all = "";
            body.children[x].classList.add("hidden");
        }
    }
}

// Create an observer instance
const observer = new MutationObserver(logMutations);

// Start observing body
observer.observe(body, { childList: true });