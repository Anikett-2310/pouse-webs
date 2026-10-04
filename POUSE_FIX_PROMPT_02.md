# POUSE WEBSITE: FINAL PREMIUM ENHANCEMENT PROMPT 02

This is the last enhancement pass. Make every change below in one pass. Run `npm run build` and fix every error before finishing. Keep all existing colors, fonts, routes and content. Do not rewrite pages from scratch — enhance what is there.

Where this prompt conflicts with earlier prompts, **this prompt wins**.

---

## 1. Hero section: complete redesign

Replace the current hero with this layout. Two columns on desktop, single column on mobile.

### Left column
- Eyebrow in the same numbered style ("00 POCKET MOUSE") but in muted color, not colored.
- Typing headline exactly as the design lock prompt specifies — unchanged.
- Subheading and CTA buttons — unchanged.
- Fine print — unchanged.
- **New: three small stat pills** below the fine print, in a horizontal row. Each pill has an icon, a number and a label. Use only facts from `POUSE_MASTER_PROJECT_CONTEXT.md`:
  - "5 Input Modes"
  - "2 Transports" (Wi-Fi and Bluetooth)
  - "v1.0.0 Released"
  - Style: glass pill, hairline border, Figtree 13px, icon in violet. Do not invent download counts, user numbers or performance benchmarks.

### Right column: Phone + PC visual

Build this entirely in HTML and CSS with a few lines of inline SVG. Do not use any image generation service, no external images, no canvas. Use only the real assets already in `public/assets/` and `public/media/`.

**Layout:**
- A laptop shape on the right side: draw it as a rounded rectangle (the screen) with a trapezoid base (the keyboard deck) using pure CSS. The screen interior is dark (#0d0818) with a 1px hairline border.
- A phone shape on the left side: draw it as a tall rounded rectangle using pure CSS. The screen interior is dark.
- Fill the laptop screen with `pc-tray-menu.webp` (cropped and fitted, `object-fit: cover`).
- Fill the phone screen with `hero-phone.webp` (cropped and fitted).
- A **connection line** between the phone and the laptop, drawn as an SVG path that sits in absolute position over the gap. The line is a smooth cubic bezier curve. On it, animate three small glowing dots that travel from phone to laptop in sequence with a 0.6s stagger and a 2.4s loop (ease-in-out, they slow at the endpoints). Each dot is a circle 6px wide, gradient fill from #a78bfa to #f0abfc, with a soft glow (`filter: drop-shadow(0 0 6px #c084fc)`).
- Both device shapes tilt with the cursor exactly the same way the logo does in the design lock prompt (up to 12 degrees on both axes, perspective 1000px, 0.15s smoothing, reset on pointer leave).
- A large soft radial glow sits behind both devices, violet at the center, fading to transparent. It moves 8px in the opposite direction to the cursor (counter-parallax) for a floating depth effect.
- **Do not fabricate any UI inside the device frames.** Only real screenshots go inside.

**Mobile:** on screens narrower than 768px, hide the laptop, center the phone, keep the glow.

**Reduced motion:** show the devices statically, no tilt, no traveling dots, no glow movement.

---

## 2. Fix the background: layered parallax depth

Add three background layers that sit behind all content using `position: fixed` at `z-index: -1`:

**Layer 1 — dotted grid (static):** 1px white dots at 7% opacity on a 28px grid. CSS `radial-gradient` dot pattern, fading at the edges with a radial mask. This is already in the prompt 01 spec; make sure it exists.

**Layer 2 — slow drifting orbs (parallax):** Three large blurred circles.
- Orb A: 600px wide, centered at top-right, violet (#8b5cf6) at 12% opacity.
- Orb B: 500px wide, centered at bottom-left, orchid (#e879f9) at 8% opacity.
- Orb C: 700px wide, centered at center-right, rose (#fb7185) at 6% opacity.
- On scroll, move each orb at a different rate using `transform: translateY()`:
  - Orb A: `scrollY * -0.12`
  - Orb B: `scrollY * 0.08`
  - Orb C: `scrollY * -0.06`
- Use `requestAnimationFrame` with a lerp (linear interpolation, factor 0.08) so the movement is silky and lagged, not instant. Update only the CSS transform, never layout properties.
- Apply `will-change: transform` and `pointer-events: none` to all orbs.

**Layer 3 — noise texture (static):** A 200×200px SVG `feTurbulence` noise tile, white, 3% opacity, `mix-blend-mode: overlay`. This adds the tactile grain that premium sites use.

**Reduced motion:** remove all three layers and use a plain dark background.

---

## 3. Fix the utilities pills: zigzag marquee animation

Replace the current pills layout entirely.

- **Two rows.** Row 1 scrolls left to right (forward). Row 2 scrolls right to left (backward).
- Each row contains the full list of pills duplicated twice end-to-end so the loop is seamless.
- Row 1 pills: Volume (Vol +/-), Mute (Vol Mute), Brightness (WMI / DDC/CI), Windows Search (Win+S), Task View (Win+Tab), Show Desktop (Win+D).
- Row 2 pills: Taskbar Apps (Win+T), App Switcher (Alt+Tab), Soft Keyboard (UTF-8), Gesture Cheatsheet (Popup), Volume (Vol +/-), Mute (Vol Mute).
- Animation duration: 35 seconds per loop for both rows.
- Use a CSS `@keyframes` that translates X from 0 to -50% (for forward) and from -50% to 0 (for backward), with `linear` easing and `infinite` repeat.
- Wrap both rows in a container that has `overflow: hidden` and left + right fade masks using a CSS `mask-image` with a horizontal gradient (transparent → opaque → transparent over 80px on each side).
- On `hover` over the container, pause both rows using `animation-play-state: paused`.
- Individual pills: glass background, hairline border, the keycap style from prompt 01. On hover the border brightens to #a78bfa and the keycap background lightens. Transition 0.2s.
- Reduced motion: wrap both rows without animation, in a single static wrapping row.

---

## 4. Scroll-reveal animations on every section

Add an `IntersectionObserver` in a shared hook or utility. When any of the elements listed below enters the viewport (threshold 0.15), add a class that transitions it from `opacity: 0; transform: translateY(24px)` to `opacity: 1; transform: translateY(0)`. Duration 0.7s, easing `cubic-bezier(0.2, 0.7, 0.2, 1)`. Trigger once only (`unobserve` after triggering).

**Apply it to:**
- Every `h2` section heading.
- Every card in the utilities, FAQ and download sections (with a stagger: each card delays 0.12s more than the previous one).
- The terminal window.
- The connection ribbon SVG.
- The security statements (they already have their own effect; do not double-animate them — skip them here).
- The stat pills in the hero.
- The footer columns (stagger 0.1s each).

**Set the initial state in CSS** (not JavaScript) so the elements start invisible without a flash:
```css
.reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s cubic-bezier(0.2,0.7,0.2,1), transform 0.7s cubic-bezier(0.2,0.7,0.2,1); }
.reveal.visible { opacity: 1; transform: none; }
```

Reduced motion: set all `.reveal` elements to `opacity: 1; transform: none` immediately, skip the observer.

---

## 5. Fix the terminal typing animation

The terminal section built in prompt 01 may be missing its typing animation. Rebuild only the typing logic if it is not working. Do not change the visual design of the terminal.

**Exact behavior:**
- When the terminal enters the viewport, wait 400ms, then type each command for the active tab at 42ms per character.
- Between lines, pause 500ms.
- A solid block cursor (1ch wide, full line height, color #e9d5ff) follows the end of the typed text and blinks at 1s intervals (hard on/off, `steps(1)`).
- Clicking a different tab clears the body instantly and types that tab's commands from scratch.
- Copy button: copies active tab's commands. Label becomes "Copied ✓" for 1.6s.
- Reduced motion: show the full commands statically, no typing, cursor visible but not blinking.
- Do not show invented output. Show only the commands listed in prompt 01.

---

## 6. Upgrade every interactive element

### Buttons
- **Primary (gradient) button:** on hover, the gradient shifts 15 degrees, the button lifts `translateY(-3px)`, and the glow shadow expands from `0 8px 32px` to `0 16px 48px`. On click (`active`), compress to `translateY(-1px)` with a quicker shadow. Transition: 0.25s ease.
- **Outlined button:** on hover, fill with violet at 12% opacity, border brightens to #a78bfa, lift `translateY(-2px)`.
- All buttons: `cursor: pointer`, min touch target 44px, `user-select: none`.

### Nav links
- On hover: the link brightens to full white over 0.2s and a 1px underline draws from left to right (use a `scaleX` transform on a `::after` pseudo-element, origin left, 0.25s ease).
- Active page link: underline always visible in violet.

### Cards (utilities, FAQ, download tabs, issue box)
- Resting state: `box-shadow: 0 0 0 rgba(139,92,246,0)`.
- Hover state: `box-shadow: 0 8px 32px rgba(139,92,246,0.2)`, border color shifts to violet at 40% opacity, `translateY(-4px)`. Transition 0.25s ease.
- Active state: `translateY(-2px)`.

### Mode switcher list items
- Selected mode name: add a 2px left border in the mode's hue color that slides in from top to bottom over 0.3s (`scaleY` from 0 to 1, origin top) when the mode becomes active.

### Download tabs
- Tab switching: the panel does not just appear — it fades in while sliding up 12px. Duration 0.35s.
- The active tab pill has a subtle inner glow (`box-shadow: inset 0 0 12px rgba(139,92,246,0.3)`).

---

## 7. Section spacing and rhythm

The site feels empty because sections have inconsistent spacing and no visual separation. Fix these:

- All sections: `padding: clamp(80px, 10vw, 130px) 0`.
- Between sections, add a very subtle horizontal divider: a 1px line, gradient from transparent → white at 6% opacity → transparent, spanning 60% of the content width, centered.
- The hero section gets extra top padding: `clamp(60px, 12vw, 160px)`.
- Every section heading (`h2`) gets `margin-bottom: clamp(12px, 2vw, 20px)` and its subtext gets `margin-bottom: clamp(32px, 5vw, 56px)`.

---

## 8. Download and CLI page upgrades

### Download page
- The Windows, Android and CLI **tab buttons** should use the same pill style as the main tabs in the reference design (gradient background when active, glass when inactive).
- Each panel: add the glass card style (translucent fill, hairline border, radius 28px, 36px padding, faint glow behind it).
- The screenshots inside the Windows panel (`pc-tray-menu` and `pc-preferences`): place them in a Mac-style window frame (dark bar at top with three colored dots, a centered filename label). The screenshot fills the window body.
- The download button on the Windows panel: it should be the full gradient primary button style, not a flat button. Add a download icon (SVG arrow-down) to its left.
- The note about the unsigned installer: style it as a glass card with a 1px #fbbf24 left border (amber — for caution, not an error), a small warning icon, and the text in a slightly warm color.

### CLI page / CLI tab
- The terminal window must use the typing animation from section 5.
- Add a second terminal below the first that shows update and uninstall commands, pre-filled (no typing animation on the second one — static). Title it "Other commands".
- The npm badge below the terminal: replace it with a pill that says "Published on npm · pouse-cli" with the npm logo (a plain red square with a white n, drawn in inline SVG, 16×16px).

---

## 9. Footer upgrade

- Three columns with headings in JetBrains Mono uppercase muted text, 11px letter-spacing 0.16em.
  - **Product:** All 5 Input Modes, How It Works, Security & Privacy, CLI Tool (pouse-cli), Frequently Asked Questions.
  - **Downloads:** Download Center, Windows Desktop Client, Android Mobile App (coming soon), GitHub Release v1.0.0.
  - **Repository:** Source code on GitHub ↗, Issue Tracker ↗, Privacy Policy, License: TBD (only if the master context does not confirm the license; if it does, use the real license name).
- Below the columns: a centered note in muted 13px Figtree: "This website and the CLI collect zero telemetry and run no tracking scripts."
- Below that: the copyright line "© 2026 Pouse. Windows is a trademark of Microsoft Corporation. Android is a trademark of Google LLC." and "Anikett-2310/Pouse" as a link, right-aligned.
- A faint violet glow sits behind the footer area (same orb style as layer 2 in section 2, centered, very low opacity).

---

## 10. Page-level fixes

### Home page
- Section order: Hero → 01 Input Modes → 02 Companion Tools → 03 Connect → 04 Download → 05 Developer Tool → 06 Security → 07 FAQ → Footer. Verify this order and fix it if wrong.
- The input modes section: the `<figure>` that holds the mode stage should have no `<figcaption>` saying "Illustration" once real screenshots are in. Remove it.

### Download page
- The sticky nav overlaps the section when jumping to it via anchor. Fix with `scroll-padding-top` matching the nav height.
- "System context menu:" and "Windows client preferences:" are plain text labels sitting awkwardly above the screenshots. Replace them with small eyebrow-style labels using JetBrains Mono 12px muted uppercase.

### All pages
- Every external link (GitHub, npm) must have `target="_blank" rel="noopener noreferrer"`.
- Every `<img>` must have a descriptive `alt` attribute.
- Every interactive element must be keyboard focusable with the visible focus ring defined in the design lock prompt.
- No horizontal scrolling at any viewport width.

---

## Done check

Before finishing, verify each of these:

- [ ] Hero shows the phone + laptop with traveling dots on the connection line.
- [ ] Tilt on both devices follows the cursor.
- [ ] Background has dotted grid, three parallax orbs and noise texture.
- [ ] Utilities pills scroll in zigzag (row 1 left→right, row 2 right→left), pause on hover, fade at edges.
- [ ] Terminal on home page and CLI page types the commands, switches tabs, copies, shows cursor.
- [ ] Every card, button and nav link has upgraded hover states.
- [ ] Every section heading and card group has a scroll-reveal animation.
- [ ] Section spacing is even and each section has a subtle divider.
- [ ] Download page panels are glass cards with the window-frame screenshot treatment.
- [ ] Footer has three columns, the telemetry note and the correct copyright line.
- [ ] All screenshots show the full image (prompt 01 fix is still in place).
- [ ] No console errors, no horizontal scroll, keyboard navigation works.
- [ ] `npm run build` passes with zero errors.