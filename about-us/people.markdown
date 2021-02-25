---
title: "People"
---
# People
{: .title}

<div>
    {% for person in site.people %}
        <div class="person" style="display: flex; flex-flow: row wrap;">
            <div style="flex-basis: 30%; display: flex; justify-content: center;">
                <img class="image profile round" src="../assets/images/testimage.png"/>
            </div>
            <div class="personalinfo" style="flex-basis: 50%">
                <div class="name_desc">
                    <h2 class="title is-5">{{ person.name }}</h2>
                    <h3 class="subtitle">{{ person.position }}</h3>
                    <!--Eventuell später Beschreibung--><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt</p>
                </div>
            </div>
            <div class="emptydiv" style="flex-basis: 30%"></div>
            <div>
                <div class="contact" style="flex-basis: 70%; display: flex">
                    <div style="display: flex; flex-direction: column">
                        <p>Contact:</p>
                        <ul>
                            <li>{{ person.contact.address }}</li>
                            <li>{{ person.contact.phone }}</li>
                            <li>{{ person.contact.fax }}</li>
                            <li>{{ person.contact.mail }}</li>
                        </ul>
                    </div>
                    <div style="display: flex; flex-direction: column">
                        <p>Social Media:</p> 
                        <ul>
                            <li>{{ person.social_media.linkedin }}</li>
                            <li>{{ person.social_media.twitter }}</li>
                            <li>{{ person.social_media.researchgate }}</li>
                        </ul>
                    </div>
                </div>
                <a href="{{ person.url }}">> See profile</a> 
            </div>
        </div>
    {% endfor %}
</div>