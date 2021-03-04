// Filter logic. If a project contains a tag and the corresponding checkbox is unchecked,
// don't display that project, otherwise display it
// Get all projects and checkboxes
var all_projects = document.getElementsByClassName("singleproject");
var checkboxes = document.getElementsByClassName("filter");
// Put an event handler on every checkbox so results can be reevaluated on every check
for (var i = 0; i < checkboxes.length; i++) {
    // Using the 'change' event in this handler allows for multiple types of user inputs
    // to check checkboxes, such as keyboard inputs
    checkboxes[i].addEventListener('change', function() {
        // Create array to store unchecked checkboxes
        var unchecked_boxes = [];
        for (var j = 0; j < checkboxes.length; j++) {
            // Check for checkbox states and append checkboxes to array
            if (checkboxes[j].checked == false) {
                unchecked_boxes.push(checkboxes[j]);
            }
        }
        // Iterate through all projects and their tags
        for (var x = 0; x < all_projects.length; x++) {
            // Set a boolean to determine whether or not the project contains a tag
            // that has been filtered out which means the project needs to be hidden
            // Initially set to false since projects are not filtered when the page is loaded
            var filtered = false;
            // Iterate through all unchecked checkboxes...
            for (var l = 0; l < unchecked_boxes.length; l++) {
                // ... and check if the current project contains any tag that is filtered out
                if (all_projects[x].classList.contains(unchecked_boxes[l].id)) {
                    // If so, set 'filtered' to true and don't continue searching as it could
                    // potentially corrupt results. For instance, if the next tag did not match
                    // an unchecked box, 'filtered' would be set back to false causing the
                    // project to display even though it should not
                    filtered = true;
                    break;
                }
                // If it does not contain any prohibited tag, set 'filtered' to false
                else {
                    filtered = false;
                }
            }
            // Check if a filtered tag was found
            if (filtered == true)
                // Hide the project
                all_projects[x].style.display = 'none';
            else
                // Display the project
                all_projects[x].style.display = 'block';
        }
    });
}