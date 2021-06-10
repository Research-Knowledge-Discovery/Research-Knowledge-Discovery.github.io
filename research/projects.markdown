---
title: "Projects"
---
<!--# Projects
{: #first-heading .title}-->
<div>
    <h2 class="title is-5">Exclude projects</h2>
    {% include filters.html %}
    <div>
        <!-- Grouping projects by year -->
        {% assign grouped_projects = site.projects | group_by: 'duration.beginning.year' | sort: 'name' | reverse %}
        {% for p in grouped_projects %}
            <!-- Sorting projects by month (reverse) -->
            {% assign projects_sorted = p.items | sort: "duration.beginning.month" | reverse %}
            {% for project in projects_sorted %}
                <div id="{{ project.nr }}" class="singleproject spaced">
                <hr/>
                <div class="columns">
                <div class="column projectcontainer content-spaced">
                    {% if project.externallink != null %}
                        <h2 class="title is-5"><i class="fas fa-book-open"></i><a href="{{ project.externallink }}" target="_blank" rel="noopener noreferrer">{{ project.title }} <i class="fas fa-external-link-alt"></i></a></h2>
                    {% else %}
                        <h2 class="title is-5"><i class="fas fa-book-open"></i><a href="{{ project.url }}">{{ project.title }}</a></h2>
                    {% endif %}
                    <div class="tags">
                    {% for category in project.research-areas.areas %}
                        <span class="tag is-primary {{ category.tag }}">{{ category.name }}</span>
                    {% endfor %}<br/>
                    {% if project.research-areas.topics %}
                        {% for topic in project.research-areas.topics %}
                            <span class="tag is-primary is-light {{ topic.tag }}">{{ topic.name }}</span>
                        {% endfor %}
                    {% endif %}
                    </div>
                    <!-- Creating an excerpt by splitting at the excerpt separator (see _config.yml). If the split
                    returned more than one element (= the description contained the separator), insert the excerpt.
                    Project excerpts begin and end with the excerpt separator, so index 1 of the results contains the actual excerpt.
                    If no excerpt has been found, insert the default description (content) it it exists. -->
                    {%- assign excerpt = project.content | split: site.excerpt_separator -%}
                    <p>{%- if excerpt.size > 1 -%}{{ excerpt[1] | escape | replace: "&lt;p&gt;", "" }}{%- elsif project.content != null -%}{{ project.content }}{%- else -%}{%- endif -%}</p>
                </div>
                <div class="column is-narrow">
                    <img class="image main-logo" src="{{ project.main-logo }}"/>
                </div>
                </div>
                <div class="lists mobile">
                    <ul>
                        <li class="duration"><p class="fact-title">Duration:</p><p class="fact">{{ project.duration.beginning.year }}{% if project.duration.beginning.month != "" %}-{{ project.duration.beginning.month }}{% endif %} - {% if project.duration.end.year == "" %}today{% else %}{{ project.duration.end.year }}{% endif %}{% if project.duration.end.month != "" %}-{{ project.duration.end.month }}{% endif %}{% if project.abbr == "xr" %}, <span class="annotation">annual study</span>{% endif %}</p></li>
                        <!-- (Todo: When does whitespace from liquid tags actually need to be stripped? Be consistent across all files)
                        Since liquid tags print as a newline in the rendered HTML, the added whitespace is stripped here by including hyphens to liquid tags. 
                        Newlines between tags are added for better readability in the code, needed whitespace is encoded -->
                        <li class="funding"><p class="fact-title">Client/Sponsor:</p> 
                            <p class="fact"><a href="{{ project.funding[0].link }}">{{ project.funding[0].name }}</a></p>
                        </li>
                        {% if project.partners %}
                            <li class="partners"><p class="fact-title">Partners:&#32;</p>
                            <p class="fact">
                            {%- for partner in project.partners limit: 2 -%}
                                <a href="{{ partner.link }}">{{ partner.name }}</a><!-- Add a comma after the added name if this is not the last iteration of the for loop, i.e. the last person in this project's partner list -->{% unless forloop.last %}, {% endunless %}
                                {% if forloop.last and project.partners.size > 2 %} and {{ project.partners.size | minus: 2 }} more{%- endif -%}
                            {%- endfor -%}
                            </p>
                            </li>
                        {% endif %}
                        <li class="people-involved"><p class="fact-title">People involved:&#32;</p>
                        <p class="fact">
                            {%- for person in project.people -%}
                                <!-- If an external link is provided in the project data, add the name with an external link -->
                                {%- if person.externallink != null and person.externallink != "#" -%}
                                    <a href="{{ person.externallink }}" target="_blank" rel="noopener noreferrer">{{ person.name }} <i class="fas fa-external-link-alt"></i></a>
                                {%- else -%} <!-- If no external link is given, the person in question is either a staff member or no further personal data can be provided -->
                                    <!-- Check if person's name can be found in collection 'people' -->
                                    {%- assign found = false -%}
                                    {%- for member in site.people -%}
                                        <!-- If the names match, add a link to the member's personal data -->
                                        {%- if member.title == person.name -%}
                                            {%- if member.links.ext-profile -%}
                                                <a href="{{ member.links.ext-profile }}" target="_blank" rel="noopener noreferrer">{{ person.name }} <i class="fas fa-external-link-alt"></i></a>
                                            {%- else -%}
                                                <a href="{{ member.url }}">{{ person.name }}</a>
                                            {%- endif -%}
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
                            </p>
                        </li>
                    </ul>
                </div>
                {% if project.externallink != null %}
                    <p><a class="readmore" href="{{ project.externallink }}" target="_blank" rel="noopener noreferrer">> Read more <i class="fas fa-external-link-alt"></i></a></p>
                {% else %}
                    <p><a class="readmore" href="{{ project.url }}">> Read more</a></p>
                {% endif %}
                <!--<hr/>-->
            </div>
            {% endfor %}
        {% endfor %}
        <p id="noresults">No results found.</p>
    </div>
<button onclick="topFunction()" id="myBtn">Top</button> 
</div>
<script src="{{ site.baseurl }}/assets/js/filters_final.js"></script>
<script src="{{ site.baseurl }}/assets/js/to_top.js"></script>
<script>
    // Hide certain filters based on whether or not the corresponding tags have actually been used in the
    // elements on this page (in this case, projects) (tags could also have been used in news articles)
    // Retrieve all project research areas and topics and store them in an array...
    // (In Liquid, they need to be appended to a string first and then split to form an array)
    {% assign used_tags = "" %}
    {% for project in site.projects %}
        {% for area in project.research-areas.areas %}
            {% assign used_tags = used_tags | append: area.tag | append: ";"%}
        {% endfor %}
        {% for topic in project.research-areas.topics %}
            {% assign used_tags = used_tags | append: topic.tag | append: ";" %}
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