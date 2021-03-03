const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
console.log("Viewport-Width: " + vw);
console.log("Viewport-Height: " + vh);
var menuitems = document.getElementsByClassName('navbar-item has-dropdown');

function toggleMenu(menu) {
    if (window.getComputedStyle(menu, null).display == 'none')
        menu.style.display = 'block';
    else
        menu.style.display = 'none';
}

// Zum togglen wird das gerade geöffnete Menü zwischengespeichert,
// damit hergeleitet werden kann, welches Menü geschlossen werden soll,
// wenn woanders hingeklickt wird
var open_menu;

function changeSize(mediaQuery) {
    if (mediaQuery.matches) {
        // Evtl. TODO: Menü auf Mobile nach resize schließen (wie?)
        var all_dropdowns = document.getElementsByClassName("has-dropdown");
        for (let i = 0; i < all_dropdowns.length; i++) {
            console.log(all_dropdowns[i].children[1]);
            if (window.getComputedStyle(all_dropdowns[i].children[1], null).display == 'block') {
                all_dropdowns[i].children[1].style.display = 'none';
            }
        }
        open_menu = null;
    }
  }

var mediaQuery_mobile = window.matchMedia("(max-width: 1024px)");
var mediaQuery_desktop = window.matchMedia("(min-width: 1024px)");
mediaQuery_mobile.addListener(changeSize);
mediaQuery_desktop.addListener(changeSize);

/*window.addEventListener('resize', function(event){
    console.log("resized");
    if (Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) > 1024) {
        var all_dropdowns = document.getElementsByClassName("has-dropdown");
        for (let i = 0; i < all_dropdowns.length; i++) {
            console.log(all_dropdowns[i].children[1]);
            if (window.getComputedStyle(all_dropdowns[i].children[1], null).display == 'block') {
                all_dropdowns[i].children[1].style.display = 'none';
            }
        }
        open_menu = null;
    }
});*/

document.addEventListener('click', function(e){

    var clicked_target = e.target;
    console.log(clicked_target);

    if (clicked_target != null) {
        // LANDSCAPE
        if (Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) > 1024) {
            // Aufteilung auf zwei Grundfälle: 
            // - Wenn das geklickte Element ein Dropdown ist 
            // und 
            // - wenn es kein Dropdown ist (woanders hingeklickt wurde)
            
            // Wenn das geklickte Element ein Menüitem mit Dropdown ist...
            // Anmerkung: parentElement kann null sein, wenn irgendwie <html> geklickt wird.
            if (clicked_target.parentElement != null && clicked_target.parentElement.className === "navbar-item has-dropdown ") {
                // Wenn bereits ein Dropdown-Menü offen war...
                if (open_menu != null) {
                    // Das geklickte Item ist das gleiche Item
                    if (open_menu.innerText === clicked_target.innerText) {
                        // Schließe das Menü und leere die Variable
                        toggleMenu(clicked_target.nextElementSibling);
                        open_menu = null;
                    }
                    // Es ist nicht das gleiche Item
                    else {
                        // Schließe das offene Menü und öffne das geklickte
                        // Speichere, welches Menü jetzt offen ist
                        toggleMenu(open_menu.nextElementSibling);
                        toggleMenu(clicked_target.nextElementSibling);
                        open_menu = clicked_target;
                    }
                }
                // Wenn aber kein Dropdown-Menü geöffnet ist und das geklickte Element
                // ein Dropdown hat...
                else {
                    // Öffne das geklickte Dropdown-Menü
                    // Speichere, welches Menü jetzt offen ist
                    toggleMenu(clicked_target.nextElementSibling);
                    open_menu = clicked_target;
                }
            }
            // Wenn das geklickte Element kein Dropdown hat, also entweder ein
            // anderer Menüpunkt mit direktem Link oder einfach eine andere Stelle
            // im Dokument ist...
            else {
                // Wenn bereits ein Dropdown-Menü offen war...
                if (open_menu != null) {
                    // Schließe das Menü und leere die Variable
                    toggleMenu(open_menu.nextElementSibling);
                    open_menu = null;
                }
                else {
                    console.log("other");
                }
            }
        }
        // MOBILE
        else {
            console.log("too small");
            if (clicked_target.parentElement.className === "navbar-item has-dropdown ") {
                toggleMenu(clicked_target.nextElementSibling);
            }
        }
    }
});