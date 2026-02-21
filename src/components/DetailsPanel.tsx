import { KEYWORDS, type KeywordTag } from "../data/detailsData";
import {
  IconKeywordDataAi,
  IconKeywordDevOpsQuality,
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
  python: IconKeywordDevOpsQuality,
};

const PHILOSOPHY: Record<KeywordTag, { blurb: string }> = {
  governance: {
    blurb:
      "Designing medallion architectures (Bronze/Silver/Gold), dimensional models, and entity resolution systems that turn fragmented data into trusted, decision-ready structures. Focus on data quality measurement (precision, recall, F1) and governance-compliant schema design.",
  },
  "data-ai": {
    blurb:
      "Developing LLM-based classification pipelines that process 200,000+ records with human-in-the-loop evaluation. Iterative prompt engineering and accuracy improvement (32% → 74.5%) through structured evaluation frameworks.",
  },
  transition: {
    blurb:
      "Building automated pipelines that ingest, transform, and deliver data at scale. Working with Snowflake, dbt, Kafka, and Airflow to create reproducible, tested, and version-controlled data workflows.",
  },
  "impact-measurement": {
    blurb:
      "Translating complex data into actionable insights through Power BI dashboards, KPI frameworks, and executive reporting. Making analytical outputs usable and trusted by non-technical stakeholders and decision-makers.",
  },
  python: {
    blurb:
      "CI/CD with GitHub Actions, automated testing (dbt tests, schema validation), Docker containerisation, and comprehensive documentation (architecture decision records, ERDs, data dictionaries).",
  },
};

const STACK_LINE =
  "Stack: Snowflake · dbt · SQL · Python · Power BI · LLM/OpenAI API · Kafka · GitHub Actions";
const CLOUD_LINE =
  "Cloud: Azure (Data Factory, SQL, Blob Storage) — AZ-900 certified";

export default function DetailsPanel({
  activeTag,
}: {
  activeTag: KeywordTag | null;
}) {
  if (!activeTag) {
    return (
      <div className="rounded-2xl border border-white/15 bg-black/40 p-5">
        <div className="text-[0.85rem] opacity-70">
          Select a capability to see details.
        </div>
        <div className="mt-3 border-t border-white/10 pt-3 text-[0.78rem] leading-relaxed opacity-75">
          <p className="m-0">{STACK_LINE}</p>
          <p className="m-0 mt-1">{CLOUD_LINE}</p>
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
          Select a capability to see details.
        </div>
        <div className="mt-3 border-t border-white/10 pt-3 text-[0.78rem] leading-relaxed opacity-75">
          <p className="m-0">{STACK_LINE}</p>
          <p className="m-0 mt-1">{CLOUD_LINE}</p>
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

          <div className="mt-3 border-t border-white/10 pt-3 text-[0.78rem] leading-relaxed opacity-75">
            <p className="m-0">{STACK_LINE}</p>
            <p className="m-0 mt-1">{CLOUD_LINE}</p>
          </div>

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
