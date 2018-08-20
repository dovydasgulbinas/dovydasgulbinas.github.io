---
layout: post
comments: true
title: Few lessons I learned after using python fabric 1.x
date: 2018-08-19 18:20:13
date_updated:
categories:
  - devops
  - fabric
  - python
---




[Fabric][f] is a great framework for executing code on remote & local machines. The 1.X had a
pretty good documentation, but workflows and tools were not so clearly
established after writing several scrips myself I managed to abstract few rules
that I believe others will find to be useful.


Fabric Lessons
==============

$1. Default function arguments are a honking great idea
-------------------------------------------------------

let's do more of those!


$2. , although using `env.*` as default function parameter may be `problematic`
-------------------------------------------------------------------------------

### $2.1. using `env.*` in method bodies is a bad idea, but it can be made better

```python

def list_root(default_path=None):

    if not default_path:
        default_path = env.sys_default_path
        # this will make function more reusable in other scripts, because
        # you can simply delete this if part and all env.* specific vars are
        # no longer a problem

    run('ls -alt {}'.format(default_path))

```
    
* setting `default_path` inside an if statement makes function more reusable.
* if you use `def list_root(default_path=env.sys_default_path):`  it will be
  incompatible with paragraph [$5].


$3. Split your code to python modules
-------------------------------------

    |- nodes.py (servers)
    |- installers.py
    |- services.py
    `- fabfile.py (imports files above)

Your code will outgrow a single file trust me.  Think about module structure
first!  More info about splitting to modules is [here][ms]



$4. Begin by using global module constants first and only if needed use `env.*`
-------------------------------------------------------------------------------

Somethings never change, let's check if your CAPS LOCK key is still working


```python

from fabric.api import run

# we know that this will never change, so let's store it in a constant
ALL_CAPS_CAPS_LOCK_TEST = 'armstrong'

# == OR ==

# if you want to import some constants from other python modules
from nasa.hax import hacked_user as ALL_CAPS_CAPS_LOCK_TEST


env.host=['nasa.org:22']
env.user = ALL_CAPS_CAPS_LOCK_TEST

def prod_env():
    env.hosts=['prod-server.com']

```


$5. Differentiate environments by using simple Pythonic methods:
----------------------------------------------------------------

```python
from fabric.api import run

env.host=['test-server.com']

def prod_env():
    env.hosts=['prod-server.com']

def test_server():
    # we don't call env hosts inside this func body, because we want test-server
    # to be the default server because, writing: `$ fab test_server [...]` is annoying
    pass
    
def list_home():
    run('ls -alt $HOME')
```

call these methods in your terminal

```bash
$ fab prod_env list_home  # this will execute code on prod server
$ fab test_env list_home # this will execute code on test server 
$ fab list_home  # this will execute code on test server because `env.hosts` are global in fabfile.py module
```

$6. One type of function `root()`,  `run()` or `local()` inside a method body
-----------------------------------------------------------------------------

Excessive usage of mixed execution methods will make your function very hairy and messy,
because in order to write a generic method that you can run both locally and remotely you will need to write many `if`
statements also giving your function tons of default parameters when doing a
subsystem call.  The optimal way is to avoid mixing subsystem
functions: `root()`, `run()`, `local()` in fabric method you are writing!
The benefits of not mixing these functions in a method is that you can replace
them, since function without `()` in Python is an object.  See example below:

```python

from fabric.api import local, run, sudo
from fabric.state import env


env.user='troubled.man'
env.host=['nasa.org:22']

def which_user(caller=local):
    caller('whoami')

which_user(caller=local)  # this will print user of your local machine
which_user(caller=run)  # this will print `troubled.man`
which_user(caller=root)  # this will print `root` (because in linux sudo command
# temporaraly changes your user to root)

# you made function that does 3 different things by passing a single parameter.
# that is why you want constency in your code execution functions

```

$7. python =/= python
---------------------

Fabric is written in Python 2.7 but most of the newer projects are written in Python
3.X.  This means that you can't simply pip install fabric to a python 3.X
environment this results in you having to change virtual or Anaconda environments
when doing fabric calls, see example below:

```bash
$ source activate py27  # activating anaconda python=2.7 env
$ python manage.py runserver  # for example let's call django app writen in 3.X

  File "manage.py", line 15
    ) from exc
         ^
SyntaxError: invalid syntax
```

What just happened that once I activate my virtual environment python executable
path changes:

```bash
$ which python
/usr/bin/python
$ source activate py27
$ which python
~/anaconda/envs/py27/bin/python
```

So that is the reason why django app in example below did not start.  One
possible fix is to use `py27` environment always.  And modify `fabfile.py` to
activate python3 environment locally when needed. 


```python
from fabric.api import local, run, sudo
from fabric.state import env


env.user='armstrong'
env.host=['nasa.org:22']  
env.hosts = env.host

env.runtime = 'source activate py36 &&'  # let's assume our django app is running, on 3.6

def prod_env():
    env.runtime = ''  # we assume default python path is 3.X on prod_env
    env.caller = run


def local_env():
    pass


def python_version(caller=local, runtime=None):

    # let's use runtime of our environment
    if not runtime:
        runtime = env.runtime

    caller('{} python -V'.format(runtime))


def agnostic_python_version(env_func=prod_env):
    """this will print whichever version is on the remote server"""
    
    env_func()  # calls any environment function you set
    python_version(caller=env.caller)
    """
    in this case we can use caller=env.* as
    default parameter, because we explicitly set by calling env_func
    """
```

```bash
$ fab local_env python_version
[localhost] local: source activate py36&& python -V
Python 3.6.3 :: Anaconda, Inc.

# now let's hack into nasa

$ fab agnostic_python_version
[herver.local] Executing task 'agnostic_python_version'
[herver.local] run:  python -V
[herver.local] out: Python 2.7.13
[herver.local] out:


Done.
Disconnecting from nasa.org... done.
```

return 0





[f]: http://docs.fabfile.org/en/1.14/ 
[s]: https://sdf.org/
[ms]: http://docs.fabfile.org/en/1.14/usage/tasks.html?highlight=modules#namespaces

