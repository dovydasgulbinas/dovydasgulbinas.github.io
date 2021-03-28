import argparse
import pathlib
import io
import re

def _make_text_buffer(note_path):
    note = pathlib.Path(note_path)
    text = note.read_text()

    original_text_buffer = io.StringIO(text)

    return original_text_buffer

def transform_jekyll_header(file_):

    buffer = io.StringIO()

    header = {}
    hr_count = 0

    # Parse the Jekyll Header
    file_.seek(0)
    for line in file_.readlines():
        sline = line.strip("\n")
        if sline == "---" and hr_count < 2:
            hr_count+=1
        elif "layout:" in sline and hr_count < 2:
            pass
        elif "comments:" in sline and hr_count < 2:
            pass
        elif "title:" in sline and hr_count < 2:
            title = sline.lstrip("title: ").strip('"')
            header["title"] = title
            buffer.write(f"{title}\n\n") # writing title now is easier than doing it later
        elif "date:" in sline and hr_count < 2:
            header["date"] = sline.lstrip("date: ")
        elif "date_updated:" in sline and hr_count < 2:
            header["date_updated"] = sline.lstrip("date_updated: ")
        elif "categories:" in sline and hr_count < 2:
            header["categories"] = []
        elif "categories" in header and sline.lstrip(" ").startswith("- ") and hr_count < 2:
            header["categories"].append(sline.lstrip("- "))
        else:
            buffer.write(line)

    # add all header information to end of the file
    for k, v in header.items():
        if k == "title":
            pass
        elif k == "categories":
            comment = f";tags: {' '.join(v)}\n"
            buffer.write(comment)
        else:
            comment = f";{k}: {v}\n"
            buffer.write(comment)

    file_.close()
    buffer.seek(0) # reset cursor for other functions
    return buffer


def transform_line_starts(file_):

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


def convert_notebook(note_path=None, output_dir=None):
    file_ = _make_text_buffer("./_posts/2018-06-26-rest-auth-methods.md")

    file_ = transform_jekyll_header(file_)
    file_ = transform_line_starts(file_)

    print(file_.getvalue())


if __name__ == "__main__":
    convert_notebook()