---
title: "BSc- &amp; MSc-Theses"
sitemap: false
---

Here you can find the BSc.- and MSc. theses we are offering.

Sometimes you can only find a short teaser, feel free to ask us for details. You can also **always** come to us with a topic you are interested in!

These are the theses we are offering right now:

## Prof. Dr. Gernot Heisenberg

### Food Security and Remote Sensing Topics

### Other Topics

[Analyse der Prediction-Performance von Recurrent Neural Networks am Beispiel von Finanzmarktdaten](https://www.gernotheisenberg.de/abschlussarbeit.1.html)

[Analyse der Auswirkung der Codierung von Fragenbogenskalen (insbesondere Likert-Skalen) auf den Untersuchungsgegenstand](https://www.gernotheisenberg.de/abschlussarbeit.2.html)

## Prof. Dr. Philipp Schaer

## Prof. Dr. Klaus Lepsky

Coming soon:
Creation and/or extension of a thesaurus by means of scientific databases for a recommender system of the TH Cologne


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
