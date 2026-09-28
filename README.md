# Lucky Tour & Travel — MERN website

React + Vite + Tailwind (client) and Express + MongoDB (server). Design tokens follow the Stitch "Alpine Mist & Cedar" system.

## Run locally
```bash
cd server && cp .env.example .env   # set MONGO_URI
npm install && npm run dev          # http://localhost:5000/api/health
cd ../client && cp .env.example .env
npm install && npm run dev          # http://localhost:5173
```

## Before launch (business info needed)
- `VITE_WHATSAPP_NUMBER` — WhatsApp buttons stay hidden until this is set (digits only, e.g. 919817980599).
- `VITE_GOOGLE_BUSINESS_URL` and `VITE_GOOGLE_MAPS_EMBED_URL` — from the Google Business Profile (Share > Embed a map).
- `VITE_SITE_URL` — the live domain. Used for canonicals, sitemap.xml, robots.txt and JSON-LD.
- Photos: drop real images in `client/public/images/`, then set `image` in `src/data/content.js` and `HERO_IMAGE` in `src/components/Hero.jsx`. Until then, an inline SVG mountain scene is used. Suggested names: `himachal-taxi-service.jpg`, `shimla.jpg`, `manali.jpg`, `dharamshala.jpg`, `maruti-suzuki-ertiga.jpg`.
- Confirm railway/airport transfers, extra vehicles and extra destinations before adding them to `src/data/content.js`.
- Review Privacy Policy and Terms text with the owner.

## Deploy
### MongoDB Atlas
1. Create a free cluster, then Database Access > add a user with a strong password.
2. Network Access > allow `0.0.0.0/0` (Render uses changing IPs).
3. Connect > Drivers > copy the string, add a DB name: `mongodb+srv://USER:PASS@cluster.mongodb.net/lucky-tour?retryWrites=true&w=majority`.

### Backend on Render
1. Push this repo to GitHub. Render > New > Web Service > pick the repo.
2. Root Directory `server`, Build `npm install`, Start `npm start`.
3. Env vars: `MONGO_URI`, `CLIENT_URL` (comma-separated: your Vercel URL and custom domain, no trailing slash). Render sets `PORT`.
4. Check `https://YOUR-API.onrender.com/api/health`.

### Frontend on Vercel
1. Vercel > Add New Project > pick the repo, Root Directory `client`, Framework Vite.
2. Build `npm run build`, Output `dist` (`vercel.json` handles SPA routing).
3. Env vars: `VITE_API_URL` (Render URL), `VITE_SITE_URL`, `VITE_WHATSAPP_NUMBER`, `VITE_GOOGLE_MAPS_EMBED_URL`, `VITE_GOOGLE_BUSINESS_URL`.
4. Settings > Domains > add your domain and set the DNS records Vercel shows. Then update `CLIENT_URL` on Render.
5. Submit `https://YOUR-DOMAIN/sitemap.xml` in Google Search Console.

## Notes
- Free Render instances sleep; the first enquiry after idle may be slow. The form shows a loading state and the phone number on error.
- This is a client-rendered SPA. Google renders JS, but for the strongest SEO consider adding prerendering (e.g. `vite-plugin-prerender`) later.
- Enquiries are stored in the `enquiries` collection. No admin UI or email/SMS notification is included yet.
