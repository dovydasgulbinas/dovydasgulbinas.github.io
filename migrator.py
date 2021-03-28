import argparse
import pathlib
import io
import re

COMM = ";"  # comment delimiter

def _make_text_buffer(note_path):
    note = pathlib.Path(note_path)
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
            hr_count+=1
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
    buffer.seek(0) # reset cursor for other functions
    return buffer


def transform_singleline(file_):

    buffer = io.StringIO()

    def star_repl(match):
        return match.group(0).replace('*', '-', 1)
    

    for line in file_.readlines():
        line = re.sub(r"^\s*\*\s+", star_repl, line)  # replace *, with -
        line = re.sub(r"^(```)\w+", lambda m : m.group(1) , line)  # srip lang info from code block

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
    text = re.sub(r"^(.*\n)([=-]+)\n", heading_repl , text, flags=re.MULTILINE)

    buffer.write(text)
    file_.close()
    buffer.seek(0)
    return buffer


def transform_links(file_):
    buffer = io.StringIO()

    # gather all "alias links" to one index e.g. [1]: http://dovydas.xyz
    index = {}
    re_alinks = re.compile(r'^(\[.+\]):\s+([\w$-_@.&+!\?*:\(\),%]+)(?:\s+".*")?')
    for line in file_.readlines():
        match = re_alinks.match(line)

        if match:
            alias, link = match.group(1), match.group(2) 
            # add aliases to index
            index[alias] = link
            # comment out the old line
            text = re_alinks.sub(lambda m: f"{COMM}{m.group(0)}", line)
            buffer.write(text) 
        else:
            buffer.write(line)
    # TODO: Finish replacement

    file_.close()
    buffer.seek(0)
    return buffer


    file_.close()
    buffer.seek(0)
    return buffer

def convert_notebook(note_path=None, output_dir=None):
    file_ = _make_text_buffer("./_posts/test.md")

    file_ = transform_jekyll_header(file_)
    file_ = transform_singleline(file_)
    file_ = transform_multiline(file_)
    file_ = transform_links(file_)

    print(file_.getvalue())


if __name__ == "__main__":
    convert_notebook()