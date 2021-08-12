// Get the button:
top_button = document.getElementById("top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 3000 || document.documentElement.scrollTop > 3000) {
        if (top_button != null)
            top_button.style.display = "block";
    } 
    else {
        if (top_button != null)
            top_button.style.display = "none";
  } 
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    window.scroll({
        left: 0,
        top: 0,
        behavior: 'smooth'
    })
} 