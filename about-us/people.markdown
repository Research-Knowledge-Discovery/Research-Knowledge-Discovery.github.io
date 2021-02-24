---
title: "People"
---
# People
{: .title}
<div>
    {% for person in site.people %}
    <div class="person">
        <img class="image profile round" src="../assets/images/testimage.png"/>
        <div class="basicinfo">
            <div class="personalinfo">
                <div class="name_desc">
                    <h2 class="title is-5">{{ person.name }}</h2>
                    <h3 class="subtitle">{{ person.position }}</h3>
                    <!--Eventuell später Beschreibung--><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt</p>
                </div>
            </div>
            <div class="contact">
                <p>Contact:</p>
                <ul>
                    <li>{{ person.contact.address }}</li>
                    <li>{{ person.contact.phone }}</li>
                    <li>{{ person.contact.fax }}</li>
                    <li>{{ person.contact.mail }}</li>
                </ul>
                <p>Social Media:</p>   
                <ul>
                    <li>{{ person.social_media.linkedin }}</li>
                    <li>{{ person.social_media.twitter }}</li>
                    <li>{{ person.social_media.researchgate }}</li>
                </ul>
            </div>
            <a href="{{ person.url }}">> See profile</a> 
        </div>
    </div>
    {% endfor %}
</div>