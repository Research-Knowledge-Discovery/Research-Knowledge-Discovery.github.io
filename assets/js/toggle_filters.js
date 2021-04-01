var to_toggle = document.getElementsByClassName("toggle");

for (var z = 0; z < to_toggle.length; z++) {
    to_toggle[z].addEventListener('click', function (e) {
        // If the element's second class is 'main-toggle', it is the element that shows and hides all filters
        if (e.target.classList[1] == 'main-toggle') {
            // The toggle element's next sibling is the container holding all filters.
            // If it is visible, hide it and vice versa
            var filter_container = e.target.nextElementSibling;
            if (checkVisibility(filter_container) == 'none') {
                toggleVisibility(filter_container, 'flex')
                // When filter container content is shown, change the toggle element's text to "Hide filters"
                e.target.innerHTML = "- Hide filters -";
            }
            else {
                toggleVisibility(filter_container, 'none')
                e.target.innerHTML = "- Show filters -";
            }
        }
        // If the element's second class is not 'main-toggle', it is a toggle element that controls
        // the visibility of second level tags
        else {
            // Get the research area the toggle button corresponds to...
            var field = e.target.classList[1];
            console.log(field);
            // ... and use it to get the "dropdown" containing the filters themselves
            var second_filters = document.getElementsByClassName("second-level " + field);
            console.log(second_filters);
            // getElementsByClassName should only ever match a single dropdown. Check for length...
            if (second_filters.length == 1) {
                // ... and toggle visibility as usual
                if (checkVisibility(second_filters[0]) == 'none')
                    toggleVisibility(second_filters[0], 'flex');
                else
                    toggleVisibility(second_filters[0], 'none');
            }
            // If the array has more than one entry...
            else {
                // Error handling/notification
            }
        }
    }); 
}