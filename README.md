# Carrel Kumbirai — Wildlife Painting Website (Static HTML/CSS/JS)

## What you got
- Static website (no build tools required)
- Shared header + footer injected on every page via `assets/js/main.js`
- Simple "scroll story" order section on the homepage
- Styling in `assets/css/styles.css`
- Your uploaded images are in `assets/images/`

## Pages
- index.html
- gallery.html
- commissions.html
- about.html
- contact.html

## Edit header/footer site-wide
Open: `assets/js/main.js`
- `renderHeader()`
- `renderFooter()`
- WhatsApp number is at the top: `WHATSAPP_NUMBER`

## Edit the "Order Artworks" scroll section
Open: `index.html`
Search: `data-order-items=`
- It's a JSON array of slides (title, description, imageSrc, badge, enquiryTag)

## Run locally
- Double-click `index.html` (works)
- Or use a tiny local server for best consistency:
  - `python -m http.server 5500`
  - visit: http://localhost:5500

Generated: 2025-12-28 02:45 UTC
