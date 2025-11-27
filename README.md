# MUSICweb® Listing Manager

A simple, self-hosted record listing management system built with Next.js and deployed on Vercel.

## Features

- ✅ Create listings with album cover images
- ✅ All data saved locally in your browser
- ✅ Export listings as JSON
- ✅ Live preview of listings
- ✅ Mobile responsive
- ✅ Free hosting on Vercel

## Quick Start

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in (create account if needed)
2. Click the "+" icon in the top right → "New repository"
3. Name it: `musicweb-listings`
4. Choose "Public" (unless you prefer Private)
5. Click "Create repository"

### 2. Set Up Locally (First Time Only)
```bash
# Clone the repository (replace YOUR_USERNAME)
git clone https://github.com/YOUR_USERNAME/musicweb-listings.git
cd musicweb-listings

# Install dependencies
npm install

# Run locally
npm run dev
```

Visit `http://localhost:3000` in your browser

### 3. Push to GitHub
```bash
# Add all files
git add .

# Commit changes
git commit -m "Initial setup"

# Push to GitHub
git push origin main
```

### 4. Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign in with GitHub (or create account)
3. Click "Add New..." → "Project"
4. Import the `musicweb-listings` repository
5. Click "Deploy"

Done! Your site is now live.

## How to Use

### Adding a Listing

1. Fill in the form on the left:
   - Artist name
   - Album title
   - Format (Vinyl, CD, etc.)
   - Condition (M, NM, VG+, etc.)
   - Year
   - Record label
   - Your seller name
   - Price

2. Upload your album cover photo

3. Click "Preview" to see how it looks

4. Click "Add Listing"

### Exporting Your Listings

Click "Export as JSON" to download all your listings as a data file.

## How Data is Saved

Your listings are stored in your browser's local storage. This means:
- ✅ No server fees or costs
- ✅ No database to manage
- ✅ Your data is private
- ❌ Clearing browser data will delete listings (so export/backup regularly)

## Making Changes

To update the site after it's deployed:
```bash
# Make your changes locally
# Then:
git add .
git commit -m "Description of changes"
git push origin main
```

Vercel will automatically redeploy your changes!

## Support

For Vercel deployment help: https://vercel.com/docs
For Next.js help: https://nextjs.org/docs
