# Claire Goce — Readymag Interactive Portfolio

GitHub Pages-ready static portfolio. No npm, React, or build step is required.

## What is included

- Editorial / Readymag-inspired portfolio layout
- Interactive UAAP horizontal rail
- Interactive social-media phone carousel
- Social/content videos autoplay inside the phone when selected
- Click-to-open original media lightbox
- Animated event-photography camera with TechFiesta: RESET prints flowing out
- Responsive layout for desktop and mobile

## Launch with GitHub Pages — step by step

### 1. Create a GitHub account

If you already have one, go to GitHub and sign in.

### 2. Create a new repository

1. Click the **+** button in the top-right corner of GitHub.
2. Choose **New repository**.
3. Give it a name, for example:
   `claire-goce-portfolio`
4. Set it to **Public** if you want the portfolio to be publicly accessible.
5. You do not need to add a README because this package already contains one.
6. Click **Create repository**.

### 3. Upload the website files

1. Open the new repository.
2. Click **Add file → Upload files**.
3. Open this portfolio ZIP on your computer and extract it first.
4. Open the extracted `Claire-Portfolio-Readymag` folder.
5. Select **everything inside that folder** — especially:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `assets/`
   - `.nojekyll` (if present)
   - `README.md`
6. Drag those files into GitHub's upload area.
7. Scroll down and click **Commit changes**.

**Important:** `index.html` must be in the repository root. Do not upload the outer ZIP folder itself as a single file, and do not leave `index.html` buried inside another folder.

### 4. Turn on GitHub Pages

1. In your repository, click **Settings**.
2. In the left sidebar, open **Pages**.
3. Under **Build and deployment**, choose:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main`
   - **Folder:** `/ (root)`
4. Click **Save**.

### 5. Wait for the deployment

GitHub normally needs a short moment to build and publish the site.

Return to **Settings → Pages**. GitHub will show the published website URL there.

It will usually look similar to:

`https://YOUR-GITHUB-USERNAME.github.io/claire-goce-portfolio/`

### 6. Open your portfolio

Click **Visit site** from the Pages settings, or open the URL GitHub gives you.

If you see the portfolio, you're live.

## If the site looks broken after uploading

Check these first:

1. Make sure `index.html` is in the repository root.
2. Make sure the entire `assets` folder was uploaded.
3. Make sure the filenames were not changed.
4. Wait a few minutes and hard-refresh the published page.
5. Open **Settings → Pages** and confirm the deployment has completed.

## Updating the portfolio later

To replace a photo, video, or page:

1. Keep the same filename/path when possible.
2. Upload the replacement into the same `assets` subfolder.
3. Commit the change.
4. GitHub Pages will automatically redeploy the site.

## Social Media / Content Creation

The interactive phone contains all supplied social/profile/content assets. The four video assets are H.264 MP4 files using `autoplay`, `muted`, `loop`, and `playsinline`, so they play directly inside the phone when their slide is selected instead of opening a separate page.

## Event Photography

The TechFiesta: RESET section is presented as an animated camera. The four supplied event photographs are animated as prints flowing out of the camera. Clicking a print opens the original media in the site's full-size viewer.
