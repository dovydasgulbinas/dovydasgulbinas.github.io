#!/usr/local/bin/python3

import argparse
import io
import re
import subprocess
import sys
from pathlib import Path

COMM = ";"  # comment delimiter


def _make_text_buffer(note_path):
    note = Path(note_path)
    text = note.read_text()

    original_text_buffer = io.StringIO(text)

    return original_text_buffer


def transform_jekyll_header(file_):
    buffer = io.StringIO()

    header = {}
    hr_count = 0

    re_item = re.compile(r"^\s*(\w+):\s*(.*)")

    # Parse the Jekyll Header
    file_.seek(0)
    for line in file_.readlines():
        sline = line.strip("\n")

        if hr_count >= 2:  # do no parse if first to lines were consumed
            buffer.write(line)
            continue

        if sline == "---":
            hr_count += 1
        elif "categories:" in sline:  # categories is a specific case
            header["categories"] = []
        elif "categories" in header and sline.lstrip(" ").startswith("- "):
            header["categories"].append(sline.lstrip("- "))
        else:
            match = re_item.match(sline)
            if match:
                key, value = match.group(1), match.group(2).strip('"')
                header[key] = value
                if key == "title":
                    # writing title now is easier, because file cursor is at the top
                    buffer.write(f"{value}\n\n")
            else:
                buffer.write(line)

    # add all header information to end of the file
    for k, v in header.items():
        if k == "title":
            pass
        elif k == "categories":
            comment = f"{COMM}tags: {' '.join(v)}\n"
            buffer.write(comment)
        else:
            comment = f"{COMM}{k}: {v}\n"
            buffer.write(comment)

    file_.close()
    buffer.seek(0)  # reset cursor for other functions
    return buffer


def transform_singleline(file_):

    buffer = io.StringIO()

    def star_repl(match):
        return match.group(0).replace("*", "-", 1)

    for line in file_.readlines():
        line = re.sub(r"^\s*\*\s+", star_repl, line)  # replace *, with -
        line = re.sub(
            r"^(```)\w+", lambda m: m.group(1), line
        )  # srip lang info from code block

        buffer.write(line)

    file_.close()
    buffer.seek(0)
    return buffer


def transform_multiline(file_):

    buffer = io.StringIO()

    def heading_repl(match):
        heading, hstyle = match.group(1), match.group(2)

        if len(set(hstyle)) != 1:
            return match.group(0)  #  incorrect atx style heading format do nothing

        if "=" in hstyle:
            return f"# {heading}\n"
        elif "-" in hstyle:
            return f"## {heading}\n"
        else:
            # unknown heading style
            return match.group(0)

    text = file_.getvalue()

    # replace atx style headings
    text = re.sub(r"^(.*\n)([=-]+)\n", heading_repl, text, flags=re.MULTILINE)

    buffer.write(text)
    file_.close()
    buffer.seek(0)
    return buffer


def transform_links(file_):
    buffer = io.StringIO()

    # gather all "alias links" to one index e.g. [1]: http://dovydas.xyz
    uri_indexes = {}
    re_links = re.compile(r'^(\[.+\]):\s+([\w$-_@.&+!\?*:\(\),%]+)(?:\s+".*")?')
    for line in file_.readlines():
        match = re_links.match(line)

        if match:
            link, uri = match.group(1), match.group(2)
            # add aliases to index
            uri_indexes[link.strip("[]")] = uri
            # comment out the old line
            text = re_links.sub(lambda m: f"{COMM}{m.group(0)}", line)
            buffer.write(text)
        else:
            buffer.write(line)
    for link, uri in uri_indexes.items():
        specific_regex = re.compile(
            fr"\[{link}\]"  # replace with specific index
            fr"(?![\[:])"  #  [ - title link collision, : - same definition
        )

        text = specific_regex.sub(lambda l: f"({uri})", buffer.getvalue())
        buffer = io.StringIO()  # get clean buffer
        buffer.write(text)

    file_.close()
    buffer.seek(0)
    return buffer


def transform(note_path):
    file_ = _make_text_buffer(note_path)

    file_ = transform_jekyll_header(file_)
    file_ = transform_singleline(file_)
    file_ = transform_multiline(file_)
    file_ = transform_links(file_)

    return file_.getvalue()


def transform_all_posts(articles_dir: Path, dry_run=True, exts=("*.md",)):
    import glob

    posts = []

    # get all the files on one go
    for ext in exts:
        path = str(articles_dir.joinpath(ext))
        posts.extend(glob.glob(path))

    for post in posts:
        transformed_post = transform(post)

        if dry_run:
            print("dry transform run on: ", post)
            continue

        post.write_text(transformed_post)


def _process_cmd_queue(cmd_queue, silent=True):

    joined = lambda j: " ".join(j)
    called = lambda c: f"\n\tCalled: '{joined(c)}'.\n"

    for cmd in cmd_queue:
        try:
            subprocess.run(
                cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT
            )
        except subprocess.CalledProcessError as e:
            msg = e.stderr
            if not msg:
                msg = e.output
            print(f"ERROR: {msg}" f"{called(e.cmd)}")
            sys.exit(e.returncode)
        except OSError as e:
            print(f"ERROR: OS specific issue: {e.strerror}\n" f"{called(cmd)}")
            sys.exit(e.errno)


def git_initial_setup(
    *, default_branch, tag_name, migration_branch, posts_dir, articles_dir
):

    cmd_queue = [
        ["git", "checkout", default_branch],  # checkout to e.g. master
        ["git", "tag", tag_name],  # create a tag for historical reasons
        ["git", "push", "--tags", "origin", default_branch],  # push new tags
        ["git", "mv", posts_dir, articles_dir],  # move posts
        ["git", "commit", "-m", f"AUTO: Moving '{posts_dir}' to '{articles_dir}'"],
    ]
    _process_cmd_queue(cmd_queue)


def main():
    parser = argparse.ArgumentParser(
        description="Run all necessary steps for migration to Blogit"
    )

    parser.add_argument("-i", "--posts_dir", default="./_posts", type=Path)
    parser.add_argument("-o", "--articles_dir", default="./articles", type=Path)
    parser.add_argument("-d", "--default_branch", type=str, default="master")
    parser.add_argument("-t", "--tag_name", type=str, default="before-migration")
    parser.add_argument(
        "-m", "--migration_branch", type=str, default="blogit-migration-br"
    )

    args = parser.parse_args()
    if not args.posts_dir.exists() and not args.posts_dir.is_dir():
        raise Exception(
            f"Path '{args.posts_dir}' provided is not a directory or does not exist"
        )

    print(args)
    transform_all_posts(args.articles_dir, dry_run=True)
    # git_initial_setup(
    #     default_branch=args.default_branch,
    #     tag_name=args.tag_name,
    #     migration_branch=args.migration_branch,
    #     posts_dir=args.posts_dir,
    #     articles_dir=args.articles_dir,
    # )



if __name__ == "__main__":
    main()
