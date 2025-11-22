# Deployment Guide: The Obsidian Archives

This guide outlines the professional deployment workflow using **Git** and **Netlify** (or Vercel). This ensures continuous integration/deployment (CI/CD) and proper SSL handling.

## Prerequisites
- A [GitHub](https://github.com/) account.
- A [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/) account.
- Git installed locally.

## Step 1: Initialize Git Repository
If you haven't already, initialize a git repository in the project folder:

```bash
git init
git add .
git commit -m "Initial commit: The Obsidian Archives"
```

## Step 2: Push to GitHub
1.  Create a **new repository** on GitHub (e.g., `obsidian-archives-ctf`).
2.  Follow the instructions to push your local code:

```bash
git remote add origin https://github.com/YOUR_USERNAME/obsidian-archives-ctf.git
git branch -M main
git push -u origin main
```

## Step 3: Connect to Netlify (Recommended)
1.  Log in to your Netlify dashboard.
2.  Click **"Add new site"** -> **"Import from an existing project"**.
3.  Select **GitHub**.
4.  Authorize Netlify and choose your `obsidian-archives-ctf` repository.
5.  **Build Settings**:
    - **Build Command**: `npm run build`
    - **Publish Directory**: `dist`
6.  Click **"Deploy Site"**.

## Step 4: Professional Configuration (Optional)
To make the "Level 3: Interception" challenge work realistically with server-side headers, you can add a `netlify.toml` file to your project root:

**File: `netlify.toml`**
```toml
[[headers]]
  for = "/api/heartbeat"
  [headers.values]
    X-Secret-Flag = "FLAG{HEADERS_CAN_BE_MANIPULATED}"
```

*Note: Since our current implementation simulates this in the client-side `fetch` for the static demo, this step is optional but recommended for a "real" backend feel if you expand the project.*

## Step 5: Custom Domain
1.  In Netlify, go to **Domain Management**.
2.  Add your custom domain (e.g., `obsidian-archives.com`).
3.  Follow the DNS configuration steps provided by Netlify.

## Verification
Once deployed, visit your live URL.
- Check that the "typing effect" on the landing page works.
- Verify that the "Level 6" image loads correctly.
- Test the `mailto` button on the victory screen.

**Mission Complete.**

---

## Option 2: Manual Deployment (VPS / Nginx)
If you prefer a "hardcore" setup (DigitalOcean, Linode, AWS) or want to manage your own server:

### 1. Build Locally
Run `npm run build` on your machine. This creates a `dist` folder.

### 2. Provision Server
- Get a Linux VPS (Ubuntu 20.04/22.04 recommended).
- SSH into your server: `ssh root@your-server-ip`

### 3. Install Nginx
```bash
sudo apt update
sudo apt install nginx -y
```

### 4. Upload Files
Use `scp` to upload your `dist` folder to the server:
```bash
scp -r dist/* root@your-server-ip:/var/www/html/
```

### 5. Configure Nginx (for React Router)
React Router needs a special config to handle page refreshes.
Edit the config: `nano /etc/nginx/sites-available/default`

Update the `location /` block:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 6. Restart Nginx
```bash
sudo systemctl restart nginx
```

### 7. SSL (HTTPS)
Install Certbot for free HTTPS:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx
```

Your CTF is now live on your own "proper" server.
