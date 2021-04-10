Creating A Production Ready Django App, pt. 2



# Intro

Before reading this, please make sure you are familiar with concepts and ideas
covered in the pt.1 of this [post](https://dovydas.xyz/django/python/devops/skeleton/2018/06/27/creating-a-production-ready-django-app-pt1.html).  This post will be short and will simply
create an additional file that will help us out with deployment task automation.
The code for this project will be available at this [git repository](https://github.com/dovydasgulbinas/blog-django-skeleton) make sure you
checkout to git branch pt2! Also if you are not lazy 😉 I highly encourage you to
do all the steps in this tutorial manually.


# STAGE-6 | Create Fabric File

In this stage we will create a new **fabfile.py**. This file will contain all
the useful devops functions we will write and define.  Keep in mind that
**fabric2** as oppose to **fabric** is relatively very new and still under
active development.  The biggest benefit of the fabric2 is that it runs on
python2.7 and python3.4+.  This means you will not need to hack your system path
variables (on your terminal) every time your project is written on python 3.4+,
because fabric package installed using pip3 will simply crash.


    cd <my-django-repo>
    cd <cool_project>
    source ../env/bin/activate
    pip install fabric2

Now close and reopen new terminal window, because sometimes **stubs** installed via
pip do not work.  **Stub** for those who do not know is a python script that is
not a library, stubs are used as **standalone** scripts, that help us out with
various tasks.  Stubs can be called from terminal directly as long as the stub
directory is in your `$PATH` variable.  Every python virtual environment will
have its own stub directory in our case they are stored at `../env/bin/`.


Since we closed the terminal we need to activate virtual env again!

    cd <my-django-repo>
    cd <cool_project>
    source ../env/bin/activate

By now you should notice that the last line you have called calls a python stub
called **activate**



## Copy Pasta Time

We need to create a new fabric.py file:

    cd <my-django-repo>
    cd <cool_project>
    touch fabfile.py

now copy contents below to `fabfile.py`

<script src="https://gist-it.appspot.com/http://github.com/dovydasgulbinas/blog-django-skeleton/blob/pt2/cool_project/fabfile.py"></script>


# STAGE-7 | Let's Test The Fabric2

Using fabric2 CLI is relatively painless.  You Can list all the available tasks
by calling `fab2 -l`

let's list fab2 tasks:

    fab2 -l

let's start our Django project using fab2:

    fab2 run


<asciinema-player src="/assets/cinemas/fab2.cast" cols="90" rows="25"></asciinema-player>


# Outro

This was a brief tutorial it did not even scratch the surface of fabric2 I highly recommend you to check. The `fabfile.py`
for yourself and try to understand what is written in that script.  I want to warn you that I may update the `fabfile.py` snippet showed in this blogpost, but this will be only for the greater good, because I currently have not fiugred out a way of importing bash environment variables to Nagios (Nagios is the core lib of fabric2).  Happy hacking and please do leave questions and suggestions in the comments.

return 0

;[1]: https://dovydas.xyz/django/python/devops/skeleton/2018/06/27/creating-a-production-ready-django-app-pt1.html
;[2]: https://github.com/dovydasgulbinas/blog-django-skeleton
;layout: post
;comments: true
;date: 2018-07-07
;date_updated: 
;tags: django python devops skeleton
