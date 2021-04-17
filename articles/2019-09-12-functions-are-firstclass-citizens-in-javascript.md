Functions are first-class citizens in JavaScript


first class citizen entity/type
:  An entity that supports all operations other entities have. This means first-class citizens can be passed, returned & assigned etc.

**To simply put it this means that you can:**

assign a function to a variable:
```javascript
var coolVariable = function() {
    console.log("Cool Anon Function");
};

coolVariable; // Will return a function object, but not print anything to the console.
coolVariable(); // Will actually call the function.  The magic trick is in the `()`
```

pass a function to a function:
```javascript
function randomDecoration()
{
var decors = Array("=", "-", "~", "X", "_");
// Returns a random decoration from an Array
return decors[Math.floor(Math.random()*decors.length)];
};


function printDecorated(msg, decor)
{
console.log(`${decor()} ${msg} ${decor()}`);
};
// prints:  "X Decorate Me ="

printDecorated("Decorate Me", randomDecoration);
// Notice that we do not add `()`; when passing it as an object
```

partially apply or spawn a new function from a generic function:
```javascript
function customRandomDecoration(decors)
{
  return function(n)
  {
    d = decors[Math.floor(Math.random()*decors.length)]
    // We will repeat the same decoration n times e.g. xxx, --
    return d.repeat(n);
  }
};


function printDecorated(msg, decor)
{
  console.log(`${decor(3)} ${msg} ${decor(4)}`);
};


// We spawn a new function that has custom Decorations and it can be reused
var randomDecoration = customRandomDecoration(Array(":", "-", "~", "_", "+"));
// prints: ""--- Decorate Me ++++"

printDecorated("Decorate Me", randomDecoration);
```
**Sources:**

1. [Functions as First Class Citizens in JavaScript](http://ryanchristiani.com/functions-as-first-class-citizens-in-javascript/)
;layout: post
;comments: true
;date: 2019-09-12 19:44:09
;date_updated: 
;tags: javascript fundamentals
