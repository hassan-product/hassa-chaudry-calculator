# 0009. No sound yet

- **Status:** Accepted
- **Date:** 2026-10-07

## Context
A desk checker entering figures from paper wants to keep their eyes on the page (J-10). A click on each key press would confirm it registered without looking up. But sound in a web page has real limits:
- **Off by default.** It would have to be off by default in an office or beside a screen reader, so most people would never hear it.
- **It competes with speech.** It competes with VoiceOver.
- **It is unreliable across devices.** The iPhone silent switch can mute it, and browsers hold audio back until the first tap, so it would work on some devices and not others.
- **It can only be checked by ear,** not by an automated test.

## Decision
Do not build sound in this version. S-21 is written with full criteria, and its status is Not implemented. It will be built only when all three conditions hold: it is off by default, users have asked for it, and it has been tested alongside VoiceOver.

## Alternatives rejected
- **Build it now, off by default.** It is cheap to add. It was rejected because a feature that most people never switch on, that behaves differently on different devices, and that no automated test can check undermines trust more than its absence does. The need is already met by the display and the tape.
- **Use haptics (vibration) instead.** This was rejected because it is not available on most desktop browsers or on iPhone in the browser, so it has the same device-by-device inconsistency in a worse form.

## Consequences
- Every behaviour the product promises can be checked by an automated test.
- **Cost:** someone entering a long column of figures from paper has to glance up to confirm each key press. The display and the tape are the only feedback.
- **Cost:** if users do ask for sound, the conditions above mean a round of manual testing with VoiceOver on real devices before it can ship.
