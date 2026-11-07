# A Real Online Store — HTML, CSS & JavaScript

Converted from the supplied WordPress theme and setup catalogue. Original homepage layout, colours, copy and all 57 local product images retained. No WordPress, PHP, database, npm install or build step is required.

## VS Code mein kaise chalana hai

1. ZIP ko Extract All karein.
2. VS Code kholein → File → Open Folder → `a-real-online-store` folder select karein.
3. `index.html` par right-click → Open with Live Server. Agar option na ho, VS Code Extensions se Live Server install karein.
4. Aap `index.html` ko browser mein double-click se bhi khol sakte hain. Product data local JavaScript mein hai; fetch/server ki dependency nahi.

## GitHub Pages par deploy

1. GitHub par apne account mein ek new repository banayein, example `a-real-online-store`.
2. Repository → Add file → Upload files. Extracted folder ke ANDAR ki files aur assets folder upload karein. `index.html` repository ki root mein hona chahiye, extra nested folder mein nahi.
3. Commit changes karein.
4. Repository Settings → Pages → Build and deployment → Source: Deploy from a branch.
5. Branch: main, folder: / (root), phir Save.
6. Deployment complete hone par Pages section mein live URL milega: `https://YOUR-USERNAME.github.io/a-real-online-store/`.

Alternative: VS Code terminal mein, Git installed hone ke baad (YOUR-USERNAME replace karein):

```bash
git init -b main
git add .
git commit -m "Add static online store"
git remote add origin https://github.com/YOUR-USERNAME/a-real-online-store.git
git push -u origin main
```

Agar Git identity maange, pehle apna `git config user.name` aur `git config user.email` set karein. Existing remote/repository ho to commands repeat karne se pehle `git status` check karein.

## Files edit karna

- `index.html`: homepage text, sections and links.
- `styles.css`: original styling plus responsive static-store additions.
- `app.js`: category filters, search, sorting, product dialogs and saved bag.
- `catalog.js`: browser ka active product/category data. Product names, images aur verified details yahan edit karein.
- `catalog.json`: original catalogue reference. Sirf is JSON ko edit karne se website update nahi hogi; matching changes `catalog.js` mein bhi karein.
- `assets/`: 57 original product photos.

## Working features

All 10 categories (including two currently empty categories), 57 product previews, category filtering, name search, A–Z/Z–A sorting, product details, saved bag, remove from bag, localStorage persistence where browser permits, responsive navigation/layout, keyboard-accessible dialogs.

## Original data aur limitations

The supplied catalogue contains DRAFT product records, provisional descriptions and no prices, currency, stock or verified specifications. This conversion exposes them as catalogue previews with confirmation notices. Review the source images, descriptions and rights before publishing a commercial store.

Saved bag is a local favourites list, not a submitted order. There is no real checkout, payment gateway, login/account, stock synchronization, order database or admin dashboard. GitHub Pages hosts static files only; those operations require a backend or external ecommerce service. No orders or contact messages are sent by this project. Pinterest contact/source links are retained from the supplied package.

The package contains theme defaults, not a database export or screenshot of an installed site. Customizations saved only in a live WordPress database were not provided and cannot be recovered from this ZIP.
