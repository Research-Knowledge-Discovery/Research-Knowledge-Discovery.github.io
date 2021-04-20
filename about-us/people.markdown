---
title: "People"
---
# People
{: .title}

<div>
    {% for person in site.people %}
        <div class="person" style="">
         {% assign escaped_fn = person.firstname | replace: "ä", "ae" | replace: "ü", "ue" | replace: "ö", "oe" %}
        {% assign escaped_ln = person.lastname | replace: "ä", "ae" | replace: "ü", "ue" | replace: "ö", "oe" %}
            <img class="image center-cropped profile overview round" src="../assets/images/people/{{ escaped_ln | downcase }}_{{ escaped_fn | downcase }}.jpg"/>
                <div class="name_desc">
                    <h2 class="title is-5"><a href="{{ person.url }}">{{ person.firstname }} {{ person.lastname }}</a></h2>
                    <h3 class="subtitle">{{ person.role }}</h3>
                </div>
                <!-- Maybe add a description to every person -->
                {% assign excerpt = person.description | split: site.excerpt_separator %}
                <p class="description overview to-hide">{% if excerpt.size > 0 %}{{ excerpt[0] }}{% elsif person.description != null %}{{ person.description }}{% else %}{% endif %}</p>
            <div class="emptydiv" style=""></div>
                    <div class ="contact">
                        <p>Contact:</p>
                        <ul class="singlelist">
                            <li>{{ person.contact.address }}</li>
                            <li>{{ person.contact.phone }}</li>
                            <li>{{ person.contact.fax }}</li>
                            <li>{{ person.contact.mail }}</li>
                        </ul>
                    </div>
                    <div class="socialmedia">
                        <p>Social Media:</p> 
                        <ul class="singlelist">
                            <li>{{ person.social_media.linkedin }}</li>
                            <li>{{ person.social_media.twitter }}</li>
                            <li>{{ person.social_media.researchgate }}</li>
                        </ul>
                    </div>
                <a class="personlink" href="{{ person.url }}">> See profile</a> 
        </div>
    {% endfor %}
</div>