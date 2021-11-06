---
title: "BSc-/MSc-Theses"
redirect_to: /
sitemap: false
---
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
<table class="table is-bordered is-striped">
    {% for thesis in site.bsc-msc-theses %} 
        <tr>
            <th>Title</th><th>Advisor(s)</th><th>Type</th>
        </tr>
        <tr>
            <td><a href="{{ thesis.url }}">{{ thesis.title }}</a></td>
            <!-- Iterating over advisors, adding commas after each advisor except the last -->
            <td>{% for advisor in thesis.advisors %}{{ advisor }}{% unless forloop.last %}, {% endunless %}{% endfor %}</td>
            <td>{{ thesis.type }}</td>
        </tr>
    {% endfor %}
</table>