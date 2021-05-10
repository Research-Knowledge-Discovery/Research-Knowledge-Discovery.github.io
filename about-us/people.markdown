---
title: "People"
---
<!--# People
{: .title}-->

<div>
    <!-- Iterating over all people in the collection -->
    {% for person in site.people %}
        <!-- Utilizing Bulma's column system. This div is a container for two columns, which contain a person's profile 
        picture (first column) and their personal info (second column). These are automatically set side to side with Bulma's 
        internal CSS-Rules (and are changed on mobile). -->
        <div class="person columns is-mobile" style="">
        <!-- Replacing some (todo: replace more) characters that are not allowed in filenames. This is so no errors are thrown
        when a person's profile picture is included by using the person's name -->
        {% assign escaped_fn = person.firstname | replace: "ä", "ae" | replace: "ü", "ue" | replace: "ö", "oe" | replace: "ß", "ss" %}
        {% assign escaped_ln = person.lastname | replace: "ä", "ae" | replace: "ü", "ue" | replace: "ö", "oe" | replace: "ß", "ss" %}
            <!-- First column. Narrow columns only take up as much space as their content needs -->
            <div class="column image is-narrow">
                <!-- Inlcuding image by name -->
                <img class="image center-cropped profile overview round" src="../assets/images/people/{{ escaped_ln | downcase }}_{{ escaped_fn | downcase }}.jpg"/>
            </div>
            <!-- Second column -->
            <div class="column personinfo">
                <div class="name_desc">
                    <!--<h2 class="title is-5"><a href="{{ person.url }}">{{ person.firstname }} {{ person.lastname }}</a></h2>-->
                    <h2 class="title is-5">{{ person.firstname }} {{ person.lastname }}</h2>
                    <h3 class="subtitle">{{ person.role }}</h3>
                </div>
                <!-- Looking for the excerpt separator (see _config.yml) in this person's description. The description 
                needs to be assigned a excerpt separator if it is too long. By cutting the description off at the separator,
                only a certain amount of text will be shown in the people overview to prevent walls of text. -->
                {% assign excerpt = person.description | split: site.excerpt_separator %}
                <!-- If the separator has been found (size of result > 0), insert excerpt. Otherwise, insert person's description in full
                (if it exists) -->
                <p class="description overview to-hide">{% if excerpt.size > 0 %}{{ excerpt[0] }}{% elsif person.description != null %}{{ person.description }}{% else %}{% endif %}</p>
                <div class="personlink">
                <!-- Open external links in a new tab (target="_blank") and set fitting icon (todo: explain noopener noreferrer) -->
                    <a class="profile-link" href={% if person.links.ext-profile != null %}"{{ person.links.ext-profile }}" target="_blank" rel="noopener noreferrer"{% else %}"{{ person.url }}"{% endif %}>> Profile{% if person.links.ext-profile != null %} <i class="fas fa-external-link-alt"></i>{% endif %}</a> 
                    {% if person.links.th-koeln != null %}<a class="th-koeln-link" target="_blank" rel="noopener noreferrer" href="{{ person.links.th-koeln }}">> Employee Site TH <i class="fas fa-external-link-alt"></i></a>{% endif %}
                    {% if person.links.private-link != null %}<a class="private-link" target="_blank" rel="noopener noreferrer" href="{{ person.private-site }}">> Private Page <i class="fas fa-external-link-alt"></i></a>{% endif %}
                </div>
            </div>
        </div>
        <!-- Horizontal rule (separating line) -->
        <hr/>
    {% endfor %}
</div>