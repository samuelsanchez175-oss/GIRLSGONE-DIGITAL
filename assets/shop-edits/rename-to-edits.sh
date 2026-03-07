#!/bin/bash
# Rename all image files in this folder to edit1, edit2, edit3, ... (keep extension)
cd "$(dirname "$0")"
i=1
for f in *.*; do
  [ -f "$f" ] || continue
  [ "$f" = "README.txt" ] && continue
  [ "$f" = "rename-to-edits.sh" ] && continue
  ext="${f##*.}"
  newname="edit${i}.${ext}"
  [ "$f" != "$newname" ] && mv "$f" "$newname" && echo "Renamed: $f -> $newname"
  i=$((i+1))
done
echo "Done."
ls -la
