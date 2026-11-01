# Cate Porterfield — Counselling Psychology Practice

A professional, calming, and fully responsive website for Cate Porterfield's counselling psychology practice.

## Features
- **Zen Minimalist Aesthetic:** Calming color palette (Sage, Charcoal, Cream) tailored for mental health care.
- **Fully Responsive:** Tested and optimized across mobile, tablet, and desktop screens.
- **Interactive Experience:** Smooth navigation, FAQ accordion, and custom cursor animations.
- **Contact Integration:** Ready-to-use contact form powered by Formspree.
- **Production Ready:** Optimized asset structure with zero duplicate or unnecessary files.

## Project Structure
```text
Cate P - Github/
├── .gitignore
├── README.md
├── vercel.json
├── index.html
├── styles.css
├── script.js
├── favicon.png
├── porterfield-icon.png
├── logo-porterfield.png
├── logo-porterfield-footer.png
└── images/
    ├── cate-portrait.jpg
    └── hero-relaxing.png
```

## How to Deploy on Vercel

### Option 1: Via GitHub (Recommended)
1. Push this folder to a new GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Cate Porterfield website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com).
3. Click **Add New...** > **Project**.
4. Import your newly created GitHub repository.
5. Keep default settings (Framework Preset: *Other*) and click **Deploy**.

### Option 2: Via Vercel CLI
```bash
npm install -g vercel
vercel
```

## Local Preview
To preview the website locally:
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.
