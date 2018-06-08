---
layout: page
title: Playground
permalink: /playground/
---

# list of pages


{% for my_page in site.pages %}
  {% if my_page.title  and my_page.layout != 'note' %}
  <li >
      {{ my_page.title }} {{my_page.url}} {{my_page.layout}}
  </li>
  {% endif %}
{% endfor %}



---


```
______________________________
< Progress shall fill the void >
------------------------------
       \   ^__^
        \  (oo)\_______
           (__)\       )\/\
               ||----w |
               ||     ||

```
