---
---
# Projects
{: #first-heading .title}
<div>
    {% include filters.html %}
    <hr/>
    <div>
    {% for project in site.projects %}
    <div class="singleproject {% for category in project.research-areas %}{{ category.tag }} {% endfor %}">
        <div class="projectcontainer">
            <h2 class="title is-5"><a href="{{ project.url }}">{{ project.name }}</a></h2>
            {% for category in project.research-areas %}
                <button class="button {{ category.tag }}" onclick="setFilters('{{ category.tag }}')">{{ category.name }}</button>
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
<script src="{{ site.baseurl }}/assets/js/filter.js"></script>