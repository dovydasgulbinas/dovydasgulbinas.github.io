from fabric.api import local
from fabric.context_managers import lcd
from fabric.state import env
from fabric.operations import prompt
import os

BLOGDIR = os.path.dirname(os.path.realpath(__file__))
FILENAME_DATE_FORMAT = '%Y-%m-%d-'
POST_DATE_FORMAT = '%Y-%m-%d %H:%M:%S'
JEKYLL_PORT = 4000
REMOTE_URL = "https://megamorphf.github.io"
LOCAL_URL = "http://127.0.0.1:{}".format(JEKYLL_PORT)
TEXT_EDITOR = "vim"

DRAFTDIR = os.path.join(BLOGDIR, '_drafts')
POSTDIR = os.path.join(BLOGDIR, '_posts')

EXT = '.md'
NEW_DRAFT_TEMPLATE ="""---
layout: {layout}
comments: {comments}
title: {title}
date: {date}
date_updated:
categories:
  - default
---
"""


"""
conda create -n deploy python=2.7 fabric
blogdir="$HOME/Desktop/blog"
alias blog-serve="cd $blogdir && bundle exec jekyll serve --drafts"
alias blog-serve-no-drafts="cd $HOME/Desktop/blog && bundle exec jekyll serve"
alias blog-go=" cd $blogdir"
alias blog-edit="cd $blogdir && vifm ."
"""


def serve(blogdir=BLOGDIR, local_url=LOCAL_URL):
    with lcd(blogdir):
        _open_in_browser(local_url)
        local("bundle exec jekyll serve --drafts")


#### HELPERS ####


def list_drafts(draftdir=DRAFTDIR, msg='select'):
    from os import listdir
    from os.path import isfile, join
    drafts = [f for f in listdir(draftdir) if isfile(join(draftdir, f))]
    drafts.append ('[Chose no file]')
    draftfile = None

    for i, draft in enumerate(drafts, start=1):
        print("    {}. {}".format(i, draft))
    number = int(input("Choose draft you want to {}: ".format(msg)))

    if number  == len(drafts):  # chose last item, skip
        print "Skipping file choice"
        return None

    for i, draft in enumerate(drafts, start=1):
        print number, i, draft
        if i == number:
            draftfile = os.path.join(draftdir, draft)
            return draftfile


def mv_draft(draftdir=DRAFTDIR, postdir=POSTDIR,
        dateformat=FILENAME_DATE_FORMAT):

    sfile = list_drafts(draftdir, 'publish')

    if not sfile:
        print "File you have chosen does not exist"
        return None

    timestr = _timenow(dateformat)
    origname = os.path.basename(sfile)
    newname = timestr + origname
    pubpath = (os.path.join(postdir, newname))
    local('mv {} {}'.format(sfile, pubpath))
    return pubpath


def publish(draftdir=DRAFTDIR, postdir=POSTDIR, pageurl=REMOTE_URL):
    """lets you to choose a file for publishing"""
    local("git checkout master")
    local("git pull origin master")
    fpath = mv_draft(draftdir, postdir)
    local('git add {}'.format(fpath))
    local('git commit')
    local("git push origin master")
    _open_in_browser(pageurl)


def new_draft(title=None, layout='post', comments='true'):
    title_correct = False
    format_dic = {
        "title": None,
        "layout": layout,
        "comments": comments,
        "date": None
    }

    while not title_correct:
        title = prompt("Please Enter The Title For Your New Draft:")
        print((" {} ").format(title).center(40, '='))
        user_input = prompt("Is Title Above Correct? Y/n:",
        validate=_yes_no_validator)

        title_correct = user_input
        format_dic["title"] = title
        format_dic["date"] = _timenow(dateformat=POST_DATE_FORMAT)

    jekyll_header = NEW_DRAFT_TEMPLATE.format(**format_dic)
    print(jekyll_header)

    # kebabify, add extension
    filename = _kebabify(format_dic["title"]) + EXT
    filepath = os.path.join(DRAFTDIR, filename)
    with open(filepath, "w+") as f:
        f.write(jekyll_header)

    print("Created new Draft file at: {}".format(filepath))
    open_file = prompt("Open file in text editor? Y/n:",
    validate=_yes_no_validator)

    if open_file:
        _open_in_editor(filepath)


def _yes_no_validator(user_input):
    yes = {'yes', 'y', 'ye', ''}
    no = {'no', 'n'}

    choice = user_input.lower()
    if choice in yes:
        return True
    elif choice in no:
        return False
    else:
        raise("Please respond with 'yes' or 'no'")


def _kebabify(input_string):
    """Turns beatifully crafted strings into peaces of pierced meat"""
    return input_string.lower().replace(' ', '-')


def edit_draft():
    sfile = list_drafts(DRAFTDIR, 'editing')
    _open_in_editor(sfile)


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

## UTILS ##

def _open_in_editor(filepath, editor=TEXT_EDITOR):
    local('{} {}'.format(editor, filepath))


def _timenow(dateformat=FILENAME_DATE_FORMAT):
    import datetime
    return datetime.datetime.now().strftime(dateformat)


def _open_in_browser(url):
    import subprocess
    import webbrowser
    import sys

    if sys.platform == 'darwin':  # in case of OS X
        subprocess.Popen(['open', url])
    else:
        webbrowser.open_new_tab(url)
