import type { Item, KeywordTag, LinkSet, Period, Project, Publication } from "./detailsData";

export type Kind = "Project" | "Publication";

export function isProject(item: Item): item is Project {
  return item.kind === "project";
}

export function isPublication(item: Item): item is Publication {
  return item.kind === "publication";
}

export function getKind(item: Item): Kind {
  return isProject(item) ? "Project" : "Publication";
}

export type RightAction =
  | { kind: "doi" | "pdf"; href: string }
  | { kind: "website"; href: string }
  | { kind: "logo"; src: string; alt: string };

function isHttpUrl(s: string) {
  return /^https?:\/\//i.test(s);
}

export function toDoiHref(raw?: string): string | null {
  const s = String(raw ?? "").trim();
  if (!s) return null;
  return isHttpUrl(s) ? s : `https://doi.org/${s}`;
}

export function resolveExternalHref(links?: LinkSet): string | null {
  if (!links) return null;

  if (links.website) return links.website;
  if (links.doi) return toDoiHref(links.doi);
  if (links.pdf) return links.pdf;
  if (links.github) return links.github;

  return null;
}

export function getRightActions(item: Item): RightAction[] {
  const out: RightAction[] = [];

  if (isProject(item)) {
    const logo = String(item.links?.logo ?? "").trim();
    const website = String(item.links?.website ?? "").trim();

    if (logo) out.push({ kind: "logo", src: logo, alt: `${item.title} logo` });
    if (website) out.push({ kind: "website", href: website });
    
    return out;
  }

  const doi = toDoiHref(item.links?.doi);
  const pdf = String(item.links?.pdf ?? "").trim();

  if (doi) out.push({ kind: "doi", href: doi });
  if (pdf) out.push({ kind: "pdf", href: pdf });

  return out;
}

export function formatPeriod(period?: Period): string | null {
  if (!period) return null;

  switch (period.type) {
    case "year":
      return String(period.value);
    case "range":
      return `${period.from}–${period.to}`;
    case "ongoing":
      return `${period.from}–`;
    default:
      return null;
  }
}


export function formatPublicationMeta(item: Item): string | null {
  const year = formatPeriod(item.period);

if (isProject(item)) {
  const parts: string[] = [];
  const year = formatPeriod(item.period);
  if (year) parts.push(year);

  const funder = String(item.funder ?? "").trim();
  if (funder) parts.push(funder);

  return parts.length ? parts.join(" · ") : null;
}

  const publisher = String(item.publisher ?? "").trim();

  if (year && publisher) return `${year} · ${publisher}`;
  if (year) return year;
  if (publisher) return publisher;

  return null;
}

export function getSortYear(item: Item, nowYear = new Date().getFullYear()): number {
  const p = item.period;
  if (!p) return -1;

  if (p.type === "year") return p.value;
  if (p.type === "range") return p.to;
  return nowYear;
}

export type ChipKey = `tag:${KeywordTag}` | `badge:${string}` | `kind:${Kind}`;

export function getChips(item: Item): ChipKey[] {
  const chips: ChipKey[] = [`kind:${getKind(item)}`];

  for (const t of item.tags ?? []) chips.push(`tag:${t}` as ChipKey);

  for (const b of item.badges ?? []) {
    const bb = String(b ?? "").trim();
    if (bb) chips.push(`badge:${bb}` as ChipKey);
  }

  return chips;
}

export function chipLabel(key: ChipKey, keywords: Record<string, { label: string }>) {
  const [k, ...rest] = key.split(":");
  const v = rest.join(":");

  if (k === "tag") return keywords[v]?.label ?? v;
  return v;
}

export function chipTone(key: ChipKey) {
  if (key.startsWith("kind:")) return "border border-white/40 bg-white/20 text-white/85";
  if (key.startsWith("tag:")) return "border border-white/25 bg-transparent text-white/85";
  return "border border-transparent bg-transparent text-white/80";
}

export function sortChips(chips: ChipKey[], keywords: Record<string, { label: string }>) {
  const rank = (x: ChipKey) => (x.startsWith("kind:") ? 0 : x.startsWith("tag:") ? 1 : 2);

  return [...chips].sort((a, b) => {
    const ra = rank(a);
    const rb = rank(b);
    if (ra !== rb) return ra - rb;
    return chipLabel(a, keywords).localeCompare(chipLabel(b, keywords));
  });
}

export function sortItems(a: Item, b: Item) {
  const ka = getKind(a);
  const kb = getKind(b);

  if (ka !== kb) return ka === "Project" ? -1 : 1;
  if (ka === "Publication") {
    const ya = getSortYear(a);
    const yb = getSortYear(b);
    if (ya !== yb) return yb - ya;
  }

  return 0;
}


export function filterItems(items: Item[], selected: ChipKey[]) {
  if (!selected.length) return items;

  const selectedSet = new Set(selected);

  return items.filter((it) => {
    const chips = getChips(it);
    return chips.some((c) => selectedSet.has(c));
  });
}

export function readStoredChips(storageKey: string): ChipKey[] {
  try {
    const raw = sessionStorage.getItem(storageKey);
    if (!raw) return [];

    const arr: unknown = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];

    return arr.filter((x): x is ChipKey => typeof x === "string") as ChipKey[];
  } catch {
    return [];
  }
}

export function writeStoredChips(storageKey: string, keys: ChipKey[]) {
  try {
    sessionStorage.setItem(storageKey, JSON.stringify(keys));
  } catch {
  }
}

export function clearStoredChips(storageKey: string) {
  try {
    sessionStorage.removeItem(storageKey);
  } catch {
  }
}
