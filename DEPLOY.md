# Deploy Girls Gone Digital to Vercel + Connect GoDaddy Domain

This guide walks you through deploying your site to Vercel and connecting your GoDaddy domain.

---

## Part 1: Deploy to Vercel

### Option A: Deploy via GitHub (recommended)

1. **Create a GitHub account** (if you don’t have one): [github.com](https://github.com)

2. **Create a new repository**
   - Go to [github.com/new](https://github.com/new)
   - Name it something like `girls-gone-digital`
   - Choose **Public**
   - Do **not** initialize with a README
   - Click **Create repository**

3. **Push your project to GitHub**
   - Open Terminal and run:
   ```bash
   cd "/Users/samuel/Desktop/CHATGPT CREATED FILES /GIRLS gone digital"
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/girls-gone-digital.git
   git push -u origin main
   ```
   - Replace `YOUR_USERNAME` with your GitHub username.

4. **Import the project in Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in (use GitHub if possible).
   - Click **Add New…** → **Project**.
   - Import your `girls-gone-digital` repo.
   - Vercel will detect it as a static site. Leave settings as default.
   - Click **Deploy**.
   - After deployment, you’ll get a URL like `girls-gone-digital.vercel.app`.

### Option B: Deploy via Vercel CLI

1. **Install the Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd "/Users/samuel/Desktop/CHATGPT CREATED FILES /GIRLS gone digital"
   vercel
   ```
   - Follow the prompts and log in if needed.
   - Your site will be deployed and you’ll get a URL.

---

## Part 2: Connect Your GoDaddy Domain

1. **Add the domain in Vercel**
   - Open your project on [vercel.com/dashboard](https://vercel.com/dashboard).
   - Go to **Settings** → **Domains**.
   - Click **Add** and enter your domain (e.g. `girlsgonedigital.com`).
   - Vercel will show DNS instructions.

2. **Update DNS in GoDaddy**
   - Log in to [GoDaddy](https://www.godaddy.com) → **My Products**.
   - Click your domain → **DNS** or **Manage DNS**.

   **Option A – Use Vercel nameservers (simplest)**
   - In Vercel’s domain setup, copy the nameservers (e.g. `ns1.vercel-dns.com`, `ns2.vercel-dns.com`).
   - In GoDaddy: **Nameservers** → **Change** → **Custom**.
   - Replace existing nameservers with Vercel’s.
   - Save. Propagation can take up to 48 hours (often much less).

   **Option B – Keep GoDaddy nameservers**
   - In Vercel’s domain setup, choose **Configure with DNS records**.
   - Add the records Vercel shows (usually an **A** record pointing to `76.76.21.21` and/or a **CNAME** for `www`).
   - In GoDaddy DNS, add those records.
   - Save and wait for propagation.

3. **Verify**
   - Vercel will issue an SSL certificate automatically.
   - When DNS has propagated, your domain will load over HTTPS.

---

## Summary

| Step | Action |
|------|--------|
| 1 | Push project to GitHub |
| 2 | Import repo in Vercel and deploy |
| 3 | Add your domain in Vercel → Domains |
| 4 | Update DNS in GoDaddy (nameservers or records) |
| 5 | Wait for propagation and verify |

---

## Notes

- **Automatic deploys**: With GitHub, every push to `main` triggers a new deployment.
- **Preview URLs**: Each deployment gets a unique URL for testing.
- **SSL**: Vercel provides free HTTPS.
- **`vercel.json`**: The project includes a `vercel.json` that serves your homepage at the root URL.
