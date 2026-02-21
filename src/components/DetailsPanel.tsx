import { KEYWORDS, type KeywordTag } from "../data/detailsData";
import {
  IconKeywordDataAi,
  IconKeywordGovernance,
  IconKeywordImpactMeasurement,
  IconKeywordTransition,
} from "../components/icons";

const KEYWORD_ICON_MAP = {
  governance: IconKeywordGovernance,
  "data-ai": IconKeywordDataAi,
  transition: IconKeywordTransition,
  "impact-measurement": IconKeywordImpactMeasurement,
} as const;

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

export default function DetailsPanel({
  activeTag,
}: {
  activeTag: KeywordTag | null;
}) {
  if (!activeTag) {
    return (
      <div className="rounded-2xl border border-white/15 bg-black/40 p-5">
        <div className="text-[0.85rem] opacity-70">
          Select a keyword to see my perspective.
        </div>
      </div>
    );
  }

  const meta = KEYWORDS[activeTag];
  const text = PHILOSOPHY[activeTag]?.blurb ?? "";
  const Icon = KEYWORD_ICON_MAP[activeTag];

  if (!meta) {
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
          {Icon ? <Icon className="h-4 w-4 opacity-80" /> : null}
        </div>

        <div className="min-w-0">
          <h3 className="text-[0.95rem] uppercase tracking-[0.09em] opacity-90">
            {meta.label}
          </h3>

          <p className="mt-2 text-[0.9rem] leading-relaxed opacity-80">
            {text}
          </p>

          <div className="mt-3 flex items-center gap-3">
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
