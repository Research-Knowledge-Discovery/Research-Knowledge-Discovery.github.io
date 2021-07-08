---
title: "People"
---
<div>
    <!-- Iterating over all people in the collection -->
    {% for person in site.people %}
        <!-- Two columns on desktop and mobile -->
        <div class="person columns is-mobile">
            <!-- Replacing some (possible todo: replace more) characters that are not allowed in filenames. This is so no errors are thrown
            when a person's profile picture is included by using the person's name -->
            {% assign escaped_fn = person.firstname | replace: "ä", "ae" | replace: "ü", "ue" | replace: "ö", "oe" | replace: "ß", "ss" %}
            {% assign escaped_ln = person.lastname | replace: "ä", "ae" | replace: "ü", "ue" | replace: "ö", "oe" | replace: "ß", "ss" %}
            <!-- 1st column: image. Narrow column only takes up as much space as its content needs -->
            <div class="column image is-narrow">
                {% if person.placeholder-image == true %}
                    <img class="image center-cropped profile overview round" src="../assets/images/people/placeholder.png"/>
                {% else %}
                    <!-- Inlcuding image by name -->
                    <img class="image center-cropped profile overview round" src="../assets/images/people/{{ escaped_ln | downcase }}_{{ escaped_fn | downcase }}.jpg"/>
                {% endif %}
            </div>
            <!-- 2nd column: basic personal info (name, description (not on mobile)), profile links -->
            <div class="column personinfo content-spaced">
                <div class="name_desc">
                    <!--<h2 class="title is-5"><a href="{{ person.url }}">{{ person.firstname }} {{ person.lastname }}</a></h2>-->
                    <h2 class="title is-5">{{ person.firstname }} {{ person.lastname }}</h2>
                    <h3 class="subtitle">{{ person.role }}</h3>
                </div>
                <!-- Looking for the excerpt separator (see _config.yml) in this person's description. The description 
                needs to be assigned a excerpt separator if it is too long. -->
                {% assign excerpt = person.content | split: site.excerpt_separator %}
                <!-- If the separator has been found (size of result > 1), insert excerpt. Otherwise, insert person's description in full length (if it exists). 
                Excerpts should begin and end with the excerpt separator, so index 1 of the results contains the actual excerpt.
                Descriptions come with <p></p> tags which need to be escaped to a string and removed before displaying -->
                <p class="description overview to-hide">{% if excerpt.size > 1 %}{{ excerpt[1] | escape | replace: "&lt;p&gt;", "" | replace: "&lt;/p&gt;", "" }}{% elsif person.content != null %}{{ person.content | escape | replace: "&lt;p&gt;", "" | replace: "&lt;/p&gt;", "" }}{% endif %}</p>
                <!-- List links if any exist -->
                {% unless person.links == null %}
                <div class="personlink">
                <!-- Open external links in a new tab (target="_blank") and set fitting icon -->
                    <a class="profile-link" href={% if person.links.ext-profile != null %}"{{ person.links.ext-profile }}" target="_blank" rel="noopener noreferrer"{% else %}"{{ person.url }}"{% endif %}>> Profile{% if person.links.ext-profile != null %} <i class="fas fa-external-link-alt"></i>{% endif %}</a> 
                    {% if person.links.th-koeln != null %}<a class="th-koeln-link" target="_blank" rel="noopener noreferrer" href="{{ person.links.th-koeln }}">> Employee Site TH <i class="fas fa-external-link-alt"></i></a>{% endif %}
                    {% if person.links.private-site != null %}<a class="private-link" target="_blank" rel="noopener noreferrer" href="{{ person.links.private-site }}">> Private Page <i class="fas fa-external-link-alt"></i></a>{% endif %}
                </div>
                {% endunless %}
            </div>
        </div>
        <!-- Horizontal rule (separating line) if this is not the last entry in the people collection -->
        {% unless forloop.last %}
            <hr/>
        {% endunless %}
    {% endfor %}
</div>