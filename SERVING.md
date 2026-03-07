# Viewing the site locally (fixes broken images)

If you open the HTML files by **double-clicking** them, images and links can break because the browser uses `file://` URLs and resolves paths differently.

**Fix: run a local web server** from this folder, then open the site in your browser via `http://localhost`.

## Option 1: Python (built in on Mac)

In Terminal, go to this project folder, then run:

```bash
cd "/Users/samuel/Desktop/CHATGPT CREATED FILES /GIRLS gone digital"
python3 -m http.server 8080
```

Then open in your browser:

- **Home:** http://localhost:8080/girls%20gone%20digital.html  
- Or: http://localhost:8080/ (redirects to home)

Stop the server with `Ctrl+C`.

## Option 2: Run the script

Double-click `start-local-server.command` (or in Terminal run `./start-local-server.command`). It will start the server and try to open the site in your browser.

## Check your images

Make sure these files exist so the product and shop pages show images:

- `assets/edits/edit1.png` (and optionally `edit1.jpg` as fallback)
- `assets/edits/edit2.png` (and optionally `edit2.jpg` as fallback)
- `assets/logo.png`
- `assets/homepage-reel.mp4`

If any are missing, add them or the browser will show broken image icons.
