# 🔧 Git & Vercel Deployment Guide

## Initialize Git Repository Locally

1. Open terminal/command prompt in your project folder
2. Initialize Git:
   ```bash
   git init
   ```

3. Add all files:
   ```bash
   git add .
   ```

4. Make your first commit:
   ```bash
   git commit -m "Initial commit: Nirgun Washers website"
   ```

## Push to GitHub

### Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `nirgun-washers` or any name you prefer
3. Add description: "Professional laundry website"
4. Choose "Public" or "Private"
5. Click "Create repository"

### Step 2: Connect Local to Remote

After creating the repository, GitHub will show you commands. Run:

```bash
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/nirgun-washers.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

## Deploy to Vercel

### Option 1: Via GitHub (Recommended - Automatic)

1. Go to https://vercel.com
2. Sign up with GitHub (if not already signed up)
3. Click "New Project"
4. Select your GitHub repository `nirgun-washers`
5. Vercel will auto-detect Vite settings
6. Click "Deploy"
7. Wait for deployment to complete
8. Your live URL will be shown! 🎉

### Option 2: Via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts
4. Your site will be live!

## Continuous Deployment

After setting up GitHub → Vercel:
- Every time you push to GitHub, Vercel automatically deploys
- Your site updates instantly!

### To update your site:

```bash
# Make changes to your code
# Then:
git add .
git commit -m "Update: [describe changes]"
git push
```

Vercel will automatically deploy the changes.

## Your Live URLs

After deployment, you'll get:
- **Production URL**: `https://your-project-name.vercel.app`
- **GitHub URL**: `https://github.com/your-username/nirgun-washers`

## Environment Variables (if needed)

Create `.env` file in root (but don't commit it):

```
# .env
VITE_API_URL=https://your-api.com
```

Add `.env` to `.gitignore` (already done in our setup)

## Useful Git Commands

```bash
# Check status
git status

# View commit history
git log

# View recent changes
git diff

# Undo last commit (keep changes)
git reset --soft HEAD^

# Pull latest from GitHub
git pull origin main

# View all branches
git branch -a
```

## Custom Domain (Optional)

If you want a custom domain:

1. Buy domain from GoDaddy, Namecheap, etc.
2. In Vercel dashboard → Project Settings → Domains
3. Add your custom domain
4. Update DNS settings at your domain provider
5. Vercel will provide DNS records to add

## Troubleshooting

**Issue**: Permission denied when pushing
**Solution**: 
```bash
git remote set-url origin git@github.com:YOUR-USERNAME/nirgun-washers.git
# Set up SSH key on GitHub
```

**Issue**: Vercel build fails
**Solution**: 
- Check build logs in Vercel dashboard
- Ensure `npm run build` works locally
- Check `vite.config.js` configuration

**Issue**: Can't find my deployed site
**Solution**: 
- Check Vercel dashboard → Projects
- Look for your project deployment status
- Verify you pushed to correct branch (main)

## Verify Everything Works

1. Visit your Vercel URL
2. Check all pages load
3. Test WhatsApp QR code
4. Test contact form
5. Check mobile responsiveness

## Next Steps

1. ✅ Initialize Git locally
2. ✅ Create GitHub repository
3. ✅ Push code to GitHub
4. ✅ Deploy to Vercel
5. ✅ Test live site
6. ✅ Update contact info on live site
7. ✅ Share URL with customers!

---

**Your website is now live on the internet! 🌍**
