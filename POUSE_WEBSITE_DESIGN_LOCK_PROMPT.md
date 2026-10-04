# POUSE WEBSITE: DESIGN LOCK PROMPT

## Your job

Build the complete Pouse website **from scratch** in this folder (`pouse-webs`). There is no existing site code to reuse. The visual design is **final and approved**. It lives in a reference file. Every page you build must use this exact design system: the same colors, the same typefaces, the same text styles, the same animations.

Do not reinterpret it. Do not "improve" it. Do not substitute fonts, colors or motion. Do not redesign layouts. Build it as one complete, working site in a single pass, and make sure `npm run build` passes before you finish.

## Source of truth (read these first)

1. **`reference/pouse-design-reference.html`** (copy this file into the project root inside a `reference` folder). Open it and read its CSS and JavaScript line by line. Every value below comes from it. If this prompt and the reference file ever disagree, **the reference file wins**.
2. **`public/assets/pouse-logo.png`** is the logo. Use it exactly as the reference does: nav brand mark, hero centerpiece, footer.
3. **`public/media/`** holds the real screenshots (.webp, with -360w, -540w, -720w variants). Use the smaller variants on small screens. The `.txt` readme in that folder lists what each file shows and which page it belongs on. Use it only as a guide to the file names; it describes an older build, so ignore anything it says about automatic detection or build warnings.
4. **`POUSE_MASTER_PROJECT_CONTEXT.md`** is the source of truth for every product fact.
5. **The skills in `Skills/.agents/skills`** (taste-skill, impeccable, ui-ux-pro-max-skill, agent-thinking-skills): use them only as a quality check for accessibility, responsiveness, spacing and polish. They must **not** change the palette, fonts, layout or motion defined here. Where a skill conflicts with this prompt, this prompt wins.

---

## Tech stack and project setup

- **Framework:** Next.js with the App Router and TypeScript. Create the project in this folder (`pouse-webs`), keeping the existing `public`, `reference`, `Skills` folders and the two `.md` files where they are.
- **Styling:** plain CSS only. One global stylesheet that defines the colors, fonts and spacing from this prompt as CSS variables, plus CSS modules for individual components if you want them. No Tailwind and no UI component libraries.
- **Animation:** no animation libraries. Use CSS transitions and keyframes, plus small React hooks with IntersectionObserver, scroll listeners and timers, exactly as the reference file does.
- **Fonts:** load the four families from section 2 with `next/font/google`.
- **Images:** use plain `img` tags with `srcset` and `sizes` so the -360w, -540w and -720w files are picked by screen size. Give every image a width, height and alt text.
- **Deployment:** Vercel, with `pouse.app` as the intended domain. Do not assume the domain is live. The site must be fully static and must not need any backend.
- **Pages (routes):** `/` (Home), `/features`, `/how-it-works`, `/download`, `/security`, `/faq`, `/troubleshooting`, `/about`, `/updates`. The CLI lives inside the Download page as a tab, not as its own page.
- **Shared parts:** build the nav, footer, scroll progress bar and the reusable pieces (mode switcher, ribbon, accordion, tabs, code block) once and reuse them across pages.
- **SEO basics:** a title and description for every page, the logo as favicon, and an Open Graph image made from the logo on the page background color.

---

## 1. Colors (exact values)

**Surfaces and text**

| Role | Value |
|---|---|
| Page background | #0b0716 |
| Secondary background (used in the gradient band behind the Connect section) | #120c24 |
| Stage / phone-frame backdrop | #0e0a1d |
| Code block background | #07040f |
| Copy-button background | #150f28 |
| Main text | #f6f2ff |
| Muted text | #a59fc0 |
| Dimmed text (unselected mode names, code comments) | #6f6990 |
| Dimmed text (unfocused security statements) | #5d5779 |
| Hero first line ("Turn your phone into") | #d9d2f5 |
| Note text (warnings next to downloads) | #c9b9ff |
| Command text in code blocks | #c4f1d6 |
| Hairlines and borders | white at 10% opacity |
| Focus ring | 2px solid #e879f9, 3px offset |

**Brand accents**

| Name | Value |
|---|---|
| Violet | #8b5cf6 |
| Orchid | #e879f9 |
| Soft orchid (caret, highlighted phrases, ribbon end) | #f0abfc |
| Lavender (gradient start) | #c4b5fd and #a78bfa |
| Rose-peach (button gradient end) | #fda4af |
| Fuchsia (active tab gradient end) | #d946ef |
| Cyan | #22d3ee and #67e8f9 |
| Ribbon glow | #c084fc |

**One hue per input mode** (this is what makes the site rich instead of single-color; use these hues for the selected mode name and the stage glow):

| Mode | Hue |
|---|---|
| Touchpad | #8b5cf6 |
| Motion | #22d3ee |
| Touchless | #fb7185 |
| Gaming | #fbbf24 |
| Remote Screen | #34d399 |

**Gradients (exact)**

- **Primary button:** 110° from #c4b5fd, through #e879f9 at 55%, to #fda4af. Button text is #12081f. Resting shadow: 0 8px 32px at 28% orchid. Hover shadow: 0 12px 44px at 50% orchid.
- **Typed hero phrase:** 100° from #a78bfa, through #f0abfc at 50%, to #67e8f9, applied as text fill.
- **Scroll progress bar:** 90° from #8b5cf6, through #e879f9, to #22d3ee. 3px tall, pinned to the top of the viewport.
- **Hero glow:** a radial gradient, closest-side, violet at 50% opacity in the center, orchid at 16% at the 55% mark, transparent at 72%. Blurred 30px. Roughly 70vw wide (max 900px), pushed off the top-right corner of the hero.
- **Mode stage backdrop:** a radial gradient centered at 50% 38%, the current mode hue mixed to 40% opacity fading to transparent at 68%, over the #0e0a1d base.
- **Connect section background:** vertical gradient from page background, to #120c24 at 50%, back to page background.
- **Download panel:** 145° from violet at 14% opacity to white at 2% opacity, with a hairline border.
- **Active download tab:** 110° from #8b5cf6 to #d946ef, white text.
- **Ribbon line:** gradient left to right: cyan (#22d3ee), lavender (#a78bfa) at 50%, soft orchid (#f0abfc). A soft glow of #c084fc around the live stroke.
- **Nav bar:** page background at 62% opacity with a 14px backdrop blur and a hairline bottom border.
- **Logo shadow in hero:** a 0 30px 60px shadow in violet at 55% opacity, logo corners rounded to 22%.

---

## 2. Typography (exact)

**Load exactly these four families and no others:**
- **Bricolage Grotesque** (variable, optical size 12 to 96, weights 300, 500, 800)
- **Instrument Serif** (regular and italic)
- **Figtree** (400, 500, 600)
- **JetBrains Mono** (400, used only for terminal commands)

Body text is Figtree 17px on 1.6 line-height, left-aligned, never wider than about 34 to 46 characters-ems as in the reference.

**The text styles. Each role has its own look; do not reuse one style everywhere.**

| Where | Font and style |
|---|---|
| Brand wordmark "Pouse" | Bricolage 800, 21px, tracking -0.02em |
| Hero headline, first line | Bricolage 300, tracking -0.03em, color #d9d2f5 |
| Hero headline, typed line | Bricolage 800, tracking -0.045em, gradient text fill, line-height 0.98. The whole headline scales with clamp(42px, 7vw, 92px) |
| Hero paragraph | Figtree 19px, muted color |
| Section headings (h2) | Bricolage 500, clamp(32px, 4.6vw, 56px), line-height 1.05, tracking -0.035em, max width 16em |
| Section subtext | Figtree, muted, max width 38em |
| Mode names | Large, clamp(34px, 5vw, 60px), line-height 1.05, and **each mode has its own style**: Touchpad is Instrument Serif italic; Motion is Bricolage 800 with -0.04em tracking; Touchless is Bricolage 300 with -0.03em tracking; Gaming is Instrument Serif regular; Remote Screen is Bricolage 500 with +0.02em tracking |
| Mode descriptions | Figtree 16px on 1.55, muted, max width 30em |
| "Always in reach" label | Instrument Serif italic, 22px |
| Utility dock chips | Figtree 14.5px, muted |
| Connect sub-headings (Wi-Fi, Bluetooth) | Instrument Serif italic, 34px |
| Download panel headings | Bricolage 800, 30px, tracking -0.03em |
| Terminal commands | JetBrains Mono 14.5px on 1.9, color #c4f1d6 |
| Security statements | Instrument Serif, clamp(26px, 3.6vw, 44px), line-height 1.18; highlighted phrases are italic in #f0abfc |
| FAQ questions | Bricolage 500, 22px, tracking -0.02em |
| Buttons | Figtree 600, 16px |
| Fine print | Figtree 14px, muted |

**Text rules that keep it premium:** sentence case everywhere. No all-caps labels. No small eyebrow labels above headings. No numbered markers unless the content is truly a sequence. No arrow characters on buttons or links. Left-align text; do not center paragraphs.

---

## 3. Layout and spacing

- Content width: max 1120px, 24px side padding.
- Section padding: 100px top and bottom on desktop, 70px on mobile.
- Hero: two columns at 1.25fr and 0.75fr with a 40px gap. The logo sits on the right and moves **above** the text on mobile (smaller, left-aligned, about 200px).
- Modes: two columns, the list on the left and a 360px stage on the right, 56px gap. Stage aspect ratio 1 to 1.35, corner radius 36px, hairline border.
- Connect steps: two equal columns, 56px gap.
- Download panel: two columns, 40px gap, 36px padding, radius 28px.
- Buttons: pill shaped (fully rounded), minimum height 46px, 24px horizontal padding. Nav button is smaller (38px).
- Everything collapses to a single column at 860px wide. The nav links hide on mobile; only the logo and Download button remain.
- Minimum touch target 44px. Horizontal scrolling never appears.
- Respect safe-area insets on notched phones and keep the viewport meta tag with `viewport-fit=cover`.

---

## 4. Components (build each one exactly like the reference)

1. **Sticky nav:** logo and wordmark on the left, text links in muted color that brighten on hover, Download pill on the right. Frosted glass look.
2. **Scroll progress bar** pinned to the very top.
3. **Hero:** typed headline, paragraph, two buttons (one primary gradient, one outlined), a one-line fine print, and the floating logo with the glow behind everything.
4. **Mode switcher:** a vertical list of five giant mode names separated by hairlines. The selected mode is bright, takes its own hue, nudges 14px to the right, and reveals its description. Next to it, the stage shows the mode illustration (or real screenshot, see section 6) tinted with that mode's hue.
5. **Utility dock row:** an italic serif label, then pill chips for Volume, Brightness, Windows search, Task view, Show desktop, App switcher, Soft keyboard. Chip borders turn orchid on hover.
6. **Connection ribbon:** a wide curved line from a phone icon on the left (cyan outline) to a PC icon on the right (soft orchid outline), labeled "Phone" and "Windows PC". It draws itself as you scroll.
7. **Two-column connect steps** (Wi-Fi and Bluetooth) with italic serif headings and simple numbered lists (these are real sequences, so numbers are fine).
8. **Download tabs:** a pill-shaped tab switcher (Windows, Android, CLI) and a glass-gradient panel below it. The CLI tab has the dark code block with a Copy button.
9. **Security statements:** three large serif sentences stacked vertically.
10. **FAQ accordion:** hairline-separated questions with a plus icon in orchid that rotates into a cross when open.
11. **Footer:** hairline top border, logo and wordmark, a short line of credit and the GitHub link.

---

## 5. Animations (exact behavior)

1. **Hero entrance (the only page-load sequence):** each hero element fades in while rising 18px, over 0.9s with the easing curve (0.2, 0.7, 0.2, 1). Start delays: headline 0s, logo 0.2s, paragraph 0.25s, buttons 0.4s, fine print 0.55s.
2. **Typing headline:** the typed line cycles through these phrases in order and loops: "a touchpad.", "a motion mouse.", "a gamepad.", "a second screen.", "a hand tracker." Typing speed 75ms per character. Deleting speed 32ms per character. Hold 1.5 seconds once a phrase is fully typed. A caret (0.07em wide, 0.82em tall, soft orchid) blinks once per second with a hard on/off blink.
3. **Logo float:** the hero logo drifts up and down 14px in a 7 second ease-in-out loop.
4. **Logo tilt:** while the pointer moves over the logo, it tilts up to 18 degrees on both axes with perspective 900px (0.15s smoothing). It resets when the pointer leaves.
5. **Hero glow parallax:** the glow moves down at 0.25 times the scroll distance.
6. **Scroll progress bar:** its width tracks how far the page has scrolled.
7. **Mode switching:** hovering, focusing or clicking a mode selects it. The description opens with a 0.45s height and opacity transition, the mode name takes its hue, the stage backdrop changes hue over 0.5s, and the illustration swaps in with a 0.5s pop (starts at 92% scale and transparent).
8. **Ribbon draw:** the glowing line along the connection ribbon draws from phone to PC as the ribbon scrolls into view. Progress equals the scroll position of the ribbon between 85% of the viewport height and about 25% of it (same math as the reference file).
9. **Reading focus on security statements:** each sentence is dim (#5d5779) until it passes through the middle band of the screen (the band between 42% and 58% of the viewport height), where it turns bright over 0.5s. Only the sentence in that band is lit.
10. **Buttons:** primary buttons lift 2px on hover and their glow grows. Quick 0.2s transition.
11. **Download tabs:** the panel switches with a 0.45s pop. The Copy button text becomes "Copied" for 1.6 seconds.
12. **FAQ plus icon:** rotates 45 degrees over 0.3s when opened.
13. **Dock chips and nav links:** 0.2s color transitions on hover.
14. **Reduced motion:** if the visitor prefers reduced motion, switch off every animation and transition, show the first typed phrase as static text, and show all hero elements immediately.

**Do not add other motion.** No generic fade-up on every section, no hover animations on every card, no extra parallax. The memorable moments are the typing hero, the mode switcher, the drawing ribbon and the reading-focus statements. Everything else stays still and calm.

---

## 6. Build every page in this design

Build all nine pages. Write the copy yourself from `POUSE_MASTER_PROJECT_CONTEXT.md`, in plain, friendly language. If a detail (a port number, a file size, a minimum Android version, a benchmark) is not in the master context, leave it out instead of guessing. Use the same tokens and components on each page:

- **Home:** the hero, the mode switcher with the utility dock, a short connect teaser with the ribbon, the download call to action, the security statements and a short FAQ.
- **Features:** the mode switcher in full, one mode at a time, with real screenshots (below), plus the utility dock section.
- **How it works:** the ribbon, then the two-column Wi-Fi and Bluetooth steps, using the real `connect-qr` and `bluetooth-discovery` screenshots inside the same frame style.
- **Download:** the tab switcher and glass panels. Windows tab uses the real `pc-tray-menu` and `pc-preferences` screenshots, Android uses `connect-qr` and `hero-phone`.
- **Security:** the reading-focus statements, with the detailed explanation underneath in the muted body style.
- **FAQ and Troubleshooting:** the accordion. Group headings in Troubleshooting use Instrument Serif italic 34px like the Connect headings.
- **About and Updates:** large Instrument Serif statements for the story, Bricolage headings, and the same hairline separators. No card grids.

**Real screenshots replace the illustrations.** In the reference, the phone shapes are stylized illustrations. In the real site, place the matching `.webp` screenshot from `public/media` inside the same phone frame and stage (same rounded stage, same hue-tinted radial backdrop, same pop animation). Use the 360w, 540w and 720w variants responsively. The Gaming screenshot is landscape, so rotate the frame to landscape inside the same stage footprint. If a screenshot is missing, show a clean labeled placeholder, never an invented UI. Remove the caption that says "Illustration" once real screenshots are in.

---

## 7. Truth rules (unchanged)

- Do not invent screenshots, download URLs, metrics, testimonials or legal claims.
- Windows download links to the real GitHub release v1.0.0 (Pouse-Setup-v1.0.0.exe, with its SHA-256 file). The installer is not signed with a production Authenticode certificate yet, so keep the neutral SmartScreen note.
- The Android APK has no public hosting link yet. Keep the "coming soon" disabled button until the link exists.
- The CLI is published on npm as pouse-cli. Keep the npm link and the command block.
- Do not claim the Bluetooth identity is production-final.
- No telemetry and no analytics scripts.
- Facts come from `POUSE_MASTER_PROJECT_CONTEXT.md`.

---

## 8. Do not

- Do not swap any font, color, gradient, radius or timing for something "similar".
- Do not turn the mode list into a grid of identical cards.
- Do not add decorative gradients, orbs, grids or particles that are not in the reference.
- Do not use all-caps labels, eyebrow text, or arrow glyphs.
- Do not center body paragraphs.
- Do not add motion beyond section 5.

---

## 9. Done check

Before finishing, open the reference file and your site side by side at 1440px, 768px and 390px wide and confirm:

- Every color in section 1 appears where the reference uses it.
- Only the four fonts load, and each text role matches the table in section 2.
- All fourteen animation behaviors in section 5 work, and reduced motion turns them off.
- The mode switcher, ribbon draw, typing hero and reading-focus statements feel identical to the reference.
- Every page uses the same system, and every screenshot is real.
- `npm run build` passes with no errors, there is no horizontal scroll, and keyboard focus is visible everywhere.

Build it so that someone comparing the reference file and the finished site cannot tell they came from different designers.