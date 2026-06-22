# Privacy Policy — Recent GitHub Repos

_Last updated: 2026-06-22_

Recent GitHub Repos ("the extension") is designed to keep all data on your device.

## What the extension accesses

- **Browsing history** — queried locally to find recently visited `github.com`
  repository pages and build the in-popup list. Read via Chrome's `history` API.
- **Open tabs** — tab URLs are read only to focus an already-open tab instead of
  opening a duplicate (`tabs` API).
- **Local storage** — the computed list of repositories (`owner/repo` plus
  last-visit timestamps) is cached in `chrome.storage.local` so the popup opens
  instantly.

## What we collect

**Nothing.** The extension does not collect, store off-device, sell, share, or
transmit any personal data. There are no analytics, no tracking, no external
servers, and no network requests. All processing happens locally in your browser.

## Permissions summary

| Permission | Why | Leaves device? |
| --- | --- | --- |
| `history` | Find recently visited GitHub repos | No |
| `tabs` | Open repos / focus an existing matching tab | No |
| `storage` | Cache the repo list locally for instant load | No |

## Data retention

The cached list lives in your browser's local storage and is refreshed each time
the popup opens. Uninstalling the extension removes it. No copies exist anywhere
else.

## Contact

Questions or issues: https://github.com/bubunyo/repo-selector/issues

## Changes

Any updates to this policy will be published in this file in the project
repository.
