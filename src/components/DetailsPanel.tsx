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
      "I design Snowflake warehouse layers that keep raw, transformed, and curated data clearly separated while preserving lineage and auditability. My focus is reliable performance, transparent ownership, and models that downstream teams can trust for operational and strategic decisions.",
  },
  "data-ai": {
    blurb:
      "I build analytics platforms and data pipelines that make complex, fragmented data usable at scale. My current work centres on designing medallion architectures (Bronze/Silver/Gold) on Snowflake, writing dbt transformation layers, and building LLM-based classification systems that process 200,000+ records with measurable accuracy improvements. My path into data engineering came through sustainability and urban research, which means I approach every technical decision with a question: who uses this data, and what decision does it need to support? This combination of engineering depth and domain-aware design thinking is what I bring to every project. Stack: Snowflake, dbt, Python, SQL, Azure (Data Factory, SQL, Blob Storage), Power BI, LLM/OpenAI API, Kafka, GitHub Actions CI/CD.",
  },
  transition: {
    blurb:
      "I use dbt to translate business and research logic into modular, testable transformation layers. Clear model contracts, documentation, and reproducible workflows make complex metrics explainable and keep analytics outputs stable as upstream systems evolve.",
  },
  "impact-measurement": {
    blurb:
      "I treat data modelling as product design for decision systems. I define entities, relationships, and metric logic so teams can move from fragmented records to consistent, decision-ready views with explicit assumptions and traceable logic.",
  },
  python: {
    blurb:
      "I use Python for ingestion, enrichment, validation, and quality controls across large datasets. The goal is repeatable, observable workflows that reduce manual review and improve reliability from source capture to model output.",
  },
  azure: {
    blurb:
      "I build and orchestrate Azure-based data workflows using Data Factory, Azure SQL, and Blob Storage. I focus on robust scheduling, secure handoffs between services, and predictable operations that support production analytics.",
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
