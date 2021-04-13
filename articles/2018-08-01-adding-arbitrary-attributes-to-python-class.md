Adding Arbitrary Attributes To Python Class


# The Problem

You want to create a dummy class that stores **arbitrary** attributes and you
want to access these attributes via `. (dot)` operator e.g. `myClass.age`.  You
can easily do that in Python.  Although using a _dictionary_ type would be more explicit and
Pythonic 😉.

# The Solution


```
class PlaceholderClass:
    def __init__(self, **kwargs):
        for key in kwargs.keys():
            setattr(self, key, kwargs[key])


my_row = PlaceholderClass(name='Jon', surname='Snow', age='died?')
print(my_row.name)
print(my_row.surname)
print(my_row.age)
```

One case I would find this class useful is when you want to declare a single
database row.  In this case each row would be a single instance of a class.  And
whole result set could be added to a list.


**return 33**
;layout: post
;comments: true
;date: 2018-08-01 20:35:10
;date_updated: 
;tags: python snippet
