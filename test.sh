#!/usr/bin/env bash

cat hexo-tags-new.txt | while read line
do
  tag_lower=$(echo $line | tr '[:upper:]' '[:lower:]')
  tag_path=$(echo $tag_lower | sed 's/[ ][ ]*/-/g')
  hexo new page $line" - Blog" --path "blog/tags/"$tag_path
  for ((i=1; i<=5; i++)); do
    hexo new page $line" - Blog" --path "blog/tags/"$tag_path"/"$i
    # echo $cmd_str
  done
done
