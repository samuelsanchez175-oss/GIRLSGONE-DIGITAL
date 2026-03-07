#!/usr/bin/env bash
# Copy t-shirt model images into project assets.
# Run from project root: bash copy-tshirt-images.sh
set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DST="$SCRIPT_DIR/assets"
mkdir -p "$DST"

# Try Cursor project assets (where images were saved)
CURSOR="$HOME/.cursor/projects/Users-samuel-Desktop-CHATGPT-CREATED-FILES-GIRLS-gone-digital/assets"
if [[ -f "$CURSOR/SKYW4704-9de9d062-41df-470e-a30d-c2b08f4c24f4.png" ]]; then
  cp "$CURSOR/SKYW4704-9de9d062-41df-470e-a30d-c2b08f4c24f4.png" "$DST/tshirt-model-1.png"
  echo "Copied tshirt-model-1.png"
fi
if [[ -f "$CURSOR/SKYW4940-c5d6d15b-24c2-4f29-86c1-085a1e645c77.png" ]]; then
  cp "$CURSOR/SKYW4940-c5d6d15b-24c2-4f29-86c1-085a1e645c77.png" "$DST/tshirt-model-2.png"
  echo "Copied tshirt-model-2.png"
fi

# Or copy from Downloads if user moved them
DOWNLOADS="$HOME/Downloads"
for f in "$DOWNLOADS"/SKYW4704*.png "$DOWNLOADS"/SKYW4940*.png; do
  [[ -f "$f" ]] && [[ "$f" == *4704* ]] && cp "$f" "$DST/tshirt-model-1.png" && echo "Copied tshirt-model-1.png from Downloads"
  [[ -f "$f" ]] && [[ "$f" == *4940* ]] && cp "$f" "$DST/tshirt-model-2.png" && echo "Copied tshirt-model-2.png from Downloads"
done

ls -la "$DST"/tshirt-model*.png 2>/dev/null && echo "Done." || echo "Run this script to copy images. Source: Cursor assets or Downloads."
