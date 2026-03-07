#!/usr/bin/env bash
# Copy 15 carousel images from Cursor project assets to assets/shop-edits with simple names.
# Run from project root: bash copy-carousel-images.sh

set -e
CURSOR_ASSETS="${CURSOR_ASSETS:-$HOME/.cursor/projects/Users-samuel-Desktop-CHATGPT-CREATED-FILES-GIRLS-gone-digital/assets}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DST="$SCRIPT_DIR/assets/shop-edits"
mkdir -p "$DST"

declare -a MAP=(
  "Photo_Feb_25_2026__1_28_44_PM__14_-4782f75e-7620-4e9d-82a3-2b8d54df85d1.png:carousel1.png"
  "Photo_Jan_24_2026__3_29_34_PM__16_-57d0a246-eb9f-4e6c-a0ca-d8ff689ed30c.png:carousel2.png"
  "Photo_Feb_25_2026__1_28_44_PM__7_-af31f110-719e-4f1e-9149-29d9ad673316.png:carousel3.png"
  "Photo_Jan_24_2026__3_29_34_PM__12_-8b261a96-562e-4fff-bcc0-efa408006a55.png:carousel4.png"
  "Photo_Jan_18_2026__12_51_18_PM-c5fd8155-d001-4546-82d7-10da4310f2ad.png:carousel5.png"
  "Photo_Jan_24_2026__3_29_34_PM__10_-74c2b90a-ecd4-429c-a21d-adb7f6117ae0.png:carousel6.png"
  "Photo_Feb_25_2026__1_28_44_PM__31_-901c455e-406f-422e-aac9-da9b5d3b4871.png:carousel7.png"
  "Photo_Feb_06_2026__8_03_09_PM-a5b2915b-a229-4735-84b8-4d5c4d2de608.png:carousel8.png"
  "Photo_Feb_13_2026__8_21_12_PM-7bdcfa8f-79ff-4d80-9857-a13dd089d6a4.png:carousel9.png"
  "Photo_Feb_13_2026__8_21_06_PM-ec15d6cc-ad3f-4899-a9d0-0f96b66a17e5.png:carousel10.png"
  "Photo_Feb_13_2026__8_37_50_PM-93dc01bd-2792-4c3a-88f6-e0e963efbaf5.png:carousel11.png"
  "Photo_Feb_13_2026__9_17_01_PM-4b15bd95-7956-4929-aee2-a4c8381b57d9.png:carousel12.png"
  "Photo_Feb_13_2026__8_39_58_PM-74e60dc3-1f5b-49f7-b227-60adb28e5b8c.png:carousel13.png"
  "Photo_Jan_18_2026__12_51_18_PM__3_-ea0850fc-6960-4e5e-b481-102a5049004b.png:carousel14.png"
  "Photo_Feb_13_2026__8_53_14_PM-82ed0ebd-402e-40fb-92e7-53cba34c8bc7.png:carousel15.png"
)

for entry in "${MAP[@]}"; do
  src="${entry%%:*}"
  dest="${entry##*:}"
  if [[ -f "$CURSOR_ASSETS/$src" ]]; then
    cp "$CURSOR_ASSETS/$src" "$DST/$dest"
    echo "Copied $dest"
  else
    echo "Skip (not found): $src" >&2
  fi
done
echo "Done. Check $DST"
