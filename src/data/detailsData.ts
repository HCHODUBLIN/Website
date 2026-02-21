export type KeywordMeta = {
  label: string;
  description: string;
};

export const KEYWORDS = {
  governance: {
    label: "Data Modelling",
    description:
      "Designing clear entities, relationships, and metric logic that make data decision-ready.",
  },
  "data-ai": {
    label: "AI/ML",
    description:
      "Building LLM/ML-driven classification and enrichment workflows for large-scale analytics systems.",
  },
  transition: {
    label: "Data Engineering",
    description:
      "Building robust ingestion and transformation pipelines across cloud and warehouse systems.",
  },
  "impact-measurement": {
    label: "Data Analytics & BI",
    description:
      "Delivering traceable reporting layers and KPI views that support operational and strategic decisions.",
  },
  python: {
    label: "DevOps & Quality",
    description:
      "Applying CI/CD, testing, and automation practices to keep data systems reliable and maintainable.",
  },
} as const satisfies Record<string, KeywordMeta>;

export type KeywordTag = keyof typeof KEYWORDS;

export type LinkSet = {
  website?: string;
  doi?: string;
  pdf?: string;
  github?: string;
  logo?: string;
};

export type Period =
  | { type: "year"; value: number }
  | { type: "range"; from: number; to: number }
  | { type: "ongoing"; from: number };

export type BaseItem = {
  id: string;
  title: string;
  tags?: KeywordTag[];
  badges?: string[];
  summary?: string;
  period?: Period;
  links?: LinkSet;
};

export type Project = BaseItem & {
  kind: "project";
  achievements?: string[];
  funder?: string;
};

export type Publication = BaseItem & {
  kind: "publication";
  authors?: string[];
  publisher?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  month?: string;
  version?: string;
};

export type Item = Project | Publication;

export type DetailsData = {
  keywords: typeof KEYWORDS;
  projects: Project[];
  publications: Publication[];
};

export const DETAILS_DATA: DetailsData = {
  keywords: KEYWORDS,

  projects: [
    {
      kind: "project",
      id: "proj-cultivate",
      title: "CULTIVATE — Analytics Platform for 105 European Cities",
      tags: ["governance", "transition", "data-ai", "python"],
      period: { type: "range", from: 2023, to: 2026 },
      funder: "EU Horizon 2020",
      summary:
        "Built an analytics platform that automates discovery and categorisation of food-sharing initiatives across 105 European cities.",
      achievements: [
        "Designed a medallion architecture (Bronze/Silver/Gold) on Snowflake with dbt, improving classification accuracy from 32% to 74.5%.",
        "Processed 200,000+ records through automated LLM-assisted categorisation and validation workflows.",
        "Implemented automated testing and version-controlled transformation pipelines with CI/CD integration.",
        "Stack: Snowflake, dbt, Azure (Data Factory, SQL), Python, LLM/OpenAI API, GitHub Actions.",
        "Published: 2 peer-reviewed systems papers (ACM) + 2 journal articles.",
      ],
      links: {
        website: "https://cultivate-project.eu/",
        github: "https://github.com/HCHODUBLIN/CULTIVATE",
      },
    },
    {
      kind: "project",
      id: "proj-divaircity",
      title: "DivAirCity — IoT Analytics for Urban Environmental Monitoring",
      tags: ["transition", "impact-measurement"],
      funder: "EU Horizon 2020",
      period: { type: "range", from: 2021, to: 2024 },
      summary:
        "Built data pipelines and analytics models for environmental sensor monitoring across multiple European cities.",
      achievements: [
        "Developed automated ETL workflows integrating IoT, demographic, and perception datasets.",
        "Reduced manual processing time by approximately 10 hours per week through pipeline automation.",
        "Delivered Power BI dashboards for cross-city comparative analysis.",
        "Stack: Kafka, Python, SQL, Power BI, Azure.",
      ],
      links: {
        website: "https://divaircity.eu/",
        github: "https://github.com/HCHODUBLIN/DivAirCity",
      },
    },
    {
      kind: "project",
      id: "proj-shareweave",
      title: "SHAREWEAVE — Social Impact Analytics for Food Systems",
      tags: ["impact-measurement", "data-ai"],
      period: { type: "year", value: 2026 },
      funder: "Research Ireland",
      summary:
        "Designed analytics workflows to evaluate the social impact of food-sharing infrastructures using structured data modelling and AI-assisted categorisation.",
      achievements: [
        "Built classification and reporting pipelines to support impact measurement frameworks.",
        "Developed KPI dashboards for policy and civic stakeholders.",
        "Stack: Snowflake, dbt, Python, Power BI, LLM/OpenAI API.",
        "Published: Ongoing policy and academic outputs.",
      ],
    },
    {
      kind: "project",
      id: "proj-uk2070",
      title: "UK 2070 — Civil Society, Inequality and Place-Based Disadvantage",
      tags: ["impact-measurement"],
      funder: "Lincoln Institute of Land Policy / UK 2070 Commission",
      period: { type: "range", from: 2019, to: 2022 },
      summary:
        "Delivered policy-facing analytics on place-based disadvantage and civil society, producing evidence used in national and local decision-making.",
      achievements: [
        "Findings cited in the English Devolution White Paper.",
        "Presented research at the House of Lords during the Levelling Up Bill process.",
        "Delivered 3+ commissioned analytical reports for national and local institutions.",
        "Conducted cross-city statistical analysis and inequality profiling.",
        "3 peer-reviewed journal articles.",
      ],
    },
    {
      kind: "project",
      id: "proj-phd",
      title: "PhD & Commissioned Research",
      tags: ["impact-measurement"],
      summary:
        "Conducted doctoral research at UCL while delivering commissioned policy analytics projects for national research institutes.",
      achievements: [
        "Delivered 5+ commissioned research reports (KRIHS, AURI, UCL DPU).",
        "Conducted cross-national statistical benchmarking (Korea, UK).",
        "3 peer-reviewed journal articles · 47 published policy analysis entries.",
      ],
      period: { type: "range", from: 2014, to: 2019 },
    },
  ],

  publications: [],
};

export const DETAILS_ITEMS: Item[] = [
  ...DETAILS_DATA.projects,
  ...DETAILS_DATA.publications,
];

export const DETAILS_KEYWORDS = DETAILS_DATA.keywords;
