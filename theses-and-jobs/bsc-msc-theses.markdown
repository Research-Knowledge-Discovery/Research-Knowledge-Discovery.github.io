---
title: BSc-/MSc-Theses
---
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
{: .content}
<table class="table is-bordered is-striped">
    {% for thesis in site.bsc-msc-theses %} 
        <tr>
            <th>Title</th><th>Advisor(s)</th><th>Type</th>
        </tr>
        <tr>
            <td><a href="{{ thesis.url }}">{{ thesis.title }}</a></td>
            <td>{% for advisor in thesis.advisors %}{{ advisor }}{% unless forloop.last %}, {% endunless %}{% endfor %}</td>
            <td>{{ thesis.type }}</td>
        </tr>
    {% endfor %}
</table>