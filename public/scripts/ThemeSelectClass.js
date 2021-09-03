class ThemeSelect {
    constructor() {
        /* Class Variables */
        this.button = document.getElementById("theme-select-button");
        this.menu = document.getElementById("theme-select-themes");
        this.themeSelectMenuIsOpen = Boolean(this.menu.style.maxHeight);
        this.themes = [
            document.getElementById("theme-dark"),
            document.getElementById("theme-light"),
            document.getElementById("theme-carmine"),
            document.getElementById("theme-colorblind")
        ];

        /* Initialize Menu */
        this.#loadStoredThemeIfItExists();
        this.#initializeEventListeners();
        this.#highlightCurrentThemeInMenu();
    }

    /* Public Class Methods */
    toggleThemeMenu() {
        if (this.themeSelectMenuIsOpen) {
            this.menu.style.maxHeight = null;
            this.menu.style.border = null;
            this.menu.style.paddingTop = null;
            this.menu.style.paddingBottom = null;
            this.themeSelectMenuIsOpen = false;
        } else {
            // Get computed style of 1rem (font-size of root element) * 2 (2rem, 1 top padding and 1 bottom padding) + scrollHeight of ul
            this.menu.style.maxHeight = parseInt(getComputedStyle(document.getElementsByTagName("body")[0]).getPropertyValue("font-size")) * 2 + this.menu.scrollHeight + "px";
            this.menu.style.borderWidth = "2px";
            this.menu.style.paddingTop = "1rem";
            this.menu.style.paddingBottom = "1rem";
            this.themeSelectMenuIsOpen = true;
        }
    }

    changeTheme(theme) {
        /* Local Variables */
        const selectedThemeIsCurrentTheme = document.body.classList.contains(this.id);
        const projectPageCardsExist = typeof colorTheCards != "undefined";

        /* Main */
        if (!selectedThemeIsCurrentTheme) {
            clearOldTheme();
            setNewTheme(theme);

            if (projectPageCardsExist) {
                colorTheCards();
            }
        }

        /* Local Functions */
        function clearOldTheme() {
            clearBodyClassList();
            clearCurrentTheme();
        }

        function setNewTheme(theme) {
            addSelectedThemeToBody(theme);
            setSelectedThemeAsCurrent(theme);
            storeSelectedThemeInLocalStorage(theme);
        }

        function clearBodyClassList() {
            document.body.className = "";
        }

        function clearCurrentTheme() {
            document.getElementsByClassName("current-theme")[0].classList.remove("current-theme");
        }

        function addSelectedThemeToBody(theme) {
            document.body.classList.add(theme.id);
        }

        function setSelectedThemeAsCurrent(theme) {
            theme.classList.add("current-theme");
        }

        function storeSelectedThemeInLocalStorage(theme) {
            localStorage.setItem("theme", theme.id);
        }
    }

    /* Private Class Methods */
    #loadStoredThemeIfItExists() {
        /* Local Variable */
        const storedThemeExists = localStorage.getItem("theme");

        /* Main */
        if (storedThemeExists) {
            this.#clearCurrentTheme();
            this.#setStoredTheme();
        }
    }

    #initializeEventListeners() {
        /* Menu Collapse/Expand Listeners */
        // Open/Close menu when clicking the button
        this.button.addEventListener("click", (event) => {
            // Stop menu from closing immediately when opened because of event bubbling
            event.stopPropagation();

            // Toggle Themes
            this.toggleThemeMenu();
        });

        // Stop bubbling to prevent menu from shutting when clicking on the menu itself
        this.menu.addEventListener("click", (event) => {
            event.stopPropagation();
        });

        // Collapse the theme menu when clicking anywhere but the menu
        document.addEventListener("click", () => {
            if (this.themeSelectMenuIsOpen) {
                this.toggleThemeMenu();
            }
        });

        /* Theme Selection Listener */
        // Change Current Theme
        for (let theme of this.themes) {
            // Context changes from this object to the <li> containing the theme,
            // so a buffer is required to call changeTheme on properly
            const that = this;
            theme.addEventListener("click", function () { that.changeTheme(this); });
        }
    }

    #highlightCurrentThemeInMenu() {
        for (let theme of this.themes) {
            if (document.body.classList.contains(theme.id)) {
                theme.classList.add("current-theme");
            } else {
                theme.classList.remove("current-theme");
            }
        }
    }

    #clearCurrentTheme() {
        document.body.className = "";
    }

    #setStoredTheme() {
        document.body.classList.add(localStorage.getItem("theme"));
    }
}

export default ThemeSelect;
