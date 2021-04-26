---
title: "Tagreference"
---
<div>
    {% if site.data.auto_tags %}
        <h2 class="title is-5">Area-Tags</h2>
        <table class="table is-bordered is-striped">
            <th>Abbreviation ("tag")</th><th>Full Name ("name")</th>
            {% for area in site.data.auto_tags.research-areas.areas %}
                <tr>
                    <td>{{ area.tag }}</td>
                    <td>{{ area.name }}</td>
                </tr>
            {% endfor %}
        </table>
        <h2 class="title is-5">Topics</h2>
        <table class="table is-bordered is-striped">
            {% for topic in site.data.auto_tags.research-areas.topics %}
                <tr>
                    <td>{{ topic.tag }}</td>
                    <td>{{ topic.name }}</td>
                </tr>
            {% endfor %}
        </table>
    {% endif %}
</div>