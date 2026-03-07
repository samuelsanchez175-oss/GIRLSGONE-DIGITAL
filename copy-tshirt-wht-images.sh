#!/usr/bin/env bash
# Copy white t-shirt model images into project assets for GitHub deployment.
# Run from project root: bash copy-tshirt-wht-images.sh

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DST="$SCRIPT_DIR/assets"
SRC="${CURSOR_ASSETS:-$HOME/.cursor/projects/Users-samuel-Desktop-CHATGPT-CREATED-FILES-GIRLS-gone-digital/assets}"

if [[ ! -d "$SRC" ]]; then
  echo "Source not found: $SRC"
  echo "Set CURSOR_ASSETS to the folder containing SKYW4704 and SKYW4940 images."
  exit 1
fi

cp "$SRC/SKYW4704-9de9d062-41df-470e-a30d-c2b08f4c24f4.png" "$DST/product-tshirt-wht-model-1.png"
cp "$SRC/SKYW4940-c5d6d15b-24c2-4f29-86c1-085a1e645c77.png" "$DST/product-tshirt-wht-model-2.png"
echo "Copied product-tshirt-wht-model-1.png and product-tshirt-wht-model-2.png to assets/"
ls -la "$DST/product-tshirt-wht-model-"*.png
