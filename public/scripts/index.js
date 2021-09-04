/*****************
 *** Variables ***
 ****************/

const navBtns = document.getElementsByClassName('nav-container');
const additionalNavDelay = 400; // Milliseconds


/*********************
 *** Helper Object ***
 ********************/ 

const helper = {
    // Function to call when attaching mousemove event listeners
    attachElementToCursor: function (event) {
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


/************
 *** Main ***
 ***********/ 
for (let buttonNumber = 0; buttonNumber < navBtns.length; buttonNumber++) {
    /* Local Variables */
    let label = findButtonLabel(buttonNumber);
    let navDelay = getNavDelay();
    
    // Initialize variables
    let start = 0, diff = 0, end = 0;
    navBtns[buttonNumber].style.left = "0px";
    
    /* Swipe Event Listener - Touch */
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
        /* Local Variables */
        const rightFacingArrowWasMovedByTouch = diff < this.parentElement.clientWidth / 3 && helper.direction == "right";
        const wasMovedRightNotJustTapped = diff > 0;
        const rightFacingArrowWasNotMovedFarEnough = rightFacingArrowWasMovedByTouch && wasMovedRightNotJustTapped;
        const leftFacingArrowWasMovedByTouch = diff > -this.parentElement.clientWidth / 3 && helper.direction == "left";
        const wasMovedLeftNotJustTapped = diff < 0;
        const leftFacingArrowWasNotMovedFarEnough = leftFacingArrowWasMovedByTouch && wasMovedLeftNotJustTapped;
        
        /* Main */
        if (rightFacingArrowWasNotMovedFarEnough) {
            start = resetButtonState(buttonNumber, start);
        } else if (leftFacingArrowWasNotMovedFarEnough) {
            start = resetButtonState(buttonNumber, start);
        } else {
            navigate(buttonNumber, label, navDelay);
        }

        helper.setDirection();
    });

    /* Swipe Event Listener - Mouse */

    // Mouse Down Event Listener
    navBtns[buttonNumber].addEventListener("mousedown", function (e) {
        start = trackStartingValues(start, e, buttonNumber);

        // Mouse Move Event Listener
        this.hasMouseMoveEL = true;
        this.addEventListener("mousemove", helper.attachElementToCursor);
    });

    // Mouse Up Event Listener
    document.addEventListener("mouseup", function (e) {
        // Optimization - Check to see if button has mousemove event listener before doing other calculations
        if (navBtns[buttonNumber].hasMouseMoveEL) {
            navBtns[buttonNumber].removeEventListener("mousemove", helper.attachElementToCursor);

            /* Local Variables */
            const wasMovedRightNotJustClicked = helper.diff > 0;
            const wasMovedLeftNotJustClicked = helper.diff < 0;
            const leftFacingNavArrowWasMovedByMouse = helper.diff > -navBtns[buttonNumber].parentElement.clientWidth / 3 && helper.direction == "left";
            const rightFacingNavArrowWasMovedByMouse = helper.diff < navBtns[buttonNumber].parentElement.clientWidth / 3 && helper.direction == "right";
            const leftFacingArrowWasNotMovedFarEnough = leftFacingNavArrowWasMovedByMouse && wasMovedLeftNotJustClicked;
            const rightFacingArrowWasNotMovedFarEnough = rightFacingNavArrowWasMovedByMouse && wasMovedRightNotJustClicked;

            /* Main */
            // If the nav button moves right/left, it must be at least 33% through the parent element to register as swiped
            if (rightFacingArrowWasNotMovedFarEnough) {
                start = resetButtonState(buttonNumber, start);
            } else if (leftFacingArrowWasNotMovedFarEnough) {
                start = resetButtonState(buttonNumber, start);
            } else {
                navigate(buttonNumber, label, navDelay); 
            }

            // Confirm mousemove was cleared
            navBtns[buttonNumber].hasMouseMoveEL = false;
        }
    });
}


/*****************
 *** Functions ***
 ****************/ 

function trackStartingValues(start, e, buttonNumber) {
    start = e.pageX;
    navBtns[buttonNumber].style.position = "relative";
    helper.setDirection(buttonNumber);
    return start;
}

function navigate(buttonNumber, destination, navDelay) {
    /* Main */
    addNavSwipeAnimation();
    navigateAfterAnimationEnds();

    /* Local Functions */
    function addNavSwipeAnimation() {
        const isRightFacingNavArrow = helper.direction == "right";
        
        if (isRightFacingNavArrow) {
            navBtns[buttonNumber].classList.add("nav-swipe-right");
        } else {
            navBtns[buttonNumber].classList.add("nav-swipe-left");
        }
    }

    function navigateAfterAnimationEnds() {
        setTimeout(() => { window.location = encodeURIComponent(destination.toLowerCase()); }, navDelay);
    }
}

function resetButtonState(buttonNumber, startingPosition) {
    navBtns[buttonNumber].style.left = "0px";
    helper.setDirection();
    startingPosition = helper.diff = 0;
    navBtns[buttonNumber].style.position = "static";
    return startingPosition;
}

function getNavDelay() {
    // In order to get the transition-duration automatically and avoid manually updating it when .nav-swipe-right/left
    // changes, I had to create an empty div and attach it to the body. window.getComputedStyle would hold blank values
    // otherwise.
    const dummyNavArrow = createDummyNavArrow();
    navDelay = getComputedStyle(dummyNavArrow).getPropertyValue("transition-duration");
    navDelay = cleanInput(navDelay);

    // Doesn't quite look right, extending the delay a tiny bit longer before navigating
    navDelay += additionalNavDelay;

    return navDelay;

    /* Local Functions */
    function createDummyNavArrow() {
        const dummyNavArrow = document.createElement("DIV");
        dummyNavArrow.classList.add("nav-swipe-right", "hidden");
        document.getElementsByTagName("body")[0].appendChild(dummyNavArrow);
        return dummyNavArrow;
    }

    function cleanInput(input) {
        // Returns value in milliseconds
        if (input.slice(-2) == "ms") {
            return navDelay = parseInt(navDelay);
        } else {
            return navDelay = parseFloat(navDelay) * 1000;
        }
    }
}

function findButtonLabel(buttonNumber) {
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
    return label;
}

/***************************
 *** UI Addon Glitch Fix ***
 **************************/
// Some addons add 0 height <div>s to the body, but this causes the index page to realign
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