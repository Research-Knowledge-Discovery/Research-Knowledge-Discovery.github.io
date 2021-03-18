---
---
# Projects
{: #first-heading .title}
<div>
    {% include filters.html %}
    <hr/>
    <div>
    {% for project in site.projects %}
    <div id="{{ project.nr }}" class="singleproject">
        <div class="projectcontainer">
            <h2 class="title is-5"><a href="{{ project.url }}">{{ project.name }}</a></h2>
            {% for category in project.research-areas %}
                <span class="tag is-primary {{ category.tag }}">{{ category.name }}</span>
            {% endfor %}<br/>
            {% for category in project.research-areas %}
                {% for topic in category.topics %}
                <span class="tag is-primary is-light {{ topic.tag }}">{{ topic.name }}</span>
                {% endfor %}
            {% endfor %}
            <p>{{ project.summary }}</p>
        </div>
        <img class="image" src="../assets/images/testimage.png"/>
        <div class="lists">
            <ul>
                <li>Duration: {{ project.duration.beginning }} - {{ project.duration.end }}</li>
                <!-- Since liquid tags print as a newline in the rendered HTML, the added whitespace is stripped here by including hyphens to liquid tags. Newlines between tags are added for better readability in the code, needed whitespace is encoded -->
                <li>Partners:&#32;
                    {%- for partner in project.partners -%}
                        <a href="{{ partner.link }}">{{ partner.name }}</a><!-- Add a comma after the added name if this is not the last iteration of the for loop, i.e. the last person in this project's partner list -->{% unless forloop.last %}, {% endunless %}
                    {%- endfor -%}</li>
                <li>People involved:&#32;
                    {%- for person in project.people -%}
                        <!-- If an external link is provided in the project data, add the name with an external link -->
                        {%- if person.externallink != null -%}
                            <a href="{{ person.externallink }}">{{ person.name }}</a>
                        {%- else -%} <!-- If no external link is given, the person in question is either a staff member or no further personal data can be provided -->
                            <!-- Check if person's name can be found in collection 'people' -->
                            {%- assign found = false -%}
                            {%- for member in site.people -%}
                                <!-- If the names match, add a link to the member's personal data -->
                                {%- if member.name == person.name -%}
                                    <a href="{{ member.url }}">{{ member.name }}</a>
                                    {%- assign found = true -%}
                                    <!-- Break to prevent further execution of the for loop if the according member has already been found -->
                                    {%- break -%}
                                {%- endif -%}
                            {%- endfor -%}
                            <!-- If the person's name did not match any of the staff members, simply add the name in plain text -->
                            {%- if found != true -%}
                                {{- person.name -}}
                            {%- endif -%}
                        {%- endif -%}
                        <!-- Add a comma after the added name if this is not the last iteration of the for loop, i.e. the last person in this project's person list -->
                        {%- unless forloop.last -%},&#32;{%- endunless -%}
                    {%- endfor -%}
                    </li>
                <li>Funded by: <a href="{{ project.funding.link }}">{{ project.funding.name }}</a></li>
            </ul>
        </div>
        <div class="emptydiv"></div>
    </div>
    {% endfor %}
    </div>
</div>
<!--<script src="{{ site.baseurl }}/assets/js/filter.js"></script>-->
<script>
    var to_toggle = document.getElementsByClassName("toggle");
        for (var z = 0; z < to_toggle.length; z++) {
        to_toggle[z].addEventListener('click', function (e) {
            var field = e.target.classList[1];
            console.log(field);
            var second_filters = document.getElementsByClassName("second-level " + field);
            console.log(second_filters);
            if (window.getComputedStyle(second_filters[0], null).display == 'none')
                second_filters[0].style.display = 'flex';
            else
                second_filters[0].style.display = 'none';
        }); 
    }
    var all_projects = document.getElementsByClassName("singleproject");
    var checkboxes = document.getElementsByClassName("filter");
    var liquid_projects = [];
    {% for project in site.projects %}
        liquid_projects.push({
            "nr": "{{ project.nr }}",
            "name": "{{ project.name }}",
            "summary": "{{ project.summary }}",
            "areas": [{%- for area in project.research-areas -%}{
                "name": "{{ area.name }}",
                "tag": "{{ area.tag }}"{% if area.topics != null %},
                "topics": [{% for topic in area.topics -%}{
                    "name": "{{ topic.name }}",
                    "tag": "{{ topic.tag }}"
                }{%- unless forloop.last -%},{%- endunless -%}{%- endfor -%}]{%- endif %}
            }{%- unless forloop.last -%},{%- endunless -%}
            {% endfor %}
        ]});
    {% endfor %}
    console.log(liquid_projects);
    var tmp_liquid_projects = liquid_projects;
    //for (var i = 0; i < checkboxes.length; i++) {
    // Using the 'change' event in this handler allows for multiple types of user inputs
    // to check checkboxes, such as keyboard inputs
    var submit_button = document.getElementById("submit_filters");
    submit_button.addEventListener('click', function () {
        var second_levels = document.getElementsByClassName("second-level");
        for (var p = 0; p < second_levels.length; p++) {
            if (window.getComputedStyle(second_levels[p], null).display != 'none')
                second_levels[p].style.display = 'none';
        }
        var tmp_liquid_projects = liquid_projects;
        console.log("Handler. ");
        console.log(tmp_liquid_projects);
        // Create array to store unchecked checkboxes
        var unchecked_boxes = [];
        for (var j = 0; j < checkboxes.length; j++) {
            // Check for checkbox states and append checkboxes to array
            if (checkboxes[j].checked == false) {
                unchecked_boxes.push(checkboxes[j]);
                if (document.getElementsByName(checkboxes[j].id)) {
                    var to_disable = document.getElementsByName(checkboxes[j].id);
                    for (var e = 0; e < to_disable.length; e++) {
                        to_disable[e].disabled = true;
                    }
                }
            }
            else {
                var to_enable = document.getElementsByName(checkboxes[j].id);
                    for (var e = 0; e < to_enable.length; e++) {
                        if (to_enable[e].disabled == true)
                            to_enable[e].disabled = false;
                    }
            }
        }
        console.log(unchecked_boxes);
        if (unchecked_boxes.length == 0)
            for (var s = 0; s < all_projects.length; s++) {
                all_projects[s].style.display = 'grid';
            }
        else {
        // Set a boolean to determine whether or not any project has been filtered
        // a a message can be displayed if no results have been found.
        // Initially set to false since projects are not filtered when the page is loaded
        var results_found = false;
        var to_display = [];
        // Iterate through all projects and their tags
        for (var x = 0; x < tmp_liquid_projects.length; x++) {
            console.log("Project Nr." + tmp_liquid_projects[x].nr + ":");
            // Iterate through all unchecked checkboxes...
            checkboxes_check:
            for (var l = 0; l < unchecked_boxes.length; l++) {
                // ... and check if the current project contains any tag that is filtered out
                var filtered = false;
                console.log(unchecked_boxes[l].id);
                if (unchecked_boxes[l].classList.contains('second') == false) {
                // Check areas...
                    for (var a = 0; a < tmp_liquid_projects[x].areas.length; a++) {
                        console.log("a: " + tmp_liquid_projects[x].areas[a].tag);
                        if (tmp_liquid_projects[x].areas[a].tag == unchecked_boxes[l].id) {
                            // If so, set 'filtered' to true and don't continue looking at the project's next areas
                            // to save time.
                            filtered = true;
                            results_found = true;
                            to_display.push(tmp_liquid_projects[x]);
                            //tmp_liquid_projects.splice(x, 1);
                            console.log("- Match -");
                            break checkboxes_check;
                        }
                        // If it does not contain any prohibited tag, add it to the array of projects
                        // to display. Filtered can keep its value
                        // because if it has been set to true once it does not need to be toggled.
                        else {
                        }
                    }
                }
                else {
                    console.log("second level filter!");
                    for (var a = 0; a < tmp_liquid_projects[x].areas.length; a++) {
                        console.log("a: " + tmp_liquid_projects[x].areas[a].tag);
                        for (var u = 0; u < tmp_liquid_projects[x].areas[a].topics.length; u++) {
                            console.log("length: " + tmp_liquid_projects[x].areas[a].topics.length);
                            console.log("topic: " + tmp_liquid_projects[x].areas[a].topics[u]);
                            console.log("id: " + unchecked_boxes[l].id);
                            if (tmp_liquid_projects[x].areas[a].topics[u].tag == unchecked_boxes[l].id) {
                                console.log("- Match -");
                                // If so, set 'filtered' to true and don't continue looking at the project's next areas
                                // to save time.
                                filtered = true;
                                results_found = true;
                                to_display.push(tmp_liquid_projects[x]);
                                //tmp_liquid_projects.splice(x, 1);
                                console.log("- Match -");
                                break checkboxes_check;
                            }
                            // If it does not contain any prohibited tag, add it to the array of projects
                            // to display. Filtered can keep its value
                            // because if it has been set to true once it does not need to be toggled.
                            else {
                            }
                        }
                    }
                }
                if (filtered == false) {
                    //to_display.push([tmp_liquid_projects[x].nr, "show"]);
                }
            }
        }
        // Check if a filtered tag was found on this project
        if (results_found == true) {
            console.log(to_display);
            // Display projects that match the IDs of the projects that need to be shown
            // after initially hiding all projects during the search
            // Hide the project
            // Display the project
            var leftovers = tmp_liquid_projects.filter(function(to_delete) {
                return to_display.indexOf(to_delete) < 0;
            });
            for (var h = 0; h < to_display.length; h++) {
                for (var g = 0; g < all_projects.length; g++) {
                    console.log("ID (all): " + all_projects[g].id + ", ID (display): " + to_display[h].nr);
                    if (all_projects[g].id == to_display[h].nr) {
                        all_projects[g].style.display = 'none';
                        //to_display.splice(h, 1);
                    }
                }
            }
            for (var t = 0; t < leftovers.length; t++) {
                for (var b = 0; b < all_projects.length; b++) {
                    if (leftovers[t].nr == all_projects[b].id) {
                        all_projects[b].style.display = 'grid';
                    }
                }
            }
        }
        else
            // Alert the user that no results have been found
            alert("Nothing found");
        }
    });
//}
</script>