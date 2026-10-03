# ARASAN HOLIDAYS — Premium Travel Agency Website

"Your Journey. Our Responsibility."

A production-ready, cinematic travel agency web application built with React 19, TypeScript, Vite, Tailwind CSS 4, and Motion.

---

## 🚀 Vercel Deployment Guide

This project is pre-configured with a dedicated `vercel.json` for 1-click deployment on Vercel.

### Method 1: Deploy via GitHub / GitLab / Bitbucket (Recommended)

1. Push this repository to your GitHub account:
   ```bash
   git add .
   git commit -m "Initial commit for Arasan Holidays"
   git push origin main
   ```
2. Log into [Vercel](https://vercel.com).
3. Click **"Add New..."** > **"Project"**.
4. Import your GitHub repository.
5. Vercel will auto-detect the configuration from `vercel.json`:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install --legacy-peer-deps` (Auto-configured via `vercel.json` and `.npmrc`)
6. Click **Deploy**. Your site will go live in less than 60 seconds with an SSL certificate and global CDN.

---

### Method 2: Deploy via Vercel CLI

1. Install Vercel CLI globally:
   ```bash
   npm i -g vercel
   ```
2. In the project root directory, run:
   ```bash
   vercel
   ```
3. For production deployment, run:
   ```bash
   vercel --prod
   ```

---

## ⚙️ Configuration Features Included for Vercel

- **SPA Routing Rewrites (`vercel.json`)**: Seamless routing support so reloads on any path (`/destinations`, `/packages`, `/about`, etc.) correctly resolve to `index.html` without 404 errors.
- **Cache Headers**: 1-year immutable caching for static bundled assets (`/assets/*`).
- **Security Headers**: `X-Content-Type-Options`, `X-Frame-Options`, and `X-XSS-Protection` headers included by default.
- **Responsive WebP/AVIF CDN Image Delivery**: Lightweight image assets optimized for mobile networks.
