#!/bin/bash
cd "$(dirname "$0")"
echo "Starting server at http://localhost:8080"
echo "Open: http://localhost:8080/girls%20gone%20digital.html"
echo "Press Ctrl+C to stop"
open "http://localhost:8080/girls%20gone%20digital.html" 2>/dev/null || true
python3 -m http.server 8080
