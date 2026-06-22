const RESERVED_OWNERS = new Set([
  "settings", "notifications", "marketplace", "explore", "topics", "sponsors",
  "pulls", "issues", "search", "new", "login", "logout", "join", "orgs",
  "organizations", "about", "pricing", "features", "codespaces", "dashboard",
  "account", "apps", "contact", "site", "customer-stories", "readme",
  "collections", "trending", "events", "stars", "watching",
  "github-copilot", "discussions",
]);

const HISTORY_WINDOW_MS = 90 * 24 * 60 * 60 * 1000;
const CACHE_KEY = "recentRepos";

const ACTIONS = [
  {
    id: "code",
    label: "Code",
    suffix: "",
    shortcut: "c",
    svg: '<svg viewBox="1.83 3.85 20.34 17.14" width="16" height="16" fill="none"><path d="M14.1809 4.2755C14.581 4.3827 14.8185 4.79396 14.7113 5.19406L10.7377 20.0238C10.6304 20.4239 10.2192 20.6613 9.81909 20.5541C9.41899 20.4469 9.18156 20.0356 9.28876 19.6355L13.2624 4.80583C13.3696 4.40573 13.7808 4.16829 14.1809 4.2755Z" fill="currentColor"/><path d="M16.4425 7.32781C16.7196 7.01993 17.1938 6.99497 17.5017 7.27206L19.2392 8.8358C19.9756 9.49847 20.5864 10.0482 21.0058 10.5467C21.4468 11.071 21.7603 11.6342 21.7603 12.3295C21.7603 13.0248 21.4468 13.5881 21.0058 14.1123C20.5864 14.6109 19.9756 15.1606 19.2392 15.8233L17.5017 17.387C17.1938 17.6641 16.7196 17.6391 16.4425 17.3313C16.1654 17.0234 16.1904 16.5492 16.4983 16.2721L18.1947 14.7452C18.9826 14.0362 19.5138 13.5558 19.8579 13.1467C20.1882 12.7541 20.2603 12.525 20.2603 12.3295C20.2603 12.1341 20.1882 11.9049 19.8579 11.5123C19.5138 11.1033 18.9826 10.6229 18.1947 9.91383L16.4983 8.387C16.1904 8.10991 16.1654 7.63569 16.4425 7.32781Z" fill="currentColor"/><path d="M7.50178 8.387C7.80966 8.10991 7.83462 7.63569 7.55752 7.32781C7.28043 7.01993 6.80621 6.99497 6.49833 7.27206L4.76084 8.8358C4.0245 9.49847 3.41369 10.0482 2.99428 10.5467C2.55325 11.071 2.23975 11.6342 2.23975 12.3295C2.23975 13.0248 2.55325 13.5881 2.99428 14.1123C3.41369 14.6109 4.02449 15.1606 4.76082 15.8232L6.49833 17.387C6.80621 17.6641 7.28043 17.6391 7.55752 17.3313C7.83462 17.0234 7.80966 16.5492 7.50178 16.2721L5.80531 14.7452C5.01743 14.0362 4.48623 13.5558 4.14213 13.1467C3.81188 12.7541 3.73975 12.525 3.73975 12.3295C3.73975 12.1341 3.81188 11.9049 4.14213 11.5123C4.48623 11.1033 5.01743 10.6229 5.80531 9.91383L7.50178 8.387Z" fill="currentColor"/></svg>',
  },
  {
    id: "pulls",
    label: "Pull Requests",
    suffix: "/pulls",
    shortcut: "p",
    svg: '<svg viewBox="27.74 28 200.51 200" width="16" height="16" fill="currentColor"><path d="M104.00049,68a36,36,0,1,0-44,35.0929v49.8142a36,36,0,1,0,16,0V103.0929A36.05516,36.05516,0,0,0,104.00049,68Zm-16,120a20,20,0,1,1-20-20A20.0226,20.0226,0,0,1,88.00049,188Zm136.002,0A36,36,0,1,1,180.002,152.90717l-.00146-33.02533a39.73874,39.73874,0,0,0-11.71582-28.28321L144.00049,67.31415V88a8,8,0,0,1-16,0V48.00513q0-.39918.04-.79706c.01074-.10773.03125-.21222.0459-.31867.02148-.15216.03955-.30456.06933-.45544.02539-.12622.06006-.24841.09131-.37244.03174-.12921.06055-.259.09912-.38678.03711-.12243.0835-.2406.126-.36047.04541-.12659.0874-.25385.13867-.37848.0459-.111.10059-.21728.15137-.32568.06006-.12866.11718-.25806.18506-.384.05517-.10279.11767-.20032.17724-.30036.07373-.124.144-.24921.22461-.36993.07373-.10968.15576-.21259.23438-.3183.07666-.10358.14892-.20947.23193-.31006.14844-.18091.30664-.35321.47021-.52032.02-.0207.03711-.0434.05762-.06391.01563-.01532.03223-.028.04785-.04315.17285-.16986.35157-.33319.53907-.487.08837-.07251.18164-.13538.27246-.20361.11865-.08924.23486-.181.35839-.26367.10645-.071.2168-.13221.3252-.19751.11523-.06934.22852-.14148.34766-.20508.11035-.05908.22412-.10889.33691-.16236.124-.059.24609-.1206.37354-.17328.10791-.04461.21826-.08038.32763-.12.13672-.04956.27149-.10162.41162-.14386.10889-.033.22022-.05676.33057-.085.14209-.03626.28223-.07569.42725-.10431.13037-.02576.26171-.04065.39257-.05994.12647-.01849.251-.04217.3794-.05469.24658-.02429.49365-.03607.74121-.03747.01562-.00006.03027-.00232.0459-.00232h40a8,8,0,0,1,0,16h-20.686l24.28467,24.28516a55.63508,55.63508,0,0,1,16.40137,39.59619L196.002,152.907A36.055,36.055,0,0,1,224.00244,188Z"/></svg>',
  },
  {
    id: "issues",
    label: "Issues",
    suffix: "/issues",
    shortcut: "i",
    svg: '<svg viewBox="-0.6 -0.6 17.2 17.2" width="16" height="16" fill="currentColor"><path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path></svg>',
  },
  {
    id: "actions",
    label: "Actions",
    suffix: "/actions",
    shortcut: "a",
    svg: '<svg viewBox="1.5 1.5 21 21" width="16" height="16" fill="none"><path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/><path d="M9 12L10.6828 13.6828C10.858 13.858 11.142 13.858 11.3172 13.6828L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
];

const searchEl = document.getElementById("search");
const resultsEl = document.getElementById("results");
const emptyEl = document.getElementById("empty");

let allRepos = [];
let view = [];
let selectedIndex = 0;
let activeAction = 0;

function parseRepo(rawUrl) {
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    return null;
  }
  if (url.hostname !== "github.com" && url.hostname !== "www.github.com") {
    return null;
  }
  const segments = url.pathname.split("/").filter(Boolean);
  if (segments.length < 2) return null;

  const owner = segments[0];
  const repo = segments[1];
  if (RESERVED_OWNERS.has(owner.toLowerCase())) return null;
  if (!/^[\w.-]+$/.test(owner) || !/^[\w.-]+$/.test(repo)) return null;

  return { owner, repo, key: `${owner}/${repo}` };
}

async function fetchReposFromHistory() {
  const items = await chrome.history.search({
    text: "github.com",
    startTime: Date.now() - HISTORY_WINDOW_MS,
    maxResults: 1000,
  });

  const byKey = new Map();
  for (const item of items) {
    const parsed = parseRepo(item.url);
    if (!parsed) continue;
    const lastVisit = item.lastVisitTime || 0;
    const existing = byKey.get(parsed.key);
    if (!existing || lastVisit > existing.lastVisit) {
      byKey.set(parsed.key, {
        owner: parsed.owner,
        repo: parsed.repo,
        key: parsed.key,
        lastVisit,
      });
    }
  }

  return [...byKey.values()].sort((a, b) => b.lastVisit - a.lastVisit);
}

async function readCache() {
  if (!chrome.storage?.local) return null;
  try {
    const stored = await chrome.storage.local.get(CACHE_KEY);
    const repos = stored[CACHE_KEY];
    return Array.isArray(repos) ? repos : null;
  } catch {
    return null;
  }
}

async function writeCache(repos) {
  if (!chrome.storage?.local) return;
  try {
    await chrome.storage.local.set({ [CACHE_KEY]: repos });
  } catch {
    // Cache writes are best-effort; ignore failures.
  }
}

function signature(repos) {
  return repos.map((r) => `${r.key}:${r.lastVisit}`).join("|");
}

function fuzzyScore(query, target) {
  if (!query) return { score: 0, positions: [] };
  const q = query.toLowerCase();
  const t = target.toLowerCase();

  let score = 0;
  let qi = 0;
  let prevMatchIdx = -2;
  const positions = [];

  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] !== q[qi]) continue;

    positions.push(ti);
    let bonus = 1;
    if (ti === prevMatchIdx + 1) bonus += 4; // consecutive
    if (ti === 0 || t[ti - 1] === "/" || t[ti - 1] === "-" || t[ti - 1] === "_") {
      bonus += 3; // word boundary
    }
    score += bonus;
    prevMatchIdx = ti;
    qi++;
  }

  if (qi < q.length) return null; // not all chars matched
  score -= positions[0]; // prefer earlier matches
  return { score, positions };
}

function relativeTime(ms) {
  if (!ms) return "";
  const diff = Date.now() - ms;
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.round(days / 30)}mo ago`;
}

function highlight(text, positions) {
  if (!positions || positions.length === 0) {
    return document.createTextNode(text);
  }
  const frag = document.createDocumentFragment();
  const set = new Set(positions);
  let buffer = "";
  let matching = false;

  const flush = () => {
    if (!buffer) return;
    if (matching) {
      const span = document.createElement("span");
      span.className = "match";
      span.textContent = buffer;
      frag.appendChild(span);
    } else {
      frag.appendChild(document.createTextNode(buffer));
    }
    buffer = "";
  };

  for (let i = 0; i < text.length; i++) {
    const isMatch = set.has(i);
    if (isMatch !== matching) {
      flush();
      matching = isMatch;
    }
    buffer += text[i];
  }
  flush();
  return frag;
}

function render() {
  resultsEl.innerHTML = "";

  if (view.length === 0) {
    emptyEl.hidden = false;
    emptyEl.textContent = allRepos.length === 0
      ? "No recent repositories found."
      : "No matches.";
    return;
  }
  emptyEl.hidden = true;

  view.forEach((entry, i) => {
    const { repo, positions } = entry;
    const li = document.createElement("li");
    li.dataset.index = String(i);
    if (i === selectedIndex) li.classList.add("selected");

    const info = document.createElement("div");
    info.className = "info";

    const name = document.createElement("div");
    name.className = "repo";
    name.appendChild(highlight(repo.key, positions));
    name.addEventListener("click", (e) => {
      e.stopPropagation();
      navigate(urlFor(repo, 0), isBackground(e));
    });
    info.appendChild(name);

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = relativeTime(repo.lastVisit);
    info.appendChild(meta);

    li.appendChild(info);

    const actions = document.createElement("div");
    actions.className = "actions";
    ACTIONS.forEach((action, ai) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "action-icon";
      btn.title = `${action.label} (Alt+${action.shortcut.toUpperCase()})`;
      btn.innerHTML = action.svg;
      if (i === selectedIndex && ai === activeAction) btn.classList.add("active");
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        selectedIndex = i;
        activeAction = ai;
        navigate(urlFor(repo, ai), isBackground(e));
      });
      actions.appendChild(btn);
    });
    li.appendChild(actions);

    resultsEl.appendChild(li);
  });

  scrollSelectedIntoView();
}

function applyFilter() {
  const query = searchEl.value.trim();

  if (!query) {
    view = allRepos.map((repo) => ({ repo, positions: [] }));
  } else {
    view = [];
    for (const repo of allRepos) {
      const result = fuzzyScore(query, repo.key);
      if (result) view.push({ repo, positions: result.positions, score: result.score });
    }
    view.sort((a, b) => b.score - a.score || b.repo.lastVisit - a.repo.lastVisit);
  }

  selectedIndex = 0;
  render();
}

function urlFor(repo, actionIndex) {
  return `https://github.com/${repo.key}${ACTIONS[actionIndex].suffix}`;
}

function isBackground(e) {
  return Boolean(e && (e.metaKey || e.ctrlKey || e.button === 1));
}

function normalizeUrl(raw) {
  try {
    const u = new URL(raw);
    return `${u.origin}${u.pathname.replace(/\/+$/, "")}`;
  } catch {
    return raw;
  }
}

async function navigate(url, background) {
  const target = normalizeUrl(url);
  const tabs = await chrome.tabs.query({});
  const match = tabs.find((tab) => tab.url && normalizeUrl(tab.url) === target);

  if (match) {
    await chrome.tabs.update(match.id, { active: true });
    if (match.windowId != null) {
      await chrome.windows.update(match.windowId, { focused: true });
    }
  } else {
    await chrome.tabs.create({ url, active: !background });
  }

  if (!background) window.close();
}

function cycleAction(delta) {
  activeAction = (activeAction + delta + ACTIONS.length) % ACTIONS.length;
  const li = resultsEl.querySelector("li.selected");
  if (!li) return;
  li.querySelectorAll(".action-icon").forEach((btn, ai) => {
    btn.classList.toggle("active", ai === activeAction);
  });
}

function scrollSelectedIntoView() {
  const el = resultsEl.querySelector("li.selected");
  if (el) el.scrollIntoView({ block: "nearest" });
}

function moveSelection(delta) {
  if (view.length === 0) return;
  selectedIndex = (selectedIndex + delta + view.length) % view.length;
  resultsEl.querySelectorAll("li").forEach((li, i) => {
    const isSelected = i === selectedIndex;
    li.classList.toggle("selected", isSelected);
    li.querySelectorAll(".action-icon").forEach((btn, ai) => {
      btn.classList.toggle("active", isSelected && ai === activeAction);
    });
  });
  scrollSelectedIntoView();
}

searchEl.addEventListener("input", applyFilter);

searchEl.addEventListener("keydown", (e) => {
  const current = view[selectedIndex];

  if (e.altKey) {
    const action = ACTIONS.findIndex((a) => a.shortcut === e.key.toLowerCase());
    if (action !== -1) {
      e.preventDefault();
      if (current) {
        activeAction = action;
        navigate(urlFor(current.repo, action), isBackground(e));
      }
      return;
    }
  }

  switch (e.key) {
    case "Tab":
      e.preventDefault();
      cycleAction(e.shiftKey ? -1 : 1);
      break;
    case "ArrowDown":
      e.preventDefault();
      moveSelection(1);
      break;
    case "ArrowUp":
      e.preventDefault();
      moveSelection(-1);
      break;
    case "Enter":
      e.preventDefault();
      if (current) navigate(urlFor(current.repo, activeAction), isBackground(e));
      break;
    case "Escape":
      e.preventDefault();
      if (searchEl.value) {
        searchEl.value = "";
        applyFilter();
      } else {
        window.close();
      }
      break;
  }
});

(async function init() {
  const cached = await readCache();
  const hasCache = cached && cached.length > 0;

  if (hasCache) {
    allRepos = cached;
    applyFilter();
    searchEl.focus();
  }

  let fresh;
  try {
    fresh = await fetchReposFromHistory();
  } catch (err) {
    if (!hasCache) {
      emptyEl.hidden = false;
      emptyEl.textContent = "Could not read history.";
    }
    return;
  }

  writeCache(fresh);

  if (signature(fresh) !== signature(allRepos)) {
    const selectedKey = view[selectedIndex]?.repo.key;
    allRepos = fresh;
    applyFilter();
    if (selectedKey) {
      const restored = view.findIndex((entry) => entry.repo.key === selectedKey);
      if (restored !== -1) {
        selectedIndex = restored;
        render();
      }
    }
  }

  if (!hasCache) searchEl.focus();
})();
