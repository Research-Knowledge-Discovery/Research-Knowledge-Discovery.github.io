---
layout: childpage
---
<div>
    {% for person in site.people %}
        <p>{{ person.name }} - {{ person.position }}</p>
        <p>Contact:</p>
        <p>{{ person.contact.address }}, {{ person.contact.phone }}, {{ person.contact.fax }}, {{ person.contact.mail }}</p>
        <p>Social Media:</p>   
        <p>{{ person.social_media.linkedin }}, {{ person.social_media.twitter }}, {{ person.social_media.researchgate }}</p>   
    {% endfor %}
</div>