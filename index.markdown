---
title: Home
---
# Welcome! 
{: #first-heading .title .has-text-centered}
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
{: .content}

---

# Latest News
{: .title .has-text-centered}


**mm/dd/yyyy** - New theses added! [Find out more]({{ site.baseurl }}/theses-and-jobs/bsc-msc-theses.html)
{: .has-text-centered}

<!-- TODO: Only output the three most recent news -->
<!-- Input recent news field values into an include as parameters. Includes can't process curly brackets in their parameters which is why their content needs to be captured into variables first -->
<div class="columns is-multiline is-centered recent-news">
<!-- Sort recent news by date... -->
{%- assign sorted_news = site.news | sort: 'date' | reverse -%}
<!-- ... and only output the three most recent entries -->
{%- for recent in sorted_news limit: 3 -%}
    {%- capture newsimage %}{{ recent.image }}{% endcapture -%}
    {%- capture newstitle %}{{ recent.title }}{% endcapture -%}
    {%- capture newsdate %}{{ recent.date | date: '%m/%d/%Y at %H:%M' }}{% endcapture -%}
    {%- capture newslink %}{{ recent.find_out_more }}{% endcapture -%}
    {%- include newsbox.html image=newsimage title=newstitle time_posted=newsdate find_out_more=newslink -%}
{%- endfor -%}
</div>

---

# What we do
{: .title .has-text-centered}

Knowledge Discovery beschreibt den Prozess der automatischen Suche nach Mustern in großen Datenmengen, die als Wissen über die untersuchte Domäne angesehen werden können. Die Verfahren und Ansätze haben sich aus dem Data-Mining heraus entwickelt und sind sowohl methodisch als auch terminologisch eng mit diesem verbunden. Bekannt ist Knowledge Discovery meist im wirtschaftlichen Bereich, wo mit strukturierten Unternehmensdaten (z.B. Kundendaten, Kaufverhalten etc.) gearbeitet wird. Wie viele andere Formen der Wissensentdeckung erzeugt dieser Prozess eine Abstraktion der Eingangsdaten, die wieder zu neuen Daten, Informationen und Wissen führen kann.

Im neuen Forschungsvorhaben des Research Knowledge Discovery (RKD) werden KD-Verfahren auf Artefakte und Entitäten des Hochschul- bzw. Wissenschaftsbetriebs (Wissenschaftliche Veröffentlichungen, Patente, Zitationen, Projekte, Wissenschafts- und Themenfelder etc.) angewendet, um ein Forschungs- und Expertise-Netzwerk aufzubauen, das Wissenschaftler, Forscher, Hilfsorganisationen, NGOs, Firmen und Verbände der Region (und darüber hinaus) miteinander verzahnt.

Research Knowledge Discovery erlaubt beispielweise die Bearbeitung folgender Anwendungsfälle:
* Detektion von Experten (z.B. über Netzwerkanalyse, Zitationen oder Author-Profiling);
* Zuordnung von Personen/Papieren/Projekten/Projektpartnern/Firmen etc. zu Themen;
* Aufbau eines Empfehlungssystems auf der Grundlage von Themen, Zitationen, Experten oder anderen nicht-textuellen Dokument-Eigenschaften.

![chart](assets/images/home_img1.png)
{: .has-text-centered}


<div class="columns is-multiline is-centered">
    <div class="column is-4 has-text-centered presentation">
        <img class="image small" src="assets/images/testimage.png"/>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat</p>
    </div>
    <div class="column is-4 has-text-centered presentation">
        <img class="image small" src="assets/images/testimage.png"/>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat</p>
    </div>
    <div class="column is-4 has-text-centered presentation">
        <img class="image small" src="assets/images/testimage.png"/>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat</p>
    </div>
</div>