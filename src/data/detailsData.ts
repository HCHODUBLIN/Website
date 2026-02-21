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
    label: "AI / ML",
    description:
      "Building LLM/ML-driven classification and enrichment workflows for large-scale analytics systems.",
  },
  transition: {
    label: "Data Engineering",
    description:
      "Building robust ingestion and transformation pipelines across cloud and warehouse systems.",
  },
  "impact-measurement": {
    label: "BI & Reporting",
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
      tags: ["data-ai", "transition", "governance"],
      period: { type: "range", from: 2023, to: 2026 },
      funder: "EU Horizon 2020",
      summary:
        "Led the design of a data platform combining LLM-based classification with structured pipelines to automate ingestion and categorisation across 105 cities.",
      achievements: [
        "Built medallion architecture on Snowflake with dbt, improving classification accuracy from 32% to 74.5%.",
        "Processed 200,000+ records through automated LLM-assisted categorisation and validation workflows.",
        "Stack: Snowflake, dbt, Azure (Data Factory, SQL), Python, LLM/OpenAI API, GitHub Actions.",
        "Published: ACM WSDM 2026 · ACM CIKM 2024.",
      ],
      links: {
        website: "https://cultivate-project.eu/",
      },
    },
    {
      kind: "project",
      id: "proj-divaircity",
      title: "DivAirCity — IoT Analytics for Urban Environmental Monitoring",
      tags: ["impact-measurement", "transition", "governance"],
      funder: "EU Horizon 2020",
      period: { type: "range", from: 2021, to: 2024 },
      summary:
        "Designed analytics architectures for real-time environmental sensor data across multiple European cities.",
      achievements: [
        "Built automated ETL pipelines with Kafka for IoT data streaming under GDPR governance constraints.",
        "Integrated environmental, demographic, and perception data into decision-ready models for city teams.",
        "Stack: Kafka, Python, SQL, Power BI, Azure.",
      ],
      links: {
        website: "https://divaircity.eu/",
      },
    },
    {
      kind: "project",
      id: "proj-shareweave",
      title:
        "SHAREWEAVE: Mapping governance and social impact in food sharing networks",
      tags: ["governance", "impact-measurement", "data-ai", "transition"],
      period: { type: "year", value: 2026 },
      funder: "Research Ireland",
      summary:
        "Principal Investigator for a funded project with FoodCloud, developing an integrated data pipeline that links mapping, impact analysis, and ESG-aligned reporting to capture governance and network-based social impact of food-sharing initiatives.",
      achievements: [
        "Secured €12,000 competitive funding as PI under the Research Ireland New Foundations scheme.",
        "Designed a relational mapping and impact framework combining qualitative and spatial data.",
        "Coordinating a co-learning workshop with civic partners to translate findings into policy-relevant insights.",
      ],
    },
    {
      kind: "project",
      id: "proj-uk2070",
      title: "UK 2070: Civil society, inequality and place-based disadvantage",
      tags: ["governance"],
      funder: "Lincoln Institute of Land Policy / UK 2070 Commission",
      period: { type: "range", from: 2019, to: 2022 },
      summary:
        "Contributed to a programme of policy-facing research on place-based disadvantage, civil society, and food security, producing evidence used in national and local decision-making.",
      achievements: [
        "Place Profiles — Produced analytical profiles used in the UK 2070 Commission report and the English Devolution White Paper, presented findings at the House of Lords on the Levelling Up bill (chaired by Lord Bob Kerslake).",
        "Food Security & Civil Society — Delivered commissioned research for a London borough, including focus groups with food banks and local groups and a policy report.",
        "Civil Society Perspectives on Inequality — Facilitated focus groups across multiple UK locations and delivered working papers to the UK 2070 Commission.",
      ],
    },
    {
      kind: "project",
      id: "proj-phd",
      title: "PhD research – Planning & participation",
      tags: ["governance"],
      summary:
        "Doctoral research on recognition, planning practices and community participation in a diverse Seoul neighbourhood.",
      achievements: [
        "Developed a recognition-focused framework for analysing participation and governance.",
        "Generated empirical findings that underpin later work on inclusion, democracy and data justice.",
        "Published multiple peer-reviewed papers on diversity, governance and planning practice.",
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
