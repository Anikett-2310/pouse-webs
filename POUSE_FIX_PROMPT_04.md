# POUSE WEBSITE: FIX PROMPT 04

Small focused pass. Do not touch anything not listed here. Run `npm run build` and fix all errors.

---

## 1. Nav: remove v1.0.0

The nav currently shows "Pouse — The Pocket Mouse  v1.0.0". Remove "v1.0.0" completely. The nav should show only:

```
Pouse — The Pocket Mouse
```

Find wherever the version string is injected next to the wordmark and delete it. The version badge elsewhere on the page (if any) can stay.

---

## 2. Hero: increase gap between phone and laptop

The phone and laptop are too close together and the connection line between them is not visible. Increase the horizontal gap between the two devices so there is at least 120px of empty space between the phone's right edge and the laptop's left edge. The connection SVG path and traveling dots sit in that gap. Do not change anything else about the device layout.

---

## 3. Hero: replace laptop screen content with a CSS-drawn PC illustration

Do NOT use pc-tray-menu.webp or any real screenshot inside the laptop frame. Instead, draw a simple stylized PC desktop UI inside the laptop screen using only HTML and CSS:

- Dark background (#0d0818) inside the screen
- A thin taskbar strip at the bottom: height 28px, background #1a1030, with 3-4 small colored circles on the left (like pinned app icons, each 10px, violet/orchid colors) and a small clock-like element on the right (just a rounded rect, muted color)
- Above the taskbar, two or three "window" shapes: rounded rectangles with a 1px border in rgba(139,92,246,0.4), dark fill, positioned naturally as overlapping windows
- Inside one window, draw 3-4 thin horizontal lines (like text lines) using divs: width 60-80%, height 2px, background rgba(255,255,255,0.15), spaced 8px apart
- Inside another window, a small violet square accent (like a UI element or icon)
- A subtle violet radial glow in the center of the screen: radial-gradient from rgba(139,92,246,0.2) to transparent
- NO text, NO real content, NO images. Pure CSS shapes only.

This gives a "PC desktop" feel without needing a real screenshot.

---

## 4. Fix the marquee zigzag — it is completely static

The marquee pills are not animating at all. This is the fix:

The CSS animation is likely being overridden or not applied. Do the following:

**Step 1:** Add this exact CSS to globals.css:

```css
@keyframes marquee-fwd {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.marquee-track {
  display: flex;
  width: max-content;
  gap: 10px;
  animation: marquee-fwd 35s linear infinite;
  will-change: transform;
}

.marquee-track.rev {
  animation-direction: reverse;
}

.marquee-container:hover .marquee-track {
  animation-play-state: paused;
}
```

**Step 2:** In the UtilitiesSection component, make sure:
- Each row's pill list is duplicated TWICE inside `.marquee-track` so the loop is seamless (the track must be 200% wide — 50% visible, 50% clone)
- The outer container has `overflow: hidden`
- Left and right fade masks: `mask-image: linear-gradient(90deg, transparent 0px, black 80px, black calc(100% - 80px), transparent 100%)`
- Do NOT wrap `.marquee-track` in any element that has `overflow: hidden` — only the outer container should clip

**Step 3:** Verify by inspecting in browser devtools that the animation is running (not paused, not 0 duration, not `none`).

---

## 5. Terminal: make it look more like a real terminal

The terminal section currently looks like a generic card. Make it feel like a real premium terminal app:

- **Overall:** darker background (#050310), slightly stronger border glow: `box-shadow: 0 0 0 1px rgba(139,92,246,0.3), 0 0 60px rgba(139,92,246,0.15), 0 30px 80px rgba(0,0,0,0.6)`
- **Title bar:** add a subtle gradient background `linear-gradient(180deg, #1a0f35, #120a28)` instead of flat dark
- **Tab row:** active tab gets a gradient underline `linear-gradient(90deg, #8b5cf6, #e879f9)` instead of a solid color. Inactive tabs are more muted (#4a4570)
- **Body text:** the typed commands should be slightly larger (17px), with more line height (2.2). Add a very subtle scanline effect: repeating horizontal lines using `background: repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(255,255,255,0.015) 31px, rgba(255,255,255,0.015) 32px)` overlaid on the body
- **Cursor:** make the cursor slightly more visible — `background: #e9d5ff`, `box-shadow: 0 0 8px rgba(233,213,255,0.8)`
- **Footer strip:** add a subtle top border gradient `linear-gradient(90deg, #8b5cf6, #e879f9)` at 1px height above the footer strip instead of a plain hairline

---

## Done check

- [ ] Nav shows "Pouse — The Pocket Mouse" with no version number
- [ ] Phone and laptop have at least 120px gap, connection line is visible between them
- [ ] Laptop screen shows a CSS-drawn PC desktop (no screenshot, no QR code)
- [ ] Marquee row 1 scrolls left→right continuously, row 2 scrolls right→left
- [ ] Marquee pauses when hovered
- [ ] Terminal looks dark, premium and terminal-like
- [ ] `npm run build` passes with no errors
