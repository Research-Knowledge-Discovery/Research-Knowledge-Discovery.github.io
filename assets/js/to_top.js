//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 3000 || document.documentElement.scrollTop > 3000) {
        if (mybutton != null)
            mybutton.style.display = "block";
    } 
    else {
        if (mybutton != null)
            mybutton.style.display = "none";
  } 
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    //document.body.scrollTop = 0; // For Safari
    //document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    window.scroll({
        left: 0,
        top: 0,
        behavior: 'smooth'
    })
} 