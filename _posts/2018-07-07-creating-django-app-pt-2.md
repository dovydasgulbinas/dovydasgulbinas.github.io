---
layout: post
comments: true
title: Creating A Production Ready Django App, pt. 2
date: 2018-07-07 17:28:25
date_updated: 2018-07-07 17:28:25
categories:
  - django
  - python
  - devops
  - skeleton
---


# Intro

Before reading this, please make sure you are familiar with concepts and ideas
covered in the pt.1 of this [post][1].  This post will be short and will simply
create an additional file that will help us out with deployment task automation.
The code for this project will be available at this [git repository][2] make sure you
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






# STAGE-7 | Let's Test The Fabric2

Using fabric2 CLI is relatively painless.  You Can list all the available tasks
by calling `fab2 -l`




[1]: https://megamorphf.github.io/django/python/devops/skeleton/2018/06/27/creating-a-production-ready-django-app-pt1.html
[2]: https://github.com/megamorphf/blog-django-skeleton
