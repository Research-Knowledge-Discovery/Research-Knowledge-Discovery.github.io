---
title: "People"
---
<div>
    <!-- Iterating over all people in the collection -->
    {% for person in site.people %}
        <!-- Two columns on desktop and mobile -->
        <div class="person columns is-mobile">
            <!-- Building profile picture filename. Replacing some (possible todo: replace more) characters that are not allowed in filenames. This is so no errors are thrown
            when a person's profile picture is included by using the person's name -->
            {% assign escaped_fn = person.firstname | replace: "ä", "ae" | replace: "ü", "ue" | replace: "ö", "oe" | replace: "ß", "ss" %}
            {% assign escaped_ln = person.lastname | replace: "ä", "ae" | replace: "ü", "ue" | replace: "ö", "oe" | replace: "ß", "ss" %}
            <!-- 1st column: image. Narrow column only takes up as much space as its content needs -->
            <div class="column image is-narrow">
                {% if person.placeholder_img == true %}
                    <img class="image center-cropped profile overview round" src="../assets/images/people/placeholder.png"/>
                {% else %}
                    <!-- Inlcuding image by name -->
                    <img class="image center-cropped profile overview round" src="../assets/images/people/{{ escaped_ln | downcase }}_{{ escaped_fn | downcase }}.jpg"/>
                {% endif %}
            </div>
            <!-- 2nd column: basic personal info (name, description (not on mobile)), profile links -->
            <div class="column personinfo content-spaced">
                <div class="name_role">
                    <h2 class="title is-5">{{ person.firstname }} {{ person.lastname }}</h2>
                    <h3 class="subtitle">{{ person.role }}</h3>
                </div>
                <p class="description overview to-hide">{{ person.description }}</p>
                <!-- List links if any exist -->
                {% unless person.no_profile == true %}
                <div class="personlink">
                <!-- Open external links in a new tab by setting class 'external' (see assets/externalize.js) -->
                <!-- Repeating code for better readability -->
                    {% if person.links.ext-profile != null %}
                    <a class="profile-link external" href="{{ person.links.ext-profile }}">&#707; Profile</a> 
                    {% else %}
                    <a class="profile-link" href="{{ person.url }}">&#707; Profile</a>
                    {% endif %}
                    {% if person.links.th-koeln != null %}
                    <a class="th-koeln-link external" href="{{ person.links.th-koeln }}">&#707; Employee Site TH</a>
                    {% endif %}
                    {% if person.links.private-site != null %}
                    <a class="private-link external" href="{{ person.links.private-site }}">&#707; Private Page</a>
                    {% endif %}
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