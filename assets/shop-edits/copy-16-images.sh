#!/bin/bash
# Copies the 16 GIRLS GONE DIGITAL images into shop-edits and renames to edit1.png–edit16.png
# Run from project root or: bash assets/shop-edits/copy-16-images.sh

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DEST="$SCRIPT_DIR"
# Cursor workspace assets (where attached images were saved) – try relative then absolute
CURSOR_ASSETS_REL="$SCRIPT_DIR/../../../../.cursor/projects/Users-samuel-Desktop-CHATGPT-CREATED-FILES-GIRLS-gone-digital/assets"
CURSOR_ASSETS_ABS="${HOME}/.cursor/projects/Users-samuel-Desktop-CHATGPT-CREATED-FILES-GIRLS-gone-digital/assets"
# Fallback: same project assets (if images were moved here)
PROJECT_ASSETS="$SCRIPT_DIR/../"

declare -a FILES=(
  "Photo_Feb_25_2026__1_28_44_PM__13_-646d8388-e5d3-4cdb-a9b0-b832c0b57eac.png"
  "Photo_Feb_25_2026__1_28_44_PM__14_-abc1832e-9177-42ac-93f8-58aed873f2df.png"
  "Photo_Feb_25_2026__1_28_44_PM__6_-8bad12ba-c5f8-485c-9927-dae0e0e23cbf.png"
  "Photo_Jan_24_2026__3_29_34_PM__12_-b37f73fa-df9d-4ea3-839d-32c78e85adeb.png"
  "Photo_Feb_25_2026__1_28_44_PM__7_-e4656e5a-5c02-4227-868f-900ac83a350c.png"
  "Photo_Jan_24_2026__3_29_34_PM__10_-34db8f4d-b41c-4be8-8227-31a672329692.png"
  "Photo_Feb_13_2026__8_37_50_PM-f76c85dd-b74d-4cd9-9264-e69def4a8001.png"
  "Photo_Jan_18_2026__12_51_18_PM-41919e6c-657c-4989-8271-9a695b34f9f2.png"
  "Photo_Jan_24_2026__3_29_34_PM__16_-ffeee722-f88c-470f-913a-ce244c7bb1c2.png"
  "Photo_Feb_13_2026__8_39_58_PM-ec378cea-4653-4fda-9e2e-d4a064877564.png"
  "Photo_Feb_25_2026__1_28_44_PM__31_-8a45319e-556f-498e-982c-da851bb386cd.png"
  "Photo_Feb_13_2026__8_53_14_PM-116e53ab-9f5e-48f5-b450-d9aee5c029f3.png"
  "Photo_Feb_13_2026__9_17_01_PM-a31cf174-8808-4cd1-ba70-93c1811f6cb3.png"
  "Photo_Feb_13_2026__8_45_07_PM-9f49dc03-67fc-48f3-97d4-64743588dbbe.png"
  "Photo_Feb_13_2026__8_40_01_PM-dc2c3c1c-d17b-49d4-963c-38fa58c9e035.png"
  "Photo_Jan_18_2026__12_51_18_PM__3_-1f1c85a8-dd50-440f-8bc0-d156d106aec7.png"
)

SRC=""
[ -d "$CURSOR_ASSETS_REL" ] && [ -f "$CURSOR_ASSETS_REL/${FILES[0]}" ] && SRC="$CURSOR_ASSETS_REL"
[ -z "$SRC" ] && [ -d "$CURSOR_ASSETS_ABS" ] && [ -f "$CURSOR_ASSETS_ABS/${FILES[0]}" ] && SRC="$CURSOR_ASSETS_ABS"
[ -z "$SRC" ] && [ -d "$PROJECT_ASSETS" ] && [ -f "$PROJECT_ASSETS/${FILES[0]}" ] && SRC="$PROJECT_ASSETS"

if [ -z "$SRC" ]; then
  echo "Source folder not found. Put the 16 Photo_*.png files in assets/ or run from Cursor workspace."
  exit 1
fi

echo "Copying from $SRC to $DEST"
i=1
for f in "${FILES[@]}"; do
  if [ -f "$SRC/$f" ]; then
    cp "$SRC/$f" "$DEST/edit${i}.png"
    echo "  edit${i}.png"
    i=$((i+1))
  fi
done
echo "Done. $((i-1)) images in shop-edits."
ls -la "$DEST"/edit*.png 2>/dev/null || true
