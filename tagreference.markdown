---
title: "Tagreference"
---
<!-- Listing all of the site's tags. IDs are automatically generated for all tag names but are still listed -->
<div>
    {% if site.data.auto_tags %}
        <h2 class="title is-5">Area-Tags</h2>
        <table class="table is-bordered is-striped">
            <th>Full Name ("name")</th><th>Abbreviation ("tag")</th>
            {% for area in site.data.auto_tags.research-areas.areas %}
                <tr>
                    <td>{{ area.name }}</td>
                    <td>{{ area.tag }}</td>
                </tr>
            {% endfor %}
        </table>
        <h2 class="title is-5">Topics</h2>
        <table class="table is-bordered is-striped">
            <th>Full Name ("name")</th><th>Abbreviation ("tag")</th>
            {% for topic in site.data.auto_tags.research-areas.topics %}
                <tr>
                    <td>{{ topic.name }}</td>
                    <td>{{ topic.tag }}</td>
                </tr>
            {% endfor %}
        </table>
    {% endif %}
</div>