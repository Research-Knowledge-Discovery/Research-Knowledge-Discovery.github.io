---
title: News
redirect_to: /
---
<ul class="allnews">
  {% for post in site.posts %}
    <li class="singlenews {{ post.date | date: '%m-%Y' }}">
      <h2 class="title is-3"><a href="{{ post.url }}">{{ post.title }}</a></h2>
      <p>{{ post.date | date: "%m/%d/%Y" }}</p>
      <img src="{{ post.image }}" class="newsimage"/>
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>