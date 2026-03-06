# Next Steps to Go Live

Your project is committed and ready. Complete these steps to deploy:

---

## 1. Create GitHub repo and push

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `girls-gone-digital`
3. Public, no README → **Create repository**
4. In Terminal:
   ```bash
   cd "/Users/samuel/Desktop/CHATGPT CREATED FILES /GIRLS gone digital"
   chmod +x push-to-github.sh
   ./push-to-github.sh YOUR_GITHUB_USERNAME
   ```

---

## 2. Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Sign in with GitHub
3. Import `girls-gone-digital` repo
4. Click **Deploy**
5. Note your URL (e.g. `girls-gone-digital.vercel.app`)

---

## 3. Add domain in Vercel

1. Project → **Settings** → **Domains**
2. Add `girlsgone.digital`
3. Copy the DNS records Vercel shows

---

## 4. Update GoDaddy DNS

1. GoDaddy → your domain → **DNS** tab (not Products)
2. Add/update records per Vercel’s instructions, typically:
   - **A** record: `@` → `76.76.21.21`
   - **CNAME** record: `www` → `cname.vercel-dns.com`
3. Save

---

## 5. Wait and verify

- DNS propagation: a few minutes to 48 hours
- Visit [https://girlsgone.digital](https://girlsgone.digital) when ready
