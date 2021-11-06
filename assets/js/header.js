var menuitems = document.getElementsByClassName('navbar-item has-dropdown');

function toggleMenu(menu) {
    // If passed menu is currently displayed, close it, and vice versa
    if (window.getComputedStyle(menu, null).display == 'none')
        menu.style.display = 'block';
    else
        menu.style.display = 'none';
}

// Variable to store the currently open dropdown menu in order to derive which menu needs
// to be closed when a click is placed outside the menu
var open_menu;

function changeSize(mediaQuery) {
    // If page is resized past a breakpoint, close all menus on resize past breakpoint from mobile and back
    if (mediaQuery.matches) {
        var all_dropdowns = document.getElementsByClassName("navbar-item has-dropdown");
        for (let i = 0; i < all_dropdowns.length; i++) {
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

// Dropdown opening and closing logic.
// Add an event handler to all of the displayed page
document.addEventListener('click', function(e){
    // Track which DOM element was clicked
    var clicked_target = e.target;
    
    // LANDSCAPE
    // Getting viewport width cross-browser.
    if (Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) > 1024) {
        // If the clicked element is a menu item with dropdown...
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