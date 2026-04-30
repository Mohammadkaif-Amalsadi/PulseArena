# Pulse Arena

React + Vite frontend for the FOG assessment.

## Local development

```powershell
npm install
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173`.

## Production build

```powershell
npm run build
```

## Deploy to Render

This repo includes [render.yaml](D:\Projects\VS Code\VidGame\render.yaml) for static hosting.

Render settings:

- Service type: `Static Site`
- Build command: `npm install && npm run build`
- Publish directory: `dist`

If you connect the GitHub repo to Render, it should auto-detect the config.

## Push to GitHub

Typical flow:

```powershell
git init
git add .
git commit -m "Initial public release"
git branch -M main
git remote add origin <your-public-github-repo-url>
git push -u origin main
```

## Notes

- The home page is separate from the playable pages.
- Tic tac toe and the grid game each have their own dedicated route.
- The launcher supports swipe navigation and theme changes based on the selected card.
