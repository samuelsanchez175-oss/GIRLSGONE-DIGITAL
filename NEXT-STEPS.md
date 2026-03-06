# Next Steps to Go Live

**Your site is deployed at [https://girls-gone-digital.vercel.app](https://girls-gone-digital.vercel.app)**

The domain `girlsgone.digital` is added in Vercel. You only need to update GoDaddy DNS:

---

## Update GoDaddy DNS

1. Go to [GoDaddy](https://www.godaddy.com) → **My Products** → select `girlsgone.digital`
2. Click the **DNS** tab (not Products or Overview)
3. Add or update these records:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | 600 |
| A | www | 76.76.21.21 | 600 |

4. Remove any existing A records for `@` or `www` that point elsewhere
5. Save

---

## Optional: Push to GitHub (for auto-deploys)

To get automatic deploys when you update the site:

1. Create repo at [github.com/new](https://github.com/new) named `girls-gone-digital`
2. Run: `./push-to-github.sh YOUR_GITHUB_USERNAME`
3. In Vercel: **Settings** → **Git** → connect the GitHub repo

---

## Verify

- DNS propagation: a few minutes to 48 hours
- Visit [https://girlsgone.digital](https://girlsgone.digital) when ready
