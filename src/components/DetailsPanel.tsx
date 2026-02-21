import { KEYWORDS, type KeywordTag } from "../data/detailsData";
import {
  IconKeywordDataAi,
  IconKeywordGovernance,
  IconKeywordImpactMeasurement,
  IconKeywordTransition,
} from "../components/icons";
import type React from "react";

const KEYWORD_ICON_MAP: Partial<
  Record<KeywordTag, React.ComponentType<{ className?: string }>>
> = {
  governance: IconKeywordGovernance,
  "data-ai": IconKeywordDataAi,
  transition: IconKeywordTransition,
  "impact-measurement": IconKeywordImpactMeasurement,
};

const PHILOSOPHY: Record<KeywordTag, { blurb: string }> = {
  governance: {
    blurb:
      "I design data models that translate fragmented inputs into clear entities, relationships, and metrics. This keeps analytical logic consistent, traceable, and directly usable for decision-making across teams.",
  },
  "data-ai": {
    blurb:
      "I build analytics platforms and data pipelines that make complex, fragmented data usable at scale. My current work centres on designing medallion architectures (Bronze/Silver/Gold) on Snowflake, writing dbt transformation layers, and building LLM-based classification systems that process 200,000+ records with measurable accuracy improvements. My path into data engineering came through sustainability and urban research, which means I approach every technical decision with a question: who uses this data, and what decision does it need to support? This combination of engineering depth and domain-aware design thinking is what I bring to every project. Stack: Snowflake, dbt, Python, SQL, Azure (Data Factory, SQL, Blob Storage), Power BI, LLM/OpenAI API, Kafka, GitHub Actions CI/CD.",
  },
  transition: {
    blurb:
      "I build resilient data pipelines for ingestion, transformation, and quality controls, so complex datasets become production-ready assets rather than one-off analyses.",
  },
  "impact-measurement": {
    blurb:
      "I deliver BI and reporting layers that connect technical pipelines to business decisions, turning model outputs into clear KPI views for operational and strategic use.",
  },
  python: {
    blurb:
      "I apply DevOps and quality practices across analytics workflows, including CI/CD, repeatable tests, and automation that keeps data systems reliable as they scale.",
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
              href="#projects"
              className="text-[0.82rem] underline opacity-70 hover:opacity-100"
              onClick={() => {
                window.location.hash = "#projects";
              }}
            >
              View projects →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
