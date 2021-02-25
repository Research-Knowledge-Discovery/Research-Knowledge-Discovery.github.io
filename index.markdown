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
<div class="recent-news">
{% for recent in site.news %}
    {% capture newsimage %}{{ recent.image }}{% endcapture %}
    {% capture newstitle %}{{ recent.title }}{% endcapture %}
    {% capture newsdate %}{{ recent.time_posted }}{% endcapture %}
    {% capture newslink %}{{ recent.find_out_more }}{% endcapture %}
    {% include newsbox.html image=newsimage title=newstitle time_posted=newsdate find_out_more=newslink%}
{% endfor %}
</div>

---

# What we do
{: .title .has-text-centered}

<div class="columns is-multiline is-centered">
    <div class="column is-4 has-text-centered" style="display: flex; justify-content: center">
        <figure style="display: flex; align-items: center;">
            <img class="image small" src="assets/images/testimage.png"/>
            <figcaption>Text</figcaption>
        </figure>
    </div>
    <div class="column is-4 has-text-centered" style="display: flex; justify-content: center">
        <figure style="display: flex; align-items: center;">
            <img class="image small" src="assets/images/testimage.png"/>
            <figcaption>Text</figcaption>
        </figure>
    </div>
    <div class="column is-4 has-text-centered" style="display: flex; justify-content: center">
        <figure style="display: flex; align-items: center;">
            <img class="image small" src="assets/images/testimage.png"/>
            <figcaption>Text</figcaption>
        </figure>
    </div>
</div>