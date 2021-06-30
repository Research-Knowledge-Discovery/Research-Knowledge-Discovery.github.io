var to_externalize = document.getElementsByClassName('external');
console.log(to_externalize);
for (var i = 0; i < to_externalize.length; i++) {
    to_externalize[i].innerHTML = to_externalize[i].innerHTML + '&nbsp;<i class="fas fa-external-link-alt"></i>';
    to_externalize[i].setAttribute("rel", "noopener noreferrer");
    to_externalize[i].setAttribute("target", "_blank");
}