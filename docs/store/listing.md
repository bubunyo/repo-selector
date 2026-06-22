# Chrome Web Store listing copy

Reference text for the item's **Privacy practices** tab and listing fields.

## Single purpose description

Recent GitHub Repos is a toolbar popup that helps users quickly find and open
GitHub repositories they have recently visited. It reads browser history to build
a recency-sorted, fuzzy-searchable list of github.com repositories and opens the
selected repo's Code, Pull Requests, Issues, or Actions page. Fast navigation to
recently visited GitHub repositories is the extension's single purpose, and all
functionality serves it.

## Permission justifications

### `history`

The extension reads browsing history to discover which GitHub repositories the
user recently visited. It queries history for github.com URLs, reduces them to
`owner/repo`, and shows them as a recency-sorted, searchable list in the popup —
this is the core feature. History is read locally on the device, used only to
populate the in-popup list, and is never transmitted anywhere.

### `storage`

The extension uses `chrome.storage.local` to cache the computed list of recent
repositories so the popup renders instantly on open, then refreshes in the
background. Only repository identifiers (`owner/repo`) and last-visit timestamps
are stored, locally on the user's device. No data is sent to any server.

### `tabs`

The tabs permission is used to open the selected repository (or its Pull
Requests, Issues, or Actions page) and, when a tab is already open at that exact
URL, to focus the existing tab instead of creating a duplicate. The extension
reads tab URLs only to match an already-open tab; it does not collect, store, or
transmit any tab data.

## Remote code

Select **"No, I am not using remote code."** All JavaScript, HTML, and CSS are
packaged within the extension. It does not load, import, or evaluate any code
from remote sources and makes no network requests of any kind.

## Data usage certification

The extension reads history locally but transmits nothing off the device, so on
the data-collection form declare that no listed data types are collected (under
Google's definition, "collection" means transmission off-device).

Explanation if prompted:

> The extension processes browsing history and stores a repository list only
> locally on the user's device. No user data is collected, sold, or transmitted
> to the developer or any third party.

Certify all three (all true here):

- Not selling/transferring data to third parties outside approved uses.
- Not using/transferring data for purposes unrelated to the single purpose.
- Not using/transferring data for creditworthiness or lending.

## Privacy policy URL

https://github.com/bubunyo/repo-selector/blob/main/PRIVACY.md

## Manual settings-page items

- Add the publisher **contact email** (must be a real email address).
- **Verify** that email via the link Google sends.
