---
---
<div>
    {% for project in site.projects %}
        {% for category in project.research-areas %}
        <input type="checkbox" class="filter" id="{{ category.tag }}" checked/>
        <label for="{{ category.tag }}">{{ category.name }}</label>
        {% endfor %}
    {% endfor %}
    {% for project in site.projects %}
    <div class="singleproject {% for category in project.research-areas %}{{ category.tag }} {% endfor %}">
        <p>{{ project.name }}: {{ project.duration.beginning }} - {{ project.duration.end }}</p>
        {% for partner in project.partners %}
            <p>{{ partner }}</p>
        {% endfor %}
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