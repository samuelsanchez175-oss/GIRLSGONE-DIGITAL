#!/bin/bash
# Run this AFTER creating the repo at https://github.com/new (name: GIRLSGONE-DIGITAL)
# Usage: ./push-to-github.sh YOUR_GITHUB_USERNAME

USERNAME="${1:-samuelsanchez175-oss}"
cd "$(dirname "$0")"

git remote remove origin 2>/dev/null
git remote add origin "https://github.com/${USERNAME}/GIRLSGONE-DIGITAL.git"
git push -u origin main

echo ""
echo "Done! Next: Go to vercel.com/new and import this repo."
