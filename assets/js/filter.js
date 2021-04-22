---
layout: null
---

// Note:
// By defining a front matter to a .js file, liquid variables can be used in the same file,
// despite it being an outsourced oure JavaScript file and thus has no knowledge of liquid tags.
// The layout variable needs to be set to null. Since a front matter default for the
// layout variable is defined in _config.yml, leaving it empty here will cause the .js
// file to be rendered as a page with the default layout applied to it. This will break
// the javascript code as html elements will be injected into it.

// First: Prepare toggleable elements.

// Get all toggleable elements and add event handlers to them in a loop.
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
            //var field = e.target.classList[1];
            //console.log(field);
            // ... and use it to get the "dropdown" containing the filters themselves
            var second_filters = document.getElementsByClassName("second-level");
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

// Second: prepare project lists and checkboxes list to filter later

// Get all projects as DOM elements (initially, all projects are displayed) for later, 
// get all checkboxes to also handle later and prepare an empty array to save all projects
// in a specific format. 
// This utilizes the actual Jekyll collection the projects are saved in. By doing so, it is
// possible to extract metadata that is usually only available by using liquid variables,
// such as, in this case, areas and topics. This information would otherwise not be accessible
// when the liquid collection is rendered in projects.markdown.

var all_projects = document.getElementsByClassName("singleproject");
var checkboxes = document.getElementsByClassName("filter");
var liquid_projects = [];
// Iterate through all projects in liquid
// Some fields are added in case they are needed in the future
{% for project in site.projects %}
liquid_projects.push({
    "nr": "{{ project.nr }}",
    "name": "{{ project.title }}",
    "summary": "{{ project.description }}",
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
// This jsonlike output is injected directly into the JavaScript code. The output can be observed 
// by inspecting this file in the browser. It produces an array of objects.
console.log(liquid_projects);

var tmp_liquid_projects = liquid_projects;

// Adding event listeners to fiter checkboxes.
// Using the 'change' event in this handler allows for multiple types of user inputs
// to be used to check checkboxes, such as keyboard inputs

// --- Commented out after removal of connection between first and second level
// tags ---

/*for (var i = 0; i < checkboxes.length; i++) {
checkboxes[i].addEventListener('change', function (e) {
    // If the clicked box has been unchecked, disable any other checkboxes that utilize the same id
    // as a name property value. Matching elements are second-level filters. They should be
    // disabled if the corresponding first-level filter is unchecked.
    if (e.target.checked == false) {
        // If elements that meet this criterium exist
        if (document.getElementsByName(e.target.id)) {
            // Add them to the list of elements to disable...
            var to_disable = document.getElementsByName(e.target.id);
            for (var e = 0; e < to_disable.length; e++) {
                // ... and disable them in a loop
                to_disable[e].disabled = true;
            }
        }
    }
    // If the clicked box has been checked, enable possible second-level filters
    else {
        var to_enable = document.getElementsByName(e.target.id);
        for (var e = 0; e < to_enable.length; e++) {
            if (to_enable[e].disabled == true)
                to_enable[e].disabled = false;
        }
    }
});
}*/

// Third: Add filter logic

// The filtering process should start when the submit button is clicked. On click, the 
// project container div should fade out, filtering should commence and upon finishing,
// the project container should fade back in. If there are no results to be displayed,
// display a fitting message.

var submit_button = document.getElementById("submit_filters");
var projectdiv = all_projects[0].parentElement;
// The message (initally hidden and toggled according to results in the filtering process).
var noresults = document.getElementById("noresults");
submit_button.addEventListener('click', function () {
    // Apply fade out effect, filter and fade back in, after one another. By utilizing
    // a callback structure, the next function in line will only execute when the previous
    // function has been completed. This is necessary due to the async nature of animations.
    // 'fadeOut' and 'filterProjects' both take a callback function as second parameter 
    // which needs to be wrapped in an anonymous function since it itself contains a parameter 
    // ('fadeIn'). If it were not wrapped, the function would not be passed as a
    // parameter but rather executed immediately.

    // Hide possibly open second-level filters first
    var second_levels = document.getElementsByClassName("second-level");

    // To be removed in future update (as there now is only one second-level
    // dropdown. This still works, though.)
    for (var p = 0; p < second_levels.length; p++) {
        if (checkVisibility(second_levels[p]) != 'none')
            toggleVisibility(second_levels[p], 'none');
    }
    fadeOut(projectdiv, function () {
        filterProjects(function () {
            fadeIn(projectdiv);
        });
    });
});

// Main filter function
// General approach: Get all unchecked checkboxes and iterate over projects. For every
// project, check if it conains any of the tags that have been unchecked and thus, filtered out.
// If it does not, display the project, otherwise hide it.
// Save projects that have been filtered out in an array and compare this array against
// the one that contains all projects in order to find out which projects need to shown
// in case they have been hidden before.

function filterProjects(callback) {
    console.log("done fading out");
    
    var tmp_liquid_projects = liquid_projects;
    console.log("Handler. ");
    console.log(tmp_liquid_projects);
    // Create array to store unchecked checkboxes
    var unchecked_boxes = [];
    for (var j = 0; j < checkboxes.length; j++) {
        // Check for checkbox states and append unchecked checkboxes to array
        if (checkboxes[j].checked == false) {
            unchecked_boxes.push(checkboxes[j]);
            // If an element contains the checkbox' ID as the value of its name property,
            // it is a second-level filter belonging to the area in question and needs to
            // be disabled if the area's checkbox has been unchecked
            /*if (document.getElementsByName(checkboxes[j].id)) {
                var to_disable = document.getElementsByName(checkboxes[j].id);
                for (var e = 0; e < to_disable.length; e++) {
                    to_disable[e].disabled = true;
                }
            }*/
        }
        // If the checkbox in question is checked, enable the area's second-level filters
        /*else {
            var to_enable = document.getElementsByName(checkboxes[j].id);
            for (var e = 0; e < to_enable.length; e++) {
                if (to_enable[e].disabled == true)
                    to_enable[e].disabled = false;
            }
        }*/
    }
    console.log(unchecked_boxes);
    // If all boxes are checked, simply display all projects
    if (unchecked_boxes.length == 0) {
        for (var s = 0; s < all_projects.length; s++) {
            all_projects[s].style.display = 'grid';
        }
        // Hide "no results" message
        if (checkVisibility(noresults) != 'none')
            toggleVisibility(noresults, 'none');
    }
    // If there are unchecked boxes
    else {
        // Create an array to hold projects that have been filtered out
        var filtered_projects = [];
        // This boolean will track if any projects matched any unchecked box at all. This is
        // for future debug purposes only.
        var results_found = false;
        // Start a loop through all projects and their tags
        for (var x = 0; x < tmp_liquid_projects.length; x++) {
            console.log("Project Nr." + tmp_liquid_projects[x].nr + ":");
            // Iterate through all unchecked checkboxes...
            // ('checkboxes_check' is a label for the following for-loop. This enables breaking to this
            // specific loop later)
            checkboxes_check:
            for (var l = 0; l < unchecked_boxes.length; l++) {
                // ... and check if the current project contains any tag that is filtered out,
                // if it does, add it to the array
                // If the current unchecked box is a first-level filter and describes a research area
                if (unchecked_boxes[l].classList.contains('second') == false) {
                    // Check current project's areas...
                    for (var a = 0; a < tmp_liquid_projects[x].areas.length; a++) {
                        // If the current area's tag matches the unchecked box's ID...
                        if (tmp_liquid_projects[x].areas[a].tag == unchecked_boxes[l].id) {
                            // Save the current project to array
                            filtered_projects.push(tmp_liquid_projects[x]);
                            // Set boolean to true since a project has been filtered, 
                            // value will be assessed later
                            results_found = true;
                            // Don't continue looking at this project's next areas and instead
                            // break back to the checkbox loop to check the next checkbox against this project
                            break checkboxes_check;
                        }
                        // If the project in question does not contain any prohibited tag, do nothing.
                    }
                }
                // If the current checkbox is a second-level filter, go through the same process 
                // as above, but compare against the project's topics instead
                else {
                    // Iterate through this project's areas
                    // Deprecated
                    //for (var a = 0; a < tmp_liquid_projects[x].areas.length; a++) {
                        // Iterate through area's topics
                        for (var u = 0; u < tmp_liquid_projects[x].topics.length; u++) {
                            if (tmp_liquid_projects[x].topics[u].tag == unchecked_boxes[l].id) {
                                // Same procedure as with first-level tags
                                filtered_projects.push(tmp_liquid_projects[x]);
                                results_found = true;
                                break checkboxes_check;
                            }
                            // If it does not contain any prohibited tag, do nothing again
                        }
                    //}
                }
            }
        }
        // Check if a project that contained a filtered tag was found while iterating
        // Note: This should always be the case if filters are automatically generated from
        // tags that are actually used in projects. This check will remain here for now
        // since automatically generated filters are not implemented yet.
        if (results_found == true) {
            // Find projects to display ('leftovers', i.e. projects that have not been filtered out)
            // by comparing filtered projects agains the unfiltered list of projects
            var leftovers = tmp_liquid_projects.filter(function(element) {
                // The project is returned if it has not been found in the array of filtered projects
                return filtered_projects.indexOf(element) < 0;
            });
            // Iterate over all filtered projects and check every project's corresponding 
            // DOM element ('all_projects', by ID) against every filtered project. If IDs match,
            // the corresponding project needs to be hidden.
            for (var h = 0; h < filtered_projects.length; h++) {
                for (var g = 0; g < all_projects.length; g++) {
                    console.log("ID (all): " + all_projects[g].id + ", ID (display): " + filtered_projects[h].nr);
                    if (all_projects[g].id == filtered_projects[h].nr) {
                        toggleVisibility(all_projects[g], 'none');
                    }
                }
            }
            // If there are projects to display (not everything has been filtered out)...
            if (leftovers.length != 0) {
                // Hide the "no results" message, if it has been visible
                if (checkVisibility(noresults) != 'none')
                    toggleVisibility(noresults, 'none');
                // Compare leftover projects against DOM elements and, if IDs match, display project
                for (var t = 0; t < leftovers.length; t++) {
                    for (var b = 0; b < all_projects.length; b++) {
                        if (leftovers[t].nr == all_projects[b].id) {
                            toggleVisibility(all_projects[b], 'grid');
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
// The function handling the fade out. When the fade out animation has completed,
// the callback function that needs to be passed as a parameter, is executed.
function fadeOut(target, callback) {
        console.log("fading out");
        // Set opacity to 1 to represent the initial opacity of the target
        var new_opacity = 1;
        // Create a timer that executes the anonymous function every 50 milliseconds  
        var timer = setInterval(function() {
            // If the opacity is lower than 0.1 (since in this fade out, the fade out effect
            // is created by lowering opacity in steps of 0.1)...
            if (new_opacity < 0.1) {
                // ... stop the timer and execute the next function (will be filterProjects)
                clearInterval(timer);
                callback();
            }
            // If opacity is too high of a value, further lower the opacity 
            // and apply the new opacity value to the target's style
            new_opacity -=  0.1;
            target.style.opacity = new_opacity;
        }, 50);
}

// The function handling the fade in. This function does not take a callback function as
// parameter as it is the last function to execute in the callback chain.
// The process is the same as with the fade out function but the opacity is increased instead
// of decreased over time.
function fadeIn(target) {
        console.log("fading in");
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
// should be a string containing the display type ('grid', 'block', 'none', ...)
function toggleVisibility(target, type) {
    target.style.display = type;
}