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
            <p>{{ project.description }}</p>
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
    <p id="noresults">No results found.</p>
    </div>
</div>
<script src="{{ site.baseurl }}/assets/js/filter.js"></script>
<script>
    // Hide certain filters based on whether or not the corresponding tags have been used in the
    // elements on this page (in this case, projects)
    // Retrieve all project research areas and topics and store them in an array...
    // (In Liquid, they need to be appended to a string first and then split to form an array)
    {% assign used_tags = "" %}
    {% for project in site.projects %}
        {% for area in project.research-areas %}
            {% assign used_tags = used_tags | append: area.tag | append: ";"%}
            {% for topic in area.topics %}
                {% assign used_tags = used_tags | append: topic.tag | append: ";" %}
            {% endfor %}
        {% endfor %}
    {% endfor %}
    {% assign used_tags_arr = used_tags | split: ";" | uniq %}
    // Jsonify the result and save it in a JavaScript variable
    var used_tags_projects = {{ used_tags_arr | jsonify }};
    console.log(used_tags_projects);
    // Get all filter checkboxes. Since checkboxes are built from all available tags, their
    // IDs will represent a list of all possible tags.
    var all_boxes = document.getElementsByClassName("filter");
    // Prepare an array to store these tags
    var all_tags = [];
    // Iterate over boxes and store their IDs in the array
    for (var boxnr = 0; boxnr < all_boxes.length; boxnr++) {
        all_tags.push(all_boxes[boxnr].id);
    }
    // Filter all tags but those that have acutally been used in this page's elements (projects)
    var to_disable = all_tags.filter(function(element) {
        // Return elements that have not been found in the used tags array, which are those that were not used
        return used_tags_projects.indexOf(element) < 0;
    });
    // Iterate over checkboxes to disable and all boxes to match IDs
    for (var n = 0; n < to_disable.length; n++) {
        for (var m = 0; m < all_boxes.length; m++) {
            if (all_boxes[m].id == to_disable[n])
                // If IDs match, hide the box's parent element which in this HTML structure is
                // the div holding the checkbox and its label. If only the box itself were hidden,
                // the label would remain visible.
                all_boxes[m].parentElement.style.display = 'none';
        }
    }
</script>