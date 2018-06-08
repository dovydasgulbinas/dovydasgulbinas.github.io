---
layout: page
title: Project Index
permalink: /projects/
---

## In English 🌎

{% for my_page in site.pages %}
  {% if my_page.title  and my_page.layout == 'note' %}

  - ### [{{ my_page.title }}]({{my_page.url}}) ###

  {% endif %}
{% endfor %}


# In Lithuanian 🇱🇹
