Creating Multiple Folders From a Bash Array


## About this snippet

This snippet allows you to create a series of directories, that are a part of a
regular bash array. This is super useful if you have bunch of directories to
create and don't really want to iterate using a loop. Also it makes your script
more customizeable, because you control what directories are created in a single
array.


```bash
#!/bin/bash


var="eins"
var2="zwei"

play_array=("$var" "$var2")

mkdir "${play_array[@]}"
```
;layout: post
;comments: true
;date: 2018-11-05 13:05:37
;date_updated: 
;tags: bash cheatsheets
