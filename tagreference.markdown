---
title: "Tagreference"
sitemap: false
---
<!-- Listing all of the site's tags. IDs are automatically generated for all tag names but are still listed -->
<div>
    {% include full_tag_list.html %}
    <h2 class="title is-5">Area-Tags</h2>
    <table class="table is-bordered is-striped">
        <th>Full Name ("name")</th><th>Abbreviation ("tag")</th>
        {% for area in used_areas_arr %}
            {% assign parts = area | split: "---" %}
            <tr>
                <td>{{ parts[1] }}</td>
                <td>{{ parts[0] }}</td>
            </tr>
        {% endfor %}
    </table>
    <h2 class="title is-5">Topics</h2>
    <table class="table is-bordered is-striped">
        <th>Full Name ("name")</th><th>Abbreviation ("tag")</th>
        {% for topic in used_topics_arr %}
            {% assign parts = topic | split: "---" %}
            <tr>
                <td>{{ parts[1] }}</td>
                <td>{{ parts[0] }}</td>
            </tr>
        {% endfor %}
    </table>
</div>