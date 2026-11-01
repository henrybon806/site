// Colors resolve to CSS variables defined in app/+html.tsx, so switching themes
// only flips an attribute on <html> and nothing has to re-render.
export const colors = {
  bg: "var(--bg)",
  text: "var(--text)",
  body: "var(--body)",
  muted: "var(--muted)",
  line: "var(--line)",
  accent: "var(--accent)",
  surface: "var(--surface)",
};

export const fonts = {
  sans: "Geist, ui-sans-serif, system-ui, sans-serif",
  mono: "'Geist Mono', ui-monospace, monospace",
};

export type Theme = "light" | "dark";
const STORAGE_KEY = "theme";

const systemTheme = (): Theme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export function currentTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

// Explicit choice from the footer toggle; remembered until the system setting changes.
export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {}
}

// When the OS switches light/dark, drop any manual choice and follow it.
export function followSystemTheme(onChange: (theme: Theme) => void) {
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  const listener = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    document.documentElement.dataset.theme = systemTheme();
    onChange(systemTheme());
  };
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
}

// Safety net for pages whose <head> didn't come from app/+html.tsx (e.g. a tab that was
// open before a hot reload): adds the theme CSS and resolves the theme if missing.
export function ensureThemeLoaded() {
  if (typeof document === "undefined") return;
  if (!document.getElementById("theme-css")) {
    const style = document.createElement("style");
    style.id = "theme-css";
    style.textContent = themeCss;
    document.head.appendChild(style);
  }
  if (!document.documentElement.dataset.theme) new Function(themeBootScript)();
}

// Runs inline in <head> before the page paints, so there is no flash of the wrong theme.
export const themeBootScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");}catch(e){}
if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}
document.documentElement.dataset.theme=t;})();`;

export const themeCss = `
:root, :root[data-theme="light"] {
  --bg: #FAFAFA; --surface: #F4F4F5; --text: #18181B; --body: #52525B;
  --muted: #71717A; --line: #E4E4E7; --accent: #0c4a6e;
  color-scheme: light;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #121212; --surface: #1C1C1E; --text: #EDEDED; --body: #A1A1AA;
    --muted: #8B8B93; --line: #2A2A2E; --accent: #7DB9DE;
    color-scheme: dark;
  }
}
:root[data-theme="dark"] {
  --bg: #121212; --surface: #1C1C1E; --text: #EDEDED; --body: #A1A1AA;
  --muted: #8B8B93; --line: #2A2A2E; --accent: #7DB9DE;
  color-scheme: dark;
}
html, body { background-color: var(--bg); }
`;
