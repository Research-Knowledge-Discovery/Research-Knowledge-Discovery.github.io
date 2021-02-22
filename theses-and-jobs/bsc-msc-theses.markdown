---
---
<table class="table is-bordered is-striped">
    {% for thesis in site.bsc-msc-theses %} 
        <tr>
            <th>Title</th><th>Advisor(s)</th><th>Type</th>
        </tr>
        <tr>
            <td>{{ thesis.title }}</td>
            <td>{{ thesis.advisors[0] }}{% if thesis.advisors.size == 2 %}, {{ thesis.advisors[1] }}{% endif %}</td>
            <td>{{ thesis.type }}</td>
        </tr>
    {% endfor %}
</table>