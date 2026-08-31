# Tracking and pixels

No Google tag, Google Tag Manager container, Meta Pixel, or other third-party tracker is active in the launch bundle.

## Recommended later setup

1. Choose one loader, preferably Google Tag Manager if multiple marketing tools will be used.
2. Add a consent mechanism appropriate to the markets being served before loading non-essential tags.
3. Update the Privacy Policy so it names the categories of tracking actually used.
4. Add the loader as a local first-party script or a tightly scoped external source, then update the Content Security Policy in `public/_headers`.
5. Verify page-view and conversion events in the vendor's test tools before publishing.

The waitlist success event should be the first conversion event. Do not fire it on button click; fire it only after the submission request completes.

Keeping pixels out now avoids shipping unknown identifiers, unnecessary network requests, or an inaccurate privacy disclosure. Adding them later is a small, isolated change once the account IDs and consent decision are known.
