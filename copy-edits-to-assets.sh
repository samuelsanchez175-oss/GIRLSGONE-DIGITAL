#!/bin/bash
# Copies images from ~/Downloads/edits into assets/edits as edit1, edit2, ...
# Run from project root: ./copy-edits-to-assets.sh

SRC="$HOME/Downloads/edits"
DEST="$(dirname "$0")/assets/edits"

mkdir -p "$DEST"
i=1
for f in "$SRC"/*; do
  [ -f "$f" ] || continue
  ext="${f##*.}"
  [ "$ext" = "$f" ] && ext="png"
  cp "$f" "$DEST/edit${i}.${ext}"
  echo "Copied: $(basename "$f") -> edit${i}.${ext}"
  i=$((i+1))
done
echo "Done. $(ls "$DEST" 2>/dev/null | wc -l) files in $DEST"
ls -la "$DEST"
