---
---
# Projects
{: #first-heading .title}
<div>
    {% for project in site.projects %}
        {% for category in project.research-areas %}
        <input type="checkbox" class="filter" id="{{ category.tag }}" checked/>
        <label for="{{ category.tag }}">{{ category.name }}</label>
        {% endfor %}
    {% endfor %}
    <hr/>
    {% for project in site.projects %}
    <div class="singleproject {% for category in project.research-areas %}{{ category.tag }} {% endfor %}">
        <h2 class="title is-5">{{ project.name }}</h2>
        {% for category in project.research-areas %}
            <button class="button">{{ category.name }}</button>
        {% endfor %}
        <p>{{ project.summary }}</p>
        <div class="lists">
            <ul>
                <li>Duration: {{ project.duration.beginning }} - {{ project.duration.end }}</li>
                <li>Partners: {% for partner in project.partners %}<a href="{{ partner.link }}">{{ partner.name }}</a>{% if project.partners.size > 1 %}, {% endif %}{% endfor %}</li>
                <li>
                    People involved: 
                    {% for person in project.people %}
                        {% for member in site.people %}
                            {% if member.name == person.name %}
                                <a href="{{ member.url }}">{{ member.name }}</a>{% if project.people.size > 1 %}, {% endif %}
                                {% break %}
                            {% elsif person.externallink != null %}
                                <a href="{{ person.externallink }}">{{ person.name }}</a>
                            {% else %}
                                {{ person.name }}
                                {% break %}
                            {% endif %}
                        {% endfor %}
                    {% endfor %}
                </li>
                <li>Funded by: <a href="{{ project.funding.link }}">{{ project.funding.name }}</a></li>
            </ul>
        </div>
    </div>
    {% endfor %}
</div>
<script>
    var shown = document.getElementsByClassName("singleproject");
    var checkboxes = document.getElementsByClassName("filter");
    for (var j = 0; j < checkboxes.length; j++) {
        let checkbox = checkboxes[j];
        checkbox.addEventListener('click', function() {
            if (checkbox.checked == true) {
                for (var i = 0; i < shown.length; i++) {
                    if (shown[i].classList.contains(checkbox.id)) {
                        shown[i].style.display = 'block';
                    }
                }
            }
            else {
                for (var i = 0; i < shown.length; i++) {
                    if (shown[i].classList.contains(checkbox.id)) {
                        shown[i].style.display = 'none';
                    }
                }
            }
        });
    }
</script>