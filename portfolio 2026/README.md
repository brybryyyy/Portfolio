# Portfolio

A static portfolio site (HTML, CSS, JavaScript). No build step, no dependencies.

## Files

- `index.html`: your name, about text, skills, education, contact
- `projects.js`: your 3 projects and their screens (edit this for the project section)
- `styles.css`: colors, layout, animations
- `script.js`: scroll effects and the screens viewer
- `assets/`: your images

## 1. Fill in your details

Open `index.html` and replace everything in `[square brackets]`: name, year level, city, email, phone, LinkedIn, school names and years.

## 2. Add your photo

Put your photo at `assets/profile.png` or `assets/profile.jpg` (either name works). A cut-out PNG with a transparent background looks best, because it blends into the giant PORTFOLIO text. A portrait with a dark or plain background also works.

## 3. Add your projects (screens only, no live links)

Open `projects.js`. For each project, set the title, type, your role, tools, and a short summary.

Then add your images:

```
assets/project-1/cover.jpg          (card image)
assets/project-1/01-login.jpg       (screens shown in the viewer)
assets/project-1/02-dashboard.jpg
...
```

Do the same for `project-2` and `project-3`. Match the file names in `projects.js`, or change the names there. Add or remove lines in `screens` to change how many pages each project shows.

When a visitor clicks a project, they see only these images, one by one, with arrows, thumbnails and your notes. There is no link to the live system. Anyone can still take a screenshot of what is on screen, so only upload pages you are comfortable showing, and hide private data (names, emails, real records) in your screenshots.

## 4. Change the colors

At the top of `styles.css`, change `--blue`, `--blue-l` and `--bg`.

## Preview locally

Open `index.html` in your browser, or run `npx serve` in this folder.

## Deploy on Vercel

1. Create a GitHub repository and upload these files (keep `index.html` at the top level).
2. Go to vercel.com, choose Add New Project, and import the repository.
3. Framework Preset: Other. Leave Build Command and Output Directory empty. Click Deploy.
4. Every push to GitHub redeploys the site automatically.

You can also deploy without GitHub: run `npx vercel` in this folder.
