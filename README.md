# Recent GitHub Repos

A Chrome extension (Manifest V3) that opens a fast, fuzzy-searchable dropdown of the
GitHub repositories you've visited recently. Jump straight to a repo's **Code**,
**Pull Requests**, **Issues**, or **Actions** with a click or a keystroke.

## Features

- **Recent repos** — reads your browser history (last 90 days) and lists the GitHub
  repositories you've visited, most recent first.
- **Fuzzy search** — type to filter by `owner/repo`; matches are scored (consecutive
  and word-boundary hits rank higher) and highlighted.
- **Per-repo quick actions** — each row has icons for Code, Pull Requests, Issues, and
  Actions that link directly to that section.
- **Switch or open** — navigating focuses an existing tab already on that exact URL,
  otherwise opens a new one.
- **Instant open** — results are cached in `chrome.storage.local` and painted
  immediately, then refreshed from history in the background (stale-while-revalidate).
- **Keyboard driven** — arrow keys, `Tab` to switch section, and `Alt` shortcuts.
- **Light & dark** — follows your system color scheme.

## Install (load unpacked)

1. Open `chrome://extensions`.
2. Enable **Developer mode** (top-right).
3. Click **Load unpacked** and select this folder.
4. Pin the extension: click the puzzle-piece icon in the toolbar, then the pin next to
   **Recent GitHub Repos**.

Visit a few GitHub repositories first if the list starts empty.

## Usage

Click the toolbar icon to open the popup. The search box is focused automatically.

### Keyboard

| Key | Action |
| --- | --- |
| `↑` / `↓` | Move between repositories |
| `Tab` / `Shift+Tab` | Switch the active section (Code → Pull Requests → Issues → Actions) |
| `Enter` | Open the selected repo at the active section |
| `Alt+C` | Open **Code** for the selected repo |
| `Alt+P` | Open **Pull Requests** |
| `Alt+I` | Open **Issues** |
| `Alt+A` | Open **Actions** |
| `Esc` | Clear the search, or close the popup if already empty |

`Cmd`/`Ctrl`-click (or middle-click) an icon to open it in a background tab.

## How it works

- `chrome.history.search` is queried for `github.com` URLs within the last 90 days.
  URLs are reduced to `owner/repo`, reserved GitHub paths (e.g. `settings`,
  `marketplace`, `pulls`) are filtered out, duplicates are collapsed to the most recent
  visit, and the list is sorted recency-first.
- The computed list is stored in `chrome.storage.local` so the next open renders
  instantly; history is re-queried in the background and the view updates only if the
  list changed (selection and search query are preserved).

## Permissions

| Permission | Why |
| --- | --- |
| `history` | Read recently visited GitHub URLs. |
| `tabs` | Open repos and focus an existing matching tab. |
| `storage` | Cache the repo list for instant painting. |

## Project structure

```
repo-selector/
├── manifest.json   # MV3 config (action popup + permissions)
├── popup.html      # search input + results list + hint bar
├── popup.css       # dropdown styling, light/dark, icon states
├── popup.js        # history query, filtering, fuzzy search, caching, keyboard nav
├── icon.svg        # app icon source
└── icons/          # icon16/48/128.png (rasterized from icon.svg)
```

### Regenerating icons

The PNGs are rasterized from `icon.svg` with [`rsvg-convert`](https://gitlab.gnome.org/GNOME/librsvg):

```sh
for s in 16 48 128; do rsvg-convert -w $s -h $s icon.svg -o icons/icon$s.png; done
```
