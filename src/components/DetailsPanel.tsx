// src/components/DetailsPanel.tsx
import { useMemo, useState } from "react";
import { KEYWORDS, type KeywordTag } from "../data/detailsData";

const PHILOSOPHY: Record<KeywordTag, { blurb: string }> = {
  governance: {
    blurb:
      "I approach governance as a process of knowledge production and recognition: how decisions are shaped, whose voices are heard, and which everyday practices are rendered visible or invisible. Rather than treating participation as a formal or top-down mechanism, I understand governance as relational and situated, emerging through ongoing interactions between communities, institutions, and data.",
  },
  "data-ai": {
    blurb:
      "I work with data and digital methods not as neutral technical tools, but as situated systems that shape how social and environmental realities are defined, measured, and acted upon. My approach focuses on identifying data gaps, designing transparent analytical frameworks, and using automation to make socio-environmental information more accessible, accountable, and usable for decision-making.",
  },
  transition: {
    blurb:
      "I understand sustainable transition as an uneven and contested process that unfolds through everyday practices rather than abstract targets alone. My work focuses on how marginalised communities, particularly through practices such as food sharing, navigate, reshape, and reimagine sustainability from below, contributing to agroecological transitions and climate resilience beyond formal policy frameworks.",
  },
  "impact-measurement": {
    blurb:
      "For me, impact measurement is not simply about quantifying outcomes, but about translating broad sustainability goals into meaningful, context-sensitive indicators that reflect lived realities. I develop frameworks and metrics that support accountability and learning, enabling organisations to act with greater clarity while remaining attentive to social inclusion, justice, and local conditions.",
  },
};

// 작은 라인 아이콘(SVG) — 사진 대신 ‘텍스트 덩어리’ 느낌을 줄여줌
function KeywordIcon({ tag }: { tag: KeywordTag }) {
  const common = "h-4 w-4 opacity-80";
  switch (tag) {
    case "governance":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 3l8 4v6c0 5-3.5 8-8 8s-8-3-8-8V7l8-4z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M8 12h8M10 15h4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "data-ai":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path d="M7 7h10v10H7V7z" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M4 9V5h4M20 9V5h-4M4 15v4h4M20 15v4h-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "transition":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M7 14c3-6 7-6 10 0"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M12 3v4M12 17v4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "impact-measurement":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path d="M5 19V5h14v14H5z" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M8 15l2-3 2 2 3-5 1 2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

function clampStyle(expanded: boolean) {
  return expanded ? "" : "line-clamp-2"; // tailwind line-clamp 플러그인 없으면 아래 CSS로 대체 가능
}

export default function DetailsPanel({
  activeTag,
}: {
  activeTag: KeywordTag | null;
}) {
  const [expanded, setExpanded] = useState(false);

  const meta = useMemo(() => {
    if (!activeTag) return null;
    return KEYWORDS[activeTag];
  }, [activeTag]);

  const text = useMemo(() => {
    if (!activeTag) return "";
    return PHILOSOPHY[activeTag]?.blurb ?? "";
  }, [activeTag]);

  if (!activeTag || !meta) {
    return (
      <div className="rounded-2xl border border-white/15 bg-black/40 p-5">
        <div className="text-[0.85rem] opacity-70">
          Select a keyword to see my perspective.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/15 bg-black/40 p-5">
      <div className="flex items-start gap-3">
        <div className="mt-[2px]">
          <KeywordIcon tag={activeTag} />
        </div>
        <div className="min-w-0">
          <h3 className="text-[0.95rem] uppercase tracking-[0.09em] opacity-90">
            {meta.label}
          </h3>

          <p
            className={`mt-2 text-[0.9rem] leading-relaxed opacity-80 ${clampStyle(
              expanded
            )}`}
          >
            {text}
          </p>

          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="text-[0.82rem] underline opacity-70 hover:opacity-100"
            >
              {expanded ? "Show less" : "Read more"}
            </button>

            <a
              href="#projects-publications"
              className="text-[0.82rem] underline opacity-70 hover:opacity-100"
              onClick={() => {
                window.location.hash = "#projects-publications";
              }}
            >
              View projects & publications →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
