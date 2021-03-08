---
title: News
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
<script>
      var params = new URLSearchParams(window.location.search);
      console.log(params.get("date"));
      if (params.get("date") != null) {
          var all_news = document.getElementsByClassName("singlenews");
          console.log(params.get("date"));
          for (var i = 0; i < all_news.length; i++) {
              if (!all_news[i].classList.contains(params.get("date"))) {
                  all_news[i].style.display = 'none';
              }
          }
      }
</script>