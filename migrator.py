import argparse
import pathlib
import io

def transform_jekyll_header(note_path):
    note = pathlib.Path(note_path)
    text = note.read_text()

    text = io.StringIO(text)
    buffer = io.StringIO()

    header = {}
    hr_count = 0

    # Parse the Jekyll Header
    for line in text.readlines():
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

    return buffer.getvalue()



if __name__ == "__main__":
    text = transform_jekyll_header("./_posts/2018-06-26-rest-auth-methods.md")
    print(text)