# ⚡ Quick Deploy Commands

## 🔒 Security Check Before Pushing
```bash
# Verify .env is NOT tracked
git status
# Should NOT see .env in the list
```

## 📤 Push to GitHub

### First Time:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/craftuary.git
git branch -M main
git push -u origin main
```

### Updates:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

## 🚀 Vercel Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

```
MYSQL_HOST=ghvghv
MYSQL_PORT=3306
MYSQL_USER=hgghjgv
MYSQL_PASSWORD=gughbj.
MYSQL_DATABASE=hgvhgjv
PUBLIC_WEBSITE_URL=https://your-project.vercel.app
```

## ✅ Post-Deploy Checklist

- [ ] Environment variables added in Vercel
- [ ] Remote MySQL enabled in Hostinger (use `%` for all IPs)
- [ ] Site accessible at Vercel URL
- [ ] Themes page loads: `/themes`
- [ ] Real data showing (not mock data)

## 🆘 If Themes Show Mock Data

1. Check Vercel Function Logs
2. Enable Remote MySQL in Hostinger with `%`
3. Verify environment variables in Vercel
4. Redeploy in Vercel Dashboard

---

**That's it!** Your site will be live at: `https://your-project.vercel.app` 🎉
