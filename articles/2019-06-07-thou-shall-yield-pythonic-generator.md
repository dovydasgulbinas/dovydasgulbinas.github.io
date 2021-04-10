Thou Shall Yield Pythonic Generator



## Intro

This is a  illustrative example code, which tries to demonstrate
how generators and `yield` statements are related in python.

```
print("# `yield` a fancy way of pausing execution of a function.\n")


print("# Let's begin with a complex example\n")

def smart_yield():
    for item in range(0, 4):
        yield item


print("# We can only access value of a generator by itterating over it.")
print()

for item in smart_yield():
    print(f'smart_yield item: {item}')
print()


def stupid_yield():
    print("# Each iteration progresses the code by consuming one `yield` at a time")
    print()

    yield 0
    yield 1
    yield 2
    yield 3

    print("# No more yield keywords exist, let's close the generator")
    print()


for item in stupid_yield():
    print(f'stupid_yield item: {item}')
print()


def hybrid_yield():
    print("# Generators remember last `yield` they returned")
    print()

    yield 0
    yield 1

    for item in range(2, 4):
        yield item

    print("# We have finished executing  hybrid_yield")
    print("# Notice that hybrid_yield ran 5 times (intermittently) instead of expected 4")
    print()


for item in hybrid_yield():
    print(f'hybrid_yield item: {item}')


conclusions ="""
# Conclusions:
    - Yield allows us to pause code execution while  being able to do something else
    - Since we paused execution we can jump back into it at any time.
    - each `yield <value>` is like a `return <value>`
    - since we remember that last `yield` statement we don't execute it again
    - Generator functions `run n+1` times where n - number of yield keywords in
      a function.
    - You should imagine yield keyword a way of slicing function to small pausable functions
"""

print(conclusions)

```

## Source Output

If you are lazy and don't want to run his code. Here is the output:

    # `yield` a fancy way of pausing execution of a function.

    # Let's begin with a complex example

    # We can only access value of a generator by itterating over it.

    smart_yield item: 0
    smart_yield item: 1
    smart_yield item: 2
    smart_yield item: 3

    # Each iteration progresses the code by consuming one `yield` at a time

    stupid_yield item: 0
    stupid_yield item: 1
    stupid_yield item: 2
    stupid_yield item: 3
    # No more yield keywords exist, let's close the generator


    # Generators remember last `yield` they returned

    hybrid_yield item: 0
    hybrid_yield item: 1
    hybrid_yield item: 2
    hybrid_yield item: 3
    # We have finished executing  hybrid_yield
    # Notice that hybrid_yield ran 5 times (intermittently) instead of expected 4


    # Conclusions:
        - Yield allows us to pause code execution while  being able to do something else
        - Since we paused execution we can jump back into it at any time.
        - each `yield <value>` is like a `return <value>`
        - since we remember that last `yield` statement we don't execute it again
        - Generator functions `run n+1` times where n - number of yield keywords in
          a function.
        - You should imagine yield keyword a way of slicing function to small pausable functions



;layout: post
;comments: True
;date: 2019-06-07 15:23:24
;date_updated: 
;tags: python fundamentals
