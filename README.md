# GTZ Plumbing Service - Website Redesign Project

A premium, content-rich, and fully search-engine-optimized multi-page website designed and built for **GTZ Plumbing Service** (based in Orange County, CA).

---

## 📂 Project Structure & Pages

The website is split into 7 distinct, lengthy pages linked via a responsive navigation bar:

1. **Home (`index.html`)**
   - Premium hero section featuring a professional plumber Unsplash image on the right.
   - **Primary Plumbing Solutions**: Dark-theme grid hosting 6 cards covering residential/commercial categories.
   - **Why Choose Us**: 2x2 grid emphasizing values of experience, weekend dispatch, transparent estimates, and satisfaction.
   - **Services We Provide**: Complete grid of 15 standard services with custom Unsplash image headers.
   - Testimonial carousel and collapsible FAQ accordion.
2. **Services (`services.html`)**
   - Deep-dive breakdowns for Gas Lines, Drain Clearing, Exterior Drainage, and Fixtures.
   - Step-by-step dispatch workflow and a dedicated FAQ section.
3. **Locations (`locations.html`)**
   - Service area coverage breakdown, statistics boxes (average arrival times), dispatcher forms, and localized coverage map.
4. **Gallery (`gallery.html`)**
   - Interactive project showcase with dynamic category filters (All, Residential, Commercial, Gas, Drain).
5. **Blog (`blog.html`)**
   - Plumbing advice feed containing 6 guide posts on leak detection, tankless water heaters, and storm safety.
6. **About (`about.html`)**
   - Detail-rich timeline tracking the company's milestones from 2011 to 2026, values grid, safety credentials, and service areas.
7. **Contact (`contact.html`)**
   - Direct contact channel cards (phone, hours, email), inline booking forms, and dispatch coverage maps.

---

## 🎨 Design System & Styling Guidelines

All layouts are styled using a modern vanilla design system defined in [`styles.css`](styles.css):

*   **Color Tokens**:
    *   `--primary`: Deep Royal Blue (`#015491`)
    *   `--primary-light`: Sky Blue Accent (`#23a5d9`)
    *   `--secondary`: Safety Orange (`#e34205`)
    *   `--dark-indigo`: Deep Rich Slate (`#071727`)
    *   `--light-bg`: Slate Light Gray (`#f8fafc`)
*   **Typography**:
    *   Headings: `Montserrat` (Sans-serif)
    *   Body text: `Plus Jakarta Sans` (Sans-serif)
*   **Aesthetics**: Glassmorphism translucent panels, smooth hover scale indicators, and subtle pulse indicators for CTAs.
*   **Responsiveness**: Enforces vertical card stacking, custom 2x2 grids, and compressed spacing overrides under `@media (max-width: 768px)` to ensure flawless rendering on mobile devices down to `320px` width.

---

## 🚀 Local Development Setup

The project uses `browser-sync` to host pages locally with hot-reloading support:

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Start Hot-Reloading Server**:
    ```bash
    npm run dev
    ```
    This launches a server at **`http://localhost:3000`** and watches for any HTML, CSS, or JS file updates.

---

## 🔍 SEO & Search Indexing

The project incorporates Google search compliance standards:
*   **Single `<h1>` Tag**: Used once per subpage inside sub-hero titles.
*   **Robots Directive**: [`robots.txt`](robots.txt) configured to allow search crawlers.
*   **XML Sitemap**: [`sitemap.xml`](sitemap.xml) includes all 7 pages with appropriate priorities (`1.0` for Home, `0.9` for Contact, `0.8` for Services/Locations).
*   **Meta Descriptions**: Page-specific, unique description metadata for maximum click-through rates.
