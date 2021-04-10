Installing prerequisites for LetsEncrypt Certbot versions 6.X, 7.X and up


I ran into an issue today when I could not install certbot-auto on a Linux
machine running CentOS 6.10.

As it turns out that you need to install & **enable**  **EPEL** package repository in YUM package manager. So
basically there is a single prerequisite: _EPEL package-repository must be enabled._  Although certbot is really handy  when it comes to getting a certificate, yet getting a succinct message about the fact that EPEL is not enabled is not as helpful.

The error I got prior enabling the **EPEL** looked something like this:

    Package ca-certificates-2018.2.22-65.1.el6.noarch already installed and latest version
    Package python-devel-2.6.6-68.el6_10.x86_64 already installed and latest version
    No package python-virtualenv available.
    Package python-tools-2.6.6-68.el6_10.x86_64 already installed and latest version
    No package python-pip available.
    Package 1:mod_ssl-2.2.15-69.el6.centos.x86_64 already installed and latest version
    Nothing to do
    Creating virtual environment...
    Traceback (most recent call last):
      File "<stdin>", line 27, in <module>
      File "<stdin>", line 19, in create_venv
      File "/usr/lib64/python2.7/subprocess.py", line 185, in check_call
        retcode = call(*popenargs, **kwargs)
      File "/usr/lib64/python2.7/subprocess.py", line 172, in call
        return Popen(*popenargs, **kwargs).wait()
      File "/usr/lib64/python2.7/subprocess.py", line 394, in _init_
        errread, errwrite)
      File "/usr/lib64/python2.7/subprocess.py", line 1047, in _execute_child
        raise child_exception
    OSError: [Errno 2] No such file or directory
    [root@moment-ext tmp]#

let's focus on the line with `No package python-pip available.`.  It turns out
that  python-pip & python-virtualenv are EPEL packages.  Let's fix that!

## Solution/Fix

Install and enable EPEL:

```
yum update

# Install EPEL
yum install epel-release -y 

# change enabled=0 to enable=1 under [EPEL] section
vim /etc/yum.repos.d/epel.repo 
```
Save & Exit the text editor

Update packages:

```
yum update
```

Let's verify that EPEL was enabled:

```
yum repolist | grep epel

# If grep catches something like:

# epel             Extra Packages for Enterprise Linux 6 - x86_64           12,568

# then are good to go
```

Finally install Let's Encrypt's certbot from [here](https://certbot.eff.org/)

**return 0**
;layout: post
;comments: True
;date: 2019-09-12 15:46:41
;date_updated: 
;tags: linux letsencrypt
