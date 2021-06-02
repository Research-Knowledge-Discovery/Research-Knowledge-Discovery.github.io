---
layout: null
---

// Global variables: Basic UI related functionalities (closing/opening menus, scroll position, ...)
var scroll_pos;
var filter_container = document.getElementsByClassName("filter-container")[0];
var main_toggle = document.getElementsByClassName("main-toggle")[0];
var toggle_second_filters = document.getElementsByClassName("toggle second")[0];
var toggle_second_btnicon = toggle_second_filters.children[0]; // Relevant for changing arrow direction on open and close
var second_filters_dropdown = document.getElementsByClassName("second-level")[0];
var close_filters = document.getElementById("close");

// Respective event listeners
// Main toggle (mobile only, hides/shows filters) event listener (closing/opening)
main_toggle.addEventListener('click', function (e){
    if (checkVisibility(filter_container) == 'none') { // If container holding filters is visible, hide it and vice versa
        toggleVisibility(filter_container, 'block');
        // When filter container content is shown, change the toggle element's text to "Hide filters"
        e.target.innerHTML = "- Hide filters -";
    }
    else {
        toggleVisibility(filter_container, 'none');
        e.target.innerHTML = "- Show filters -";
    }
});

// Second filter toggle button (closing/opening, remembering
// scrolling position, changing arrow icon direction)
toggle_second_filters.addEventListener('click', function (e){
    scroll_pos = window.scrollY;
    // Toggle visibility as usual
    if (checkVisibility(second_filters_dropdown) == 'none') {
        toggleVisibility(second_filters_dropdown, 'flex');
        toggle_second_btnicon.classList.toggle('down');
        toggle_second_btnicon.classList.toggle('up');
    }
    else {
        toggleVisibility(second_filters_dropdown, 'none');
        toggle_second_btnicon.classList.toggle('up');
        toggle_second_btnicon.classList.toggle('down');
    }
});

// Dropdown closing button (in second filters) event listener (closing/opening, scrolling to
// remembered scrolling position, changing arrow icon direction)
close_filters.addEventListener("click", function (e) {
    toggleVisibility(second_filters_dropdown, 'none');
    toggle_second_btnicon.classList.toggle('up');
    toggle_second_btnicon.classList.toggle('down');
    window.scroll({
        left: 0,
        top: scroll_pos,
        behavior: 'smooth' 
    });
});

// Amongst other things, prevents the filters from being invisible if screen 
// is resized from mobile to desktop. For more information, see documentation
function resetVisibility_desktop(mediaQuery) {
    // If page is resized past breakpoint to large screen size:
    if (mediaQuery.matches) {
        // Display filters
        if (checkVisibility(filter_container) == 'none')
            toggleVisibility(filter_container, 'block');
    }
}

function resetVisibility_mobile(mediaQuery) {
    // If page is resized past breakpoint to small screen size:
    if (mediaQuery.matches) {
        // If the main toggle dropdown is currently open, close it
        if (checkVisibility(filter_container) == 'block')
            toggleVisibility(filter_container, 'none')
            main_toggle.innerHTML = "- Show filters -";
    }
}
var mediaQuery_desktop = window.matchMedia("(min-width: 1024px)"); // Media query: 1024px and up
var mediaQuery_mobile = window.matchMedia("(max-width: 1024px)"); // Media query: Up to 1024 px
// Listen for media query matches and assign functions
mediaQuery_mobile.addListener(resetVisibility_mobile);
mediaQuery_desktop.addListener(resetVisibility_desktop);

// Global variables related to filtering process
// Projects
var projects_html = document.getElementsByClassName("singleproject");
var liquid_projects = []; // Array to be filled with actual project objects with metadata (retrieved by using liquid)

// Tag filter related global variables
var checkboxes = document.querySelectorAll("input.filter"); // All checkboxes (DS, IR, NLP). Unchecked boxes are determined later
var second_buttons = document.querySelectorAll("button.filter.second"); // Actual second filter buttons (DOM elements)
var secondtags = []; // Second tags selected (dynamic)
var projectdiv = projects_html[0].parentElement;
var active_topics = document.getElementById("active-topics");

// Buttons
var submit_button = document.getElementById("submit_filters");
var reset_button = document.getElementById("reset_filters");

// The message (initally hidden and toggled according to results in the filtering process)
var noresults = document.getElementById("noresults");

// Filling project array
{% for project in site.projects %}
liquid_projects.push({
    "nr": "{{ project.nr }}",
    "name": "{{ project.title }}",
    "areas": [{%- for area in project.research-areas.areas -%}{
        "name": "{{ area.name }}",
        "tag": "{{ area.tag }}"
    }{%- unless forloop.last -%},{%- endunless -%}{%- endfor -%}]
    {% if project.research-areas.topics != null %},
    "topics": [{% for topic in project.research-areas.topics -%}{
        "name": "{{ topic.name }}",
        "tag": "{{ topic.tag }}"
    }{%- unless forloop.last -%},{%- endunless -%}{%- endfor -%}]{%- endif %}
});
{% endfor %}

// Preparing event handlers
// Second tags buttons
for (let i = 0; i < second_buttons.length; i++) {
    second_buttons[i].addEventListener('click', function (e) {
        if (secondtags.includes(e.target)) {
            var index = secondtags.indexOf(e.target);
            secondtags.splice(index, 1);
        }
        else
            secondtags.push(e.target);
        console.log(secondtags);
    });
}

// Reset button
reset_button.addEventListener('click', function (e) {
    for (var i = 0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked == false)
            checkboxes[i].checked = true;
    }
    for (var j = 0; j < second_buttons.length; j++) {
        if (second_buttons[j].classList.contains("activated"))
            toggleActivation(second_buttons[j]);
    }
    secondtags = [];
    addTagRemovalButtons();
    
    // Hide possibly open second level menu
    if (checkVisibility(second_filters_dropdown) != 'none')
        toggleVisibility(second_filters_dropdown, 'none');

    // Filter function chain (fade out, filter, fade in)
    fadeOut(projectdiv, function () {
        filterProjects(function () {
            fadeIn(projectdiv);
        });
    });
});

// Submit button
submit_button.addEventListener('click', function () {
    // Close possibly open second filters dropdown
    if (checkVisibility(second_filters_dropdown) != 'none') {
        toggleVisibility(second_filters_dropdown, 'none');
        toggle_second_btnicon.classList.toggle('up');
        toggle_second_btnicon.classList.toggle('down');
    }

    window.scroll({
        left: 0,
        top: scroll_pos,
        behavior: 'smooth' 
    });
    // Creates buttons to easily deactivate selected second level tags
    addTagRemovalButtons();

    // Apply fade out effect, filter and fade back in. By utilizing
    // a callback structure, the next function in line will only execute when the previous
    // function has been completed. This is necessary due to the async nature of animations.
    fadeOut(projectdiv, function () {
        filterProjects(function () {
            fadeIn(projectdiv);
        });
    });
});

// Main filtering function

function filterProjects(callback) {
    console.log("Second Tags: ");
    console.log(secondtags);
    
    // Create array to store unchecked checkboxes
    var unchecked_boxes = [];

    for (var j = 0; j < checkboxes.length; j++) {
        // Check for checkbox states and append unchecked checkboxes to array
        if (checkboxes[j].checked == false) {
            unchecked_boxes.push(checkboxes[j]);
        }
    }
    console.log(unchecked_boxes);

    // - Main cases -

    // 1. If all boxes are checked and no 2nd lvl tags are active, simply display all projects
    if (unchecked_boxes.length == 0 && secondtags.length == 0) {
        for (var s = 0; s < projects_html.length; s++) {
            projects_html[s].style.display = 'grid';
        }
        if (checkVisibility(noresults) != 'none') // Hide "no results" message if visible
            toggleVisibility(noresults, 'none');
        if (checkVisibility(reset_button) != 'none') // Hide "reset filters" button if is visible
            toggleVisibility(reset_button, 'none');
    }
    // 2. If there are unchecked boxes or selected second level tags, filter
    else {
        if (checkVisibility(reset_button) != 'block') // Show "reset filters" button
            toggleVisibility(reset_button, 'block');
       
        var excluded_projects = [];  // Create an array to hold projects that have been excluded by checkboxes
        var included_projects = [];  // Create an array to hold projects that are included by 2nd level tags
        // This boolean will track if any projects matched any unchecked box at all. This is
        // for future debug purposes only.
        var results_found = false;

        // Start a loop through all projects and their tags

        for (var x = 0; x < liquid_projects.length; x++) {
            // - First level tags -
            // Iterate through all unchecked checkboxes and check if they match any of current project's tags.
            // If it does, add to excluded projects
            if (unchecked_boxes.length != 0) {
                checkboxes_check: // ('checkboxes_check' is a label for the following for-loop. This enables breaking to this specific loop later)
                for (var l = 0; l < unchecked_boxes.length; l++) {
                    // Iterate through project's areas (is an array)
                    for (var a = 0; a < liquid_projects[x].areas.length; a++) {
                        // If the current area's tag matches the unchecked box's ID...
                        if (liquid_projects[x].areas[a].tag == unchecked_boxes[l].id) {
                            // Save the current project to array
                            excluded_projects.push(liquid_projects[x]);
                            console.log(excluded_projects);
                            results_found = true; // Debug
                            // Don't continue looking at this project's next areas and instead
                            // break back to the checkbox loop to check the next checkbox against this project
                            break checkboxes_check;
                        }
                        // If the project in question does not contain any prohibited tag, do nothing.
                    }
                }
            }
            // - Second level tags -
            // Same procedure as above, except projects that match the current tag are inlcuded instead of excluded
            if (secondtags.length != 0) {
                secondtags_check:
                for (var l = 0; l < secondtags.length; l++) {
                    for (var u = 0; u < liquid_projects[x].topics.length; u++) {
                        if (liquid_projects[x].topics[u].tag == secondtags[l].id) {
                            if (!included_projects.includes(liquid_projects[x])) // If this project isn't already in the included projects array, add it
                                included_projects.push(liquid_projects[x]);
                                results_found = true;
                            break secondtags_check;
                        }
                        else {
                            
                        }
                    }
                }
            }
        }
        console.log("included_projects: ");
        console.log(included_projects);
        // Check if a project that contained a filtered tag was found while iterating
        // Note: This should always be the case if filters are automatically generated from
        // tags that are actually used in projects. This check will remain here for now.
        if (results_found == true) {
            var leftovers = [];
            // Find projects to display ('leftovers', i.e. projects that have not been filtered out)

            // Unselected first level tags (exclude), if exist
            if (excluded_projects.length != 0) {
                // "filter" function keeps all elements of an array if they fulfill the condition set (return)
                leftovers = liquid_projects.filter(function(element) {
                    // The project is kept if it has not been found in the array of filtered projects
                    return excluded_projects.indexOf(element) < 0;
                });
            }
            // Selected second level tags (include), if exist
            if (included_projects.length > 0) {
                // If leftovers has already been filled by first level tag filter, filter them by included projects
                if (leftovers.length > 0) { 
                    leftovers = included_projects.filter(function(element) {
                        // The project is kept if it has been found in the array of included projects
                        return leftovers.indexOf(element) >= 0;
                    });
                }
                // If leftovers was empty (= only 2nd lvl tags were selected), simply save included projects 
                // to previously leftovers array
                else
                    leftovers = included_projects;
            }
            console.log("final leftovers");
            console.log(leftovers);

            // - Manage display of projects -

            // Hide all projects 
            for (var b = 0; b < projects_html.length; b++) {
                toggleVisibility(projects_html[b], 'none');
            }

            // Projects to display (if exist)
            if (leftovers.length != 0) {
                // Hide the "no results" message, if it has been visible
                if (checkVisibility(noresults) != 'none')
                    toggleVisibility(noresults, 'none');
                // Compare leftover projects against DOM elements and, if IDs match, display project
                for (var t = 0; t < leftovers.length; t++) {
                    for (var b = 0; b < projects_html.length; b++) {
                        if (leftovers[t].nr == projects_html[b].id) {
                            toggleVisibility(projects_html[b], 'grid');
                        }
                    }
                }
            }
            // If nothing is left to display, display the "no results" message
            else {
                if (checkVisibility(noresults) == 'none')
                    toggleVisibility(noresults, 'block');
            }
        }
        else {
            // If results_found is false, something went wrong. This will likely become
            // relevant with a future update.
            console.log("Nothing found");
        }
    }
    // Execute callback function.
    callback();
}

// Toggle 2nd lvl button activation
function toggleActivation(target) {
    target.classList.toggle('activated');
}

// Create buttons for displaying currently active filters, clicking them deactivates that filter
// immediately (without needing to click the "Apply filters" button)
function addTagRemovalButtons() {
    // Get all activated buttons
    var activated = document.getElementsByClassName("activated");
    // If there already are filter removal buttons being shown right now, remove them from UI
    // so buttons won't be added multiple times in the appending process later
    if (active_topics.children.length != 0) {
        for (var j = active_topics.children.length - 1; j >= 0; j--) { // For loop counts down to remove elements starting from the last
            active_topics.children[j].remove();
        }
    }
    // If there are activated buttons, create filter removal buttons and respective event handlers
    if (activated.length != 0) {
        for (var i = 0; i < activated.length; i++) {
            var to_append = document.createElement("a"); // The new button
            to_append.id = activated[i].id; // Assigning the tag as ID for easy identification and comparison
            to_append.classList.add('removal-button');
            to_append.innerHTML = "x " + activated[i].innerHTML; // Button text
            to_append.addEventListener('click', function (e) {
                // On click, remove the tag from the list of active filters, remove tag removal button and toggle activated class on tag in dropdown
                for (var x = 0; x < secondtags.length; x++) {
                    if (e.target.id == secondtags[x].id) {
                        secondtags.splice(x, 1); // Remove tag from filter tag list
                        // Iterate through all buttons, find button to remove activated class on
                        for (var z = 0; z < second_buttons.length; z++) {
                            if (second_buttons[z].id == e.target.id) {
                                toggleActivation(second_buttons[z]);
                            }
                        }
                    }
                }
                // Remove from shown tag removal buttons
                active_topics.removeChild(e.target);
                // Start new filtering process without the tag that just got removed
                fadeOut(projectdiv, function () {
                    filterProjects(function () {
                        fadeIn(projectdiv);
                    });
                });
            });
            // Add the current tag removal button to the UI
            active_topics.appendChild(to_append);
        }
    }
}

// The function handling the fade out. When the fade out animation has completed,
// the callback function that needs to be passed as a parameter, is executed.
function fadeOut(target, callback) {
    var new_opacity = 1; // Set opacity to 1 to represent the initial opacity of the target
    var timer = setInterval(function() { // Create a timer that executes the anonymous function every 50 milliseconds  
        // If opacity is lower than 0.1 (in this fade out, the fade out effect
        // is created by lowering opacity in steps of 0.1), stop the timer and go on to next function
        if (new_opacity < 0.1) {
            clearInterval(timer);
            callback();
        }
        // Lower opacity by 0.1 and apply
        new_opacity -=  0.1;
        target.style.opacity = new_opacity;
    }, 50);
}

// The function handling the fade in. Last function in chain, so no callback.
// The process is the same as with the fade out function but the opacity is increased instead
// of decreased over time and speed is different.
function fadeIn(target) {
    var new_opacity = 0.1;
    var timer = setInterval(function () {
        if (new_opacity >= 1) {
            clearInterval(timer);
        }
        target.style.opacity = new_opacity;
        new_opacity += 0.1;
    }, 10);
}

// Define function to check different elements' current visibility status since the original
// way of checking is quite a long line of code and is repeated often.
function checkVisibility(target) {
return window.getComputedStyle(target, null).display;
}

// Define function to toggle different elements' visibility. Second parameter given
// must be a string containing the display type ('grid', 'block', 'none', ...)
function toggleVisibility(target, type) {
    target.style.display = type;
}