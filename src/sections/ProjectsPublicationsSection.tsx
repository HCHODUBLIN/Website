import { useEffect, useMemo, useState } from "react";
import {
  DETAILS_DATA,
  DETAILS_ITEMS,
  type KeywordTag,
} from "../data/detailsData";

import {
  type ChipKey,
  type RightAction,
  chipLabel,
  chipTone,
  filterItems,
  formatPublicationMeta,
  getChips,
  getRightActions,
  readStoredChips,
  sortChips,
  sortItems,
  writeStoredChips,
  clearStoredChips,
  isProject,
} from "../data/itemHelpers";

const STORAGE_KEY = "pp_selected_chips_v1";

function isFilterChip(c: ChipKey) {
  return c.startsWith("tag:") || c.startsWith("kind:");
}

function IconLink() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
      />
    </svg>
  );
}

function IconPdf() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 15h16.8" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3c2.6 2.5 4.2 5.7 4.2 9S14.6 18.5 12 21c-2.6-2.5-4.2-5.7-4.2-9S9.4 5.5 12 3Z"
      />
    </svg>
  );
}

function Chip({
  k,
  active,
  onToggle,
}: {
  k: ChipKey;
  active: boolean;
  onToggle: () => void;
}) {
  const base =
    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.06em] leading-none transition-[opacity,transform,background-color,color,border-color] duration-150";

  const idleTone = chipTone(k);
  const activeTone =
    "bg-white/30 text-white border border-white/20 shadow-[0_0_0_1px_rgba(255,255,255,0.6)]";

  return (
    <button
      type="button"
      onClick={onToggle}
      className={[
        base,
        active ? activeTone : idleTone,
        active ? "opacity-100" : "opacity-75 hover:opacity-95",
      ].join(" ")}
      title={chipLabel(k, DETAILS_DATA.keywords)}
    >
      <span className="whitespace-nowrap">
        {chipLabel(k, DETAILS_DATA.keywords)}
      </span>
    </button>
  );
}

function RightActions({
  itemId,
  actions,
}: {
  itemId: string;
  actions: RightAction[];
}) {
  if (!actions.length) return null;

  return (
    <div className="flex shrink-0 flex-col items-end gap-2">
      {actions
        .filter((a) => a.kind !== "logo")
        .map((a) => {
          const icon =
            a.kind === "doi" ? (
              <IconLink />
            ) : a.kind === "pdf" ? (
              <IconPdf />
            ) : (
              <IconGlobe />
            );

          const tooltip =
            a.kind === "doi" ? "DOI" : a.kind === "pdf" ? "PDF" : "Website";

          const label =
            a.kind === "doi"
              ? "Open DOI"
              : a.kind === "pdf"
              ? "Open PDF"
              : "Open website";

          return (
            <a
              key={`${itemId}:${a.kind}`}
              href={a.href}
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex h-9 w-9 items-center justify-center
                rounded-full border border-white/30
                opacity-80 hover:opacity-100
                transition-[opacity,transform] duration-200
                hover:-translate-y-[1px]
              "
              title={tooltip}
              aria-label={label}
              onClick={(e) => e.stopPropagation()}
            >
              {icon}
            </a>
          );
        })}
    </div>
  );
}

export default function ProjectsPublicationsSection({
  embedded = false,
  defaultTag = null,
}: {
  embedded?: boolean;
  defaultTag?: KeywordTag | null;
}) {
  const [selected, setSelected] = useState<Set<ChipKey>>(() => {
    const stored = readStoredChips(STORAGE_KEY);
    return new Set(stored);
  });

  const [expandedAchievements, setExpandedAchievements] = useState<Set<string>>(
    () => new Set()
  );

  const toggleAchievements = (itemId: string) => {
    setExpandedAchievements((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      return next;
    });
  };

  useEffect(() => {
    if (!defaultTag) {
      clearStoredChips(STORAGE_KEY);
      setSelected(new Set());
      return;
    }

    const tagKey = `tag:${defaultTag}` as ChipKey;

    setSelected((prev) => {
      const next = new Set(
        Array.from(prev).filter((k) => !k.startsWith("tag:"))
      );
      next.add(tagKey);
      return next;
    });
  }, [defaultTag]);

  useEffect(() => {
    writeStoredChips(STORAGE_KEY, Array.from(selected));
  }, [selected]);

  const { allChips, sortedItems } = useMemo(() => {
    const chipSet = new Set<ChipKey>();

    for (const it of DETAILS_ITEMS) {
      for (const c of getChips(it)) {
        if (isFilterChip(c)) chipSet.add(c);
      }
    }

    return {
      allChips: sortChips(Array.from(chipSet), DETAILS_DATA.keywords),
      sortedItems: [...DETAILS_ITEMS].sort(sortItems),
    };
  }, []);

  const selectedArr = useMemo(() => Array.from(selected), [selected]);

  const filtered = useMemo(() => {
    return filterItems(sortedItems, selectedArr);
  }, [sortedItems, selectedArr]);

  const toggle = (k: ChipKey) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  };

  const clear = () => {
    clearStoredChips(STORAGE_KEY);
    setSelected(new Set());
  };

  return (
    <section
      className={embedded ? "py-0" : "py-16"}
      id={embedded ? undefined : "projects-publications"}
    >
      <div
        className={
          embedded
            ? "grid h-full grid-cols-[260px_minmax(0,1fr)] gap-6 max-[900px]:grid-cols-1"
            : ""
        }
      >
        <aside
          className={
            embedded
              ? `
        sticky top-6
        h-[calc(100vh-3rem)]
        self-start
        rounded-2xl
        border border-white/10
        bg-black/30
        p-4
      `
              : ""
          }
        >
          <div className={embedded ? "bg-transparent" : ""}>
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-[0.9rem] uppercase tracking-[0.1em] opacity-90">
                Filters
              </h3>

              {selected.size ? (
                <button
                  type="button"
                  onClick={clear}
                  className="text-[0.78rem] underline opacity-70 hover:opacity-100"
                >
                  Clear
                </button>
              ) : null}
            </div>

            <div className="mt-2 text-[0.8rem] opacity-65">
              {filtered.length} items
            </div>
          </div>

          <div
            className={
              embedded
                ? "mt-4 max-h-[calc(100vh-12rem)] overflow-auto pr-2 pl-1 pt-2 pb-2"
                : "mt-4"
            }
          >
            <div className="flex flex-wrap gap-2">
              {allChips.map((c) => (
                <Chip
                  key={c}
                  k={c}
                  active={selected.has(c)}
                  onToggle={() => toggle(c)}
                />
              ))}
            </div>
          </div>
        </aside>

        <div className={embedded ? "min-w-0" : ""}>
          {!embedded ? (
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-[0.95rem] uppercase tracking-[0.1em] opacity-90">
                Projects & Publications
              </h3>

              <div className="flex items-center gap-3">
                {selected.size ? (
                  <button
                    type="button"
                    onClick={clear}
                    className="text-[0.82rem] underline opacity-70 hover:opacity-100"
                  >
                    Clear filters
                  </button>
                ) : null}
                <div className="text-[0.82rem] opacity-65">
                  {filtered.length} items
                </div>
              </div>
            </div>
          ) : null}

          <ul className={embedded ? "space-y-3" : "mt-6 space-y-3"}>
            {filtered.map((it) => {
              const meta = formatPublicationMeta(it);
              const actions = getRightActions(it);

              const project = isProject(it) ? it : null;
              const achievements = project?.achievements ?? [];
              const hasAchievements = achievements.length > 0;

              const isExpanded = expandedAchievements.has(it.id);

              return (
                <li
                  key={it.id}
                  className="rounded-2xl border border-white/40 bg-black/40 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      {meta ? (
                        <div className="text-[0.82rem] opacity-65">{meta}</div>
                      ) : null}

                      <div className="max-w-[62ch]">
                        <h4 className="mt-2 text-[0.95rem] leading-snug">
                          {it.title}
                        </h4>

                        {it.summary ? (
                          <p className="mt-2 text-[0.9rem] leading-relaxed opacity-80">
                            {it.summary}
                          </p>
                        ) : null}

                        {hasAchievements ? (
                          <div className="mt-3">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleAchievements(it.id);
                              }}
                              className="
                                inline-flex items-center gap-2
                                text-[0.82rem] underline
                                opacity-75 hover:opacity-100
                              "
                              aria-expanded={isExpanded}
                              aria-controls={`ach-${it.id}`}
                            >
                              {isExpanded
                                ? "Hide achievements"
                                : "Show achievements"}
                            </button>

                            {isExpanded ? (
                              <ul
                                id={`ach-${it.id}`}
                                className="mt-2 list-disc pl-5 text-[0.88rem] opacity-85"
                              >
                                {achievements.map((a) => (
                                  <li key={a}>{a}</li>
                                ))}
                              </ul>
                            ) : null}
                          </div>
                        ) : null}
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {getChips(it).map((c) => (
                          <Chip
                            key={`${it.id}:${c}`}
                            k={c}
                            active={selected.has(c)}
                            onToggle={() => toggle(c)}
                          />
                        ))}
                      </div>
                    </div>

                    <RightActions itemId={it.id} actions={actions} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
