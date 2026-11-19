# Sparkforge Technologies — Corporate Website

Phase 1 corporate website built with Next.js App Router, TypeScript and Tailwind CSS.

## Pages
- Home, About, Services overview and seven service division pages
- Projects gallery with category filtering and keyword search
- Individual project case studies
- Technology ecosystem, Contact, enquiry confirmation, Privacy Policy and Terms of Service
- Responsive navigation, metadata, sitemap, robots rules and 404 page
- Interactive exploded-system architecture section

## Local development
```bash
npm install
npm run dev
```

## Validation
```bash
npm run typecheck
npm run lint
npm run build
```

## Enquiry form
The project enquiry form is configured for Netlify Forms using a named POST form, a confirmation route and a honeypot field. Netlify Forms processing has been enabled on the Netlify site. Before relying on it for live leads, verify a real test submission from the deployed preview, confirm where submissions appear in the Netlify dashboard, check free-tier limits, and configure an email notification to the Sparkforge business inbox if supported by the current account. The form does not depend on n8n. A self-hosted n8n workflow can be added later when Sparkforge has a separate VPS.

## Brand assets
The supplied approved moodboard is the source of truth for the logo, crystal, color palette and typography. Current SVG artwork has been refined to follow the approved mark and crystal composition, but remains a vector recreation rather than an exact isolated export from the flattened moodboard. Replace it with the original transparent/vector master when available. Do not use an unrelated generic crystal illustration.

## Before public launch
- Integrate the verified original logo artwork and approved crystal visual as production assets; the current vector work is an interim recreation.
- Integrate real project screenshots, match them to the correct case studies, redact private details and confirm client publication permissions.
- Confirm the permanent domain and update siteUrl in src/app/layout.tsx, src/app/sitemap.ts and src/app/robots.ts.
- Verify Netlify Forms with a real test submission and configure notifications/retention as appropriate.
- Review Privacy Policy and Terms with a qualified professional for applicable legal requirements and the final data flow.
- Run typecheck, lint, production build, responsive QA, accessibility and security checks before merging.

## Cost and release safeguards
- Startup build targets free tiers and no new paid subscriptions.
- No private API keys are committed.
- Keep all development on `build/phase-1-website`.
- Do not merge to `main` or release production until review and explicit approval.
