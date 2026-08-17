# Peak Architects — website build

A static, multi-page site for **Peak Architects**, a RIBA Chartered architectural practice with
studios in Sheffield and the Hope Valley.

The layout and design system follow an agreed reference template; all copy, photography, project
data and team information belong to Peak Architects and were taken from their existing site.

## Running locally

No build step and no dependencies — it is plain HTML, CSS and JavaScript. Serve the folder over
HTTP (opening `index.html` from the filesystem will work, but a server matches production):

```bash
python3 -m http.server 4321
```

Then visit <http://localhost:4321>.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — hero, featured projects, about, showreel, sectors, recognition, team, journal, FAQ, contact |
| `projects.html` | Full portfolio — 44 projects with sector filters (`?cat=HERITAGE`) |
| `project.html` | Project detail template — driven by `?slug=` |
| `journal.html` | News index — 100 posts, category filters, load-more |
| `post.html` | Post detail template — driven by `?slug=` |
| `about.html` | Practice story, services, sectors, team grid, awards |
| `contact.html` | Studio details, enquiry form, condensed FAQ |
| `thank-you.html` | Form success page |
| `404.html` | Not found |
| `privacy.html` / `terms.html` | Legal pages |

## Architecture

| File | Role |
| --- | --- |
| `styles.css` | Design system (custom properties) and all component styles |
| `site.js` | Shared shell (nav + footer injection), components, and one controller per page |
| `data.js` | Generated content: 44 projects and 100 journal posts |

Each page declares its controller on the body tag, and `site.js` routes to it:

```html
<body data-page="projects">
```

`data-nav="overlay"` makes the navigation transparent over a full-bleed hero (used on the home
page only); every other page gets the solid sticky variant.

### Design tokens

Defined as custom properties on `:root` in `styles.css`:

- **Type** — Inter Tight (headings), Instrument Serif italic (accents), Inter (body/UI)
- **Colour** — ink `#16232B`, muted `#4F5F69`, paper `#F8F8F8`, accent `#EB5D3E` (Peak terracotta)
- **Layout** — 1356px container, 20px grid gap, 20px card radius

## Before launch

Two items need sign-off from the practice:

1. **Contact form** — set `FORM_ENDPOINT` in `site.js` to a form service URL (Formspree, Basin,
   Netlify Forms) to enable real submissions. Until then the form falls back to opening a
   pre-filled email to `info@peakarchitects.co.uk`.
2. **Privacy policy** — `privacy.html` is a structured shell. The policy currently published on the
   live site still contains unfilled template placeholders, so approved wording is required.

Also outstanding: a showreel video (the play button currently opens a project gallery), and real
client testimonials if the Recognition section is to become a Reviews section.

## Images

Images are referenced from the existing `peakarchitects.co.uk` media library. Before going live,
move them onto the production host so the site does not depend on the old server.
