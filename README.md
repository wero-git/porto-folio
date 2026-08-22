# porto-folio

Static portfolio for GitHub Pages, built with HTML, CSS and vanilla JavaScript.

## Main pages

- `index.html`: profile, education, skills and contact
- `experiences.html`: professional experience with automatic summary counters
- `projects.html`: project categories and project cards
- `claims-case-study.html`: reusable visual structure for case studies
- `document-viewer.html`: read-only presentation layer for case-study resources

## Content-driven counters

The Experience summary is calculated automatically from:

- each `.experience-item[data-experience-category]`;
- each `.experience-responsibilities li`;
- each unique `.experience-tools span` value.

The Claims summary is calculated from the corresponding `data-case-*` attributes.

## Adding another case study

Copy `claims-case-study.html`, keep the reusable classes from `css/cases.css`, and update the page content. Add `data-navigation-parent="projects.html"` to the `<body>` so Projects remains active in the navigation.

## Favicon

The favicon is stored in `assets/icons/favicon.svg`, with PNG fallbacks for browsers and mobile devices. Replace the SVG and regenerate the two PNG files if the visual identity changes.

## Project resources

Deliverable links open `document-viewer.html` in a new tab. Add new resources to the whitelist in `js/document-viewer.js`; do not link source files directly from case-study cards.

The CV button expects `assets/documents/CV_Winston_Engamba.pdf`. Add the final PDF at this path before publishing if it is not already present.
