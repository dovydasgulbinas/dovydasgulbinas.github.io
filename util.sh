#!/bin/bash

DRAFTS_DIR="$BLOG_DIR/_drafts"
DRAFT_EXT='.md'

NEW_DRAFT_TEMPLATE="---
layout: {layout}
comments: {comments}
title: {title}
date: {date}
date_updated:
categories:
  - default
---
"

if [ -f "$BASH_MODULES_DIR/casbab.sh" ]; then
. "$BASH_MODULES_DIR/casbab.sh"
else
    echo "failed to load casbab.sh module!"
    exit 0;
fi

ls_drafts(){
    ( clear;
    cd $DRAFTS_DIR;
    GOTONOTE=true
    IFS=$'\n';
    filelist=$(ls -t $DRAFTS_DIR | xargs -0);
    PS3='Select a file: ';
    select file in $filelist
    do
        if [[ -n $file ]]; then
            FILE=$file;
            filename=$(echo $FILE);
            #filename=$(echo $FILE | awk -F ":" '{print $1}')

            echo "Opening: $filename";

            if $GOTONOTE; then
                notedir=$(dirname "${filename}");
                cd $notedir;
                filename=$(basename -- "$filename");
            else
                echo "NOT GOING TO NOTE DIR"
            fi

            # $EDITOR $filename
            if [ "$EDITOR" = 'vim' ]; then
                $EDITOR "$FILE";
            else
                $EDITOR "$FILE";
            fi
            break;
        else
            echo 'invalid selection';
        fi
    done;)
}

_created(){
    date '+%Y-%m-%d %H:%M:%S'
}


new_draft(){
   
    d=${2:-$DRAFTS_DIR}

    echo "Enter name of the new draft:"
    read title
    layout="blog"
    comments="True"
    date=$(_created)

    draft_name="$(kebab "$title")$DRAFT_EXT"
    note_path="$DRAFTS_DIR/$draft_name"
    echo $note_path

    # $EDITOR $note_path
    templ=$(cat <<EOF
---
layout: $layout
comments: $comments
title: \"$title\"
date: $date
date_updated:
categories:
  - default
---
EOF
)

printf -- "$templ" >> $note_path
echo $note_path   
$EDITOR $note_path
}


$1 
# $2 $3 $4 $5

# https://superuser.com/questions/106272/how-to-call-bash-functions
