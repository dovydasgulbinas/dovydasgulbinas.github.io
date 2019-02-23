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

render_template() {
  escaped=$1
  eval "echo \"$(cat \"$escaped\")\""
}

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


new_draft(){
   
    # TODO: Modify prompt 
    #read title
    #kebab_title=$(echo $title | tr " " -)

    #new_draft="$DRAFTS_DIR/$kebab_title"
    
    layout="blog"
    comments="True"
    title="this is a test title"
    date="2018-08-09"

    render_template $NEW_DRAFT_TEMPLATE



}


$1 $2 $3 $4 $5

# https://superuser.com/questions/106272/how-to-call-bash-functions
