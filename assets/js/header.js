const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
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

document.addEventListener('click', function(e){

    var clicked_target = e.target;

    if (Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) > 1024) {
        // Aufteilung auf zwei Grundfälle: 
        // - Wenn das geklickte Element ein Dropdown ist 
        // und 
        // - wenn es kein Dropdown ist (woanders hingeklickt wurde)

        // Wenn das geklickte Element ein Menüitem mit Dropdown ist...
        if (clicked_target.parentElement.className === "navbar-item has-dropdown ") {
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
    else {
        console.log("too small");
        if (clicked_target.parentElement.className === "navbar-item has-dropdown ") {
            toggleMenu(clicked_target.nextElementSibling);
        }
    }
});