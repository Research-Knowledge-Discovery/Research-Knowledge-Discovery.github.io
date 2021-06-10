var menuitems = document.getElementsByClassName('navbar-item has-dropdown');

function toggleMenu(menu) {
    // If passed menu is currently displayed, close it, and vice versa
    if (window.getComputedStyle(menu, null).display == 'none')
        menu.style.display = 'block';
    else
        menu.style.display = 'none';
}

// Variable to store the currently open drodown menu in order to derive which menu needs
// to be closed when a click is placed outside the menu
var open_menu;

function changeSize(mediaQuery) {
    // If page is resized past a breakpoint, close menu on resize past breakpoint on mobile and back
    if (mediaQuery.matches) {
        // Get all menu items with dropdowns
        var all_dropdowns = document.getElementsByClassName("navbar-item has-dropdown");
        for (let i = 0; i < all_dropdowns.length; i++) {
            // Since the menu item's second child contains the respective dropdown menu,
            // .children[1] is extracted and hidden when the page is resized past a breakpoint.

            // Without this solution, all dropdown menus that had been open in landscape mode
            // would still be open upon resize and vice versa, allowing more than one menu
            // to be open in landscape mode and breaking toggle logic.
            if (window.getComputedStyle(all_dropdowns[i].children[1], null).display == 'block') {
                all_dropdowns[i].children[1].style.display = 'none';
            }
        }
        // Clear variable
        open_menu = null;
    }
  }

// Setting media queries and respective handlers
var mediaQuery_mobile = window.matchMedia("(max-width: 1024px)");
var mediaQuery_desktop = window.matchMedia("(min-width: 1024px)");
mediaQuery_mobile.addListener(changeSize);
mediaQuery_desktop.addListener(changeSize);

// (Mostly landscape) Dropdown opening and closing logic.
// Clicks on different parts of the site and their effects on (open) dropdowns are handled here

// A dropdown menu needs to open when the corresponding menu item is clicked and needs to close when
// any point outside the dropdown menu is clicked. Addinitionally, if another menu item is clicked, 
// the corresponding dropdown needs to open instead.

// On mobile, only clicks on the menu items themselves can open and close menus.

// Add an event handler to all of the displayed page
document.addEventListener('click', function(e){
    // Track which DOM element was clicked
    var clicked_target = e.target;
    
    // LANDSCAPE
    if (Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) > 1024) {
        // Basically two cases:
        // - If the clicked element has a dropdown
        // and
        // - if the clicked element does not have a dropdown (somewhere else was clicked)
        
        // If the clicked element is a menu item with dropdown...
        // (Note: parentElement can be null if <html> is clicked somehow, check)
        if (clicked_target.parentElement != null && clicked_target.parentElement.className === "navbar-item has-dropdown ") {
            // If the clicked element is part of an already open dropdown but not a link...
            if (clicked_target.className == "navbar-dropdown") {
                // Do nothing. An open dropdown should not close when it itself is clicked
            }
            else {
                // If there already is an open dropdown menu...
                if (open_menu != null) {
                    // If the clicked item is the same item (compare via text content)
                    if (open_menu.innerText === clicked_target.innerText) {
                        // Close the menu and clear the variable
                        toggleMenu(clicked_target.nextElementSibling);
                        open_menu = null;
                    }
                    // If the clicked item is not the same item
                    else {
                        // Close the open menu and open the clicked menu
                        // Remember the open menu by storing it in the variable
                        toggleMenu(open_menu.nextElementSibling);
                        toggleMenu(clicked_target.nextElementSibling);
                        open_menu = clicked_target;
                    }
                }
                // If instead there is no currently open dropdown menu and the clicked item has
                // a dropdown menu...
                else {
                    // Open the clicked dropdown menu
                    // Remember which menu is open
                    toggleMenu(clicked_target.nextElementSibling);
                    open_menu = clicked_target;
                }
            }
        }
        // If the clicked element does not have a dropdown and thus is either a menu item
        // with a direct href or just a different spot in the document...
        else {
            // If there already is an open dropdown menu...
            if (open_menu != null) {
                if (clicked_target == document.getElementsByClassName("navbar-dropdown search")[0]) {

                }
                else {
                // Close the menu and clear the variable
                toggleMenu(open_menu.nextElementSibling);
                open_menu = null;
                }
            }
            else {
                // If no menu is currently open, do nothing 
            }
        }
    }
    // MOBILE
    else {
        // Prevent logic from breaking when <html> is clicked, and, if the clicked element 
        // is a dropdown, toggle
        if (clicked_target.parentElement != null && clicked_target.parentElement.className === "navbar-item has-dropdown ") {
            // If the clicked element is part of an already open dropdown but not a link...
            if (clicked_target.className == "navbar-dropdown") {
                // Do nothing. An open dropdown should not close when it itself is clicked
            }
            else {
                toggleMenu(clicked_target.nextElementSibling);
            }
        }
    }
});