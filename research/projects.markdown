---
---
<div>
    {% for project in site.projects %}
        <p>{{ project.name }} - {{ project.duration }}</p>
        {% for partner in project.partners %}
            <p>{{ partner }}</p>
        {% endfor %}
    {% endfor %}
</div>