from fabric.api import local
from fabric.context_managers import lcd
from fabric.state import env
import os
env.blogdir = "/Users/hermes/Desktop/blog"
env.draftdir = os.path.join(env.blogdir, '_drafts')
env.postdir = os.path.join(env.blogdir, '_posts')
env.jekyll_port = 4000
env.remote_url = "https://megamorphf.github.io"

"""
conda create -n deploy python=2.7 fabric
blogdir="$HOME/Desktop/blog"
alias blog-serve="cd $blogdir && bundle exec jekyll serve --drafts"
alias blog-serve-no-drafts="cd $HOME/Desktop/blog && bundle exec jekyll serve"
alias blog-go=" cd $blogdir"
alias blog-edit="cd $blogdir && vifm ."
"""


def serve():
    with lcd(env.blogdir):
        _open_in_browser("http://127.0.0.1:{}".format(env.jekyll_port))
        local("bundle exec jekyll serve --drafts")

#### HELPERS ####

def list_drafts(draftdir=env.draftdir, postdir=env.postdir):
    from os import listdir
    from os.path import isfile, join
    drafts = [f for f in listdir(draftdir) if isfile(join(draftdir, f))]
    drafts.append ('[Chose no file]')
    drafts_enumerated = enumerate(drafts, start=1)

    for i, draft in drafts_enumerated:
        print("    {}. {}".format(i, draft))
    number = input("Choose draft you want to publish: ")

    if number  == len(drafts):  # chose last item, skip
        print "Skipping file choice"
        return

    for i, draft in drafts_enumerated:
        if i == number:
            draftfile = os.path.join(draftdir, draft)
            local('mv {} {}'.format(draftfile, postdir))

def commit():
    local("git status")
    print("="*60)
    local("git add -i")
    print("="*60)
    local("git add -p && git commit")


def amend():
    local("git add -p && git commit --amend")


def push():
    local("git push origin master")


def publish():
    """does a commit and pushes to master"""
    local("git pull origin master")
    list_drafts()
    commit()
    local("git checkout master")
    local("git push origin master")
    _open_in_browser("https://megamorphf.github.io")


def _user_confirms(message):
    # raw_input returns the empty string for "enter"
    yes = {'yes', 'y', 'ye', ''}
    no = {'no', 'n'}

    choice = raw_input(message).lower()
    if choice in yes:
        return True
    elif choice in no:
        return False
    else:
        print("Please respond with 'yes' or 'no'")


def _open_in_browser(url):
    import subprocess
    import webbrowser
    import sys

    if sys.platform == 'darwin':  # in case of OS X
        subprocess.Popen(['open', url])
    else:
        webbrowser.open_new_tab(url)
