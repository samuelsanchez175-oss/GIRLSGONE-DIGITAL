#!/bin/bash
# Run the site locally for faster development
# Open http://localhost:3000 in your browser
# Homepage: http://localhost:3000/girls%20gone%20digital.html

cd "$(dirname "$0")"

echo "Starting local server at http://localhost:3000"
echo "Homepage: http://localhost:3000/girls%20gone%20digital.html"
echo "Press Ctrl+C to stop"
echo ""

# Try npx serve first, fall back to Python
if command -v npx &>/dev/null; then
  npx serve . -l 3000
elif command -v python3 &>/dev/null; then
  python3 -m http.server 3000
elif command -v python &>/dev/null; then
  python -m http.server 3000
else
  echo "Install Node.js (for npx serve) or Python to run locally."
  exit 1
fi
