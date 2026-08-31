# Production QA

Validated on 2026-08-31 in desktop Chrome at 1440 × 1000 and mobile Chrome at 390 × 844, 375 × 667, and 320 × 568, plus a reduced-motion profile.

- Home, Privacy Policy, Terms of Service, CSS, and JavaScript returned HTTP 200.
- No console errors, page errors, failed resource requests, or horizontal overflow.
- All 12 form inputs have programmatic labels; required name and email validation is present.
- The conditional “Something else” field is hidden until selected.
- Workflow scenario tabs support pointer and arrow-key navigation. On mobile, all six workflow stages can be swiped or selected with labeled 28 × 28 px step controls.
- The hero activity feed loops upward continuously on desktop and mobile, pauses on hover, and remains a static single feed in reduced-motion mode.
- The sticky mobile CTA is hidden in the hero, visible through the middle sections, contained within the viewport, and hidden again at the waitlist.
- Organization and WebSite JSON-LD parse successfully.
- All local images load successfully.
- Mobile document height is 3,605 px at 390 × 844, 3,473 px at 375 × 667, and 3,572 px at 320 × 568, reduced from the 6,154 px source page.
- The desktop page remains 3,899 px tall at 1440 × 1000.
- The legal-page semantic text matches the registered source pages exactly.
- The production website derivative retains its registered SHA-256 and remains traceable to the canonical vector master.
- The Netlify ZIP passed an archive integrity test and places `index.html` at the archive root.

The existing Google Forms destination was preserved but no test submission was sent, so production form receipt should be confirmed once after launch with an authorized test address.
