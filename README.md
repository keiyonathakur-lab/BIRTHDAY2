# Birthday Keepsake Site

This is a static birthday website built with plain HTML, CSS, and JavaScript.

## Files

- `index.html`
- `styles.css`
- `script.js`

## Deploy On GitHub Pages

1. Create a new GitHub repository.
2. Upload these project files to the repository root.
3. Go to the repository `Settings`.
4. Open `Pages`.
5. Under `Build and deployment`, choose `Deploy from a branch`.
6. Select the `main` branch and the `/ (root)` folder.
7. Save and wait for GitHub Pages to publish the site.

Your site will be available at:

`https://<your-username>.github.io/<repo-name>/`

## Notes

- The countdown gate unlocks at `12:00 AM IST` on `April 20, 2026`.
- Photo uploads in the polaroids only exist in the viewer's browser session. They are not saved online.
- The CSS currently prefers the `Saverfill` font if it is installed locally.

## Optional: Add The Saverfill Font File

If you get a `Saverfill` font file later:

1. Create a folder named `fonts`
2. Put the font file inside it, for example `fonts/Saverfill.ttf`
3. Add an `@font-face` block near the top of `styles.css`

Example:

```css
@font-face {
  font-family: "Saverfill";
  src: url("./fonts/Saverfill.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
```
