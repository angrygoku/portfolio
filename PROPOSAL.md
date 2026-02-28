# Revamped Portfolio Proposal — **Govind Dixit Personal Site (Indian Maximal)**

## 1) Direction

This portfolio is intentionally personal and expressive, not a neutral template.
The design language combines:

- Indian-maximal poster energy
- editorial typography
- motion-first storytelling
- product-level information clarity

The objective is to feel visually memorable **and** professionally trustworthy.

---

## 2) Issues Found and Fixes Applied

### Issue A — Legacy concept mismatch
Older documentation still referenced “Signal Atlas,” which conflicted with the current personal-brand direction.

**Fix:** Updated documentation to align with the current identity and visual strategy.

### Issue B — Reduced-motion timeline rendering
Timeline cards defaulted to low opacity/offset values. In reduced-motion mode this could leave milestones looking dim.

**Fix:** Timeline now defaults to fully visible at rest, while motion states are applied only when JS animation is active.

### Issue C — Missing favicon request noise
Browser was requesting `/favicon.ico` and returning 404 in local logs.

**Fix:** Added an inline SVG favicon in `index.html` to eliminate unnecessary 404 noise.

---

## 3) Creative System

## Visual Language
- Warm paper-like canvas
- high-contrast ink typography
- vivid accent colors inspired by Indian palette dynamics
- collage-style imagery and textured finish

## Motion Language
- reveal choreography for section pacing
- tilt micro-interactions on project cards
- animated metric counters
- timeline motion tied to scroll proximity
- marquee band to create rhythmic energy

## Information Structure
- hero proposition (who + what + value)
- selected work with visual proof
- brief story + quantified impact
- timeline for experience and learning
- direct conversion contact block

---

## 4) Why this is stronger

1. It reads as a real personal website, not a generic concept experiment.
2. Visual style is distinctive without losing readability.
3. Motion supports hierarchy and attention instead of distracting from content.
4. Accessibility fallbacks remain in place for reduced-motion users.

---

## 5) Next iteration options

- Replace stock image placeholders with your own curated work and portrait assets.
- Add a dedicated case-study route per major project.
- Introduce GSAP/Framer timeline sequencing for even more precise high-end motion.
- Add SEO/social metadata and analytics for real-world deployment.
