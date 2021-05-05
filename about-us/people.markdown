---
title: "People"
---
# People
{: .title}

<div>
    {% for person in site.people %}
        <div class="person columns" style="">
        {% assign escaped_fn = person.firstname | replace: "ä", "ae" | replace: "ü", "ue" | replace: "ö", "oe" %}
        {% assign escaped_ln = person.lastname | replace: "ä", "ae" | replace: "ü", "ue" | replace: "ö", "oe" %}
            <div class="column is-narrow">
                <img class="image center-cropped profile overview round" src="../assets/images/people/{{ escaped_ln | downcase }}_{{ escaped_fn | downcase }}.jpg"/>
            </div>
            <div class="column">
                <div class="name_desc">
                    <h2 class="title is-5"><a href="{{ person.url }}">{{ person.firstname }} {{ person.lastname }}</a></h2>
                    <h3 class="subtitle">{{ person.role }}</h3>
                </div>
                {% assign excerpt = person.description | split: site.excerpt_separator %}
                <p class="description overview to-hide">{% if excerpt.size > 0 %}{{ excerpt[0] }}{% elsif person.description != null %}{{ person.description }}{% else %}{% endif %}</p>
                <div class="personlink">
                    <a class="profile-link" href={% if person.links.ext-profile != null %}"{{ person.links.ext-profile }}" target="_blank" rel="noopener noreferrer"{% else %}"{{ person.url }}"{% endif %}>> Profile{% if person.links.ext-profile != null %} <i class="fas fa-external-link-alt"></i>{% endif %}</a> 
                    {% if person.links.private-link != null %}<a class="private-link" target="_blank" rel="noopener noreferrer" href="{{ person.private-link }}">> Private Page <i class="fas fa-external-link-alt"></i></a>{% endif %}
                    {% if person.links.th-koeln != null %}<a class="th-koeln-link" target="_blank" rel="noopener noreferrer" href="{{ person.links.th-koeln }}">> Employee Site TH <i class="fas fa-external-link-alt"></i></a>{% endif %}
                </div>
            </div>
        </div>
        <hr/>
    {% endfor %}
</div>