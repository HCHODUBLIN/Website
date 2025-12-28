export type KeywordMeta = {
  label: string;
  description: string;
};

export const KEYWORDS = {
  governance: {
    label: "Governance",
    description:
      "Experience in governance, participation and multi-stakeholder coordination, supporting evidence-based decision-making across public institutions, EU programmes and civil society partners.",
  },
  "data-ai": {
    label: "Data & AI",
    description:
      "SQL engineering, ETL design, LLM/ML modelling and automated classification systems used to improve data accuracy, reduce manual processing and enable scalable analytics.",
  },
  transition: {
    label: "Sustainable transition",
    description:
      "Work on sustainable and just transitions in urban and food systems, combining indicators, data governance frameworks and cross-sector partnerships.",
  },
  "impact-measurement": {
    label: "Impact measurement",
    description:
      "Development of CSRD- and GRI-aligned indicators, KPI frameworks and reporting structures that strengthen compliance, auditability and organisational transparency.",
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

/* ----------------------------------
 * Raw data (no formatting logic)
 * ---------------------------------- */

export const DETAILS_DATA: DetailsData = {
  keywords: KEYWORDS,

  projects: [
    {
      kind: "project",
      id: "proj-cultivate",
      title: "CULTIVATE – EU Horizon 2020",
      tags: ["impact-measurement", "data-ai", "transition"],
      badges: ["EU Horizon"],
      summary:
        "Lead for EU-wide mapping and analytics, combining web data, LLM/ML models and GIS to analyse food systems across 100+ cities.",
      achievements: [
        "Improved automated classification accuracy from 32% to 74% through LLM optimisation.",
        "Reduced manual data review time by approximately 50% using Azure Data Factory and automated workflows.",
        "Presented sustainability insights to 1,000+ policymakers, NGOs and academics to support evidence-based decisions.",
      ],
            links: {
        website: "https://cultivate-project.eu/",
    },
        },
    {
      kind: "project",
      id: "proj-divaircity",
      title: "DivAirCity – Inclusive data framework (EU Horizon 2020)",
      tags: ["data-ai", "impact-measurement", "transition", "governance"],
      badges: ["EU Horizon"],
      summary:
        "Led the design of an inclusive data framework linking environmental, demographic and community-perceived air quality data across multiple European cities.",
      achievements: [
        "Built cloud-based ETL pipelines integrating multi-source city data under GDPR requirements.",
        "Developed inclusion-focused indicators for monitoring air quality and exposure across different population groups.",
        "Supported cross-city governance processes and decarbonisation analytics for partner municipalities.",
      ],
      links: {
        website: "https://divaircity.eu/",
      },
      period: { type: "range", from: 2020, to: 2024 },
    },
    {
      kind: "project",
      id: "proj-shareweave",
      title: "SHAREWEAVE – Research Ireland New Foundations (PI)",
      tags: ["governance", "impact-measurement", "data-ai", "transition"],
      summary:
        "Principal Investigator for a funded project with FoodCloud, co-developing a methodology to analyse the social impact of food sharing in Dublin.",
      achievements: [
        "Secured €12,000 competitive funding as PI under the Research Ireland New Foundations scheme.",
        "Designed a relational mapping and impact framework combining qualitative and spatial data.",
        "Coordinating a co-learning workshop with civic partners to translate findings into policy-relevant insights.",
      ],
    },
    {
      kind: "project",
      id: "proj-uk2070",
      title: "Place Profiles: Localizing Understandings of Disadvantage",
      tags: ["governance", "transition"],
      summary: "Analysed place-based inequalities.",
      achievements: [
        "Produced analytical profiles used in the UK 2070 Commission report and the English Devolution White Paper.",
        "Delivered evidence syntheses and policy briefs for government-facing publications.",
        "Combined quantitative indicators with civil-society insight to inform regional investment priorities.",
      ],
    },
    {
      kind: "project",
      id: "proj-phd",
      title: "PhD research – Planning & participation",
      tags: ["governance", "transition"],
      summary:
        "Doctoral research on recognition, planning practices and community participation in a diverse Seoul neighbourhood.",
      achievements: [
        "Developed a recognition-focused framework for analysing participation and governance.",
        "Generated empirical findings that underpin later work on inclusion, democracy and data justice.",
        "Published multiple peer-reviewed papers on diversity, governance and planning practice.",
      ],
      period: { type: "range", from: 2015, to: 2019 },
    },
  ],

  publications: [
    {
      kind: "publication",
      id: "pub-geoforum-2025",
      title:
        "Evolving foodscapes: Tracing trajectories of urban food sharing initiatives for just urban food transitions",
      authors: ["A. R. Davies", "H. Cho", "M. Vedoa", "R. Martinez Varderi", "A. M. Gatejel"],
      publisher: "Geoforum",
      period: { type: "year", value: 2025 },
      links: { doi: "10.1016/j.geoforum.2025.104318" },
      tags: ["transition", "governance"],
      badges: ["Peer-reviewed", "Journal paper"],
      summary:
        "Traces how food sharing initiatives evolve over time and what these trajectories imply for just urban food transitions.",
    },
    {
      kind: "publication",
      id: "pub-ppp-2025",
      title:
        "Assemblages of urban food sharing initiatives: actions, interactions and connections",
      authors: ["A. R. Davies", "H. Cho", "A. McGeever"],
      publisher: "People, Place and Policy",
      period: { type: "year", value: 2025 },
      volume: "19",
      issue: "1",
      pages: "1–19",
      links: { doi: "10.3351/ppp.2025.6842985999" },
      tags: ["transition", "governance"],
      badges: ["Peer-reviewed", "Journal paper"],
      summary:
        "Uses assemblage thinking to explain how food sharing initiatives interrelate and shape local care infrastructures.",
    },
    {
      kind: "publication",
      id: "pub-asian-geographer-2023",
      title:
        "Inner-group and inter-group relations in Seoul participatory planning: Revisiting the concept of social capital",
      authors: ["H. Cho"],
      publisher: "Asian Geographer",
      period: { type: "year", value: 2023 },
      pages: "1–15",
      links: { doi: "10.1080/10225706.2022.2038221" },
      tags: ["governance"],
      badges: ["Peer-reviewed", "Journal paper"],
      summary:
        "Revisits social capital through inner- and inter-group dynamics in participatory planning processes in Seoul.",
    },
    {
      kind: "publication",
      id: "pub-jrectc-2022",
      title: "Imagining diversity in Seoul: Gender and immigrant identities",
      authors: ["H. Cho"],
      publisher: "Journal of Race, Ethnicity and the City",
      period: { type: "year", value: 2022 },
      pages: "1–18",
      links: { doi: "10.1080/26884674.2022.2051778" },
      tags: ["governance"],
      badges: ["Peer-reviewed", "Journal paper"],
      summary:
        "Examines how diversity is imagined and governed through gendered and immigrant identities in Seoul.",
    },
    {
      kind: "publication",
      id: "pub-urban-studies-2021",
      title:
        "The politics of recognition and planning practices in diverse neighbourhoods: Korean Chinese in Garibong-dong, Seoul",
      authors: ["H. Cho"],
      publisher: "Urban Studies",
      period: { type: "year", value: 2021 },
      volume: "58",
      issue: "14",
      pages: "2863–2879",
      links: { doi: "10.1177/0042098020970450" },
      tags: ["governance"],
      badges: ["Peer-reviewed", "Journal paper"],
      summary:
        "Develops a recognition perspective on planning practices and minority experiences in a diverse neighbourhood in Seoul.",
    },
    {
      kind: "publication",
      id: "pub-cikm-2024",
      title: "LLM-based Automated Web Retrieval and Text Classification of Food Sharing Initiatives",
      authors: ["H. Wu", "H. Cho", "A. R. Davies", "G. J. F. Jones"],
      publisher:
        "Proceedings of the 33rd ACM International Conference on Information and Knowledge Management (CIKM)",
      period: { type: "year", value: 2024 },
      pages: "4983–4990",
      month: "October",
      links: { doi: "10.1145/3627673.3680090" },
      tags: ["data-ai"],
      badges: ["Peer-reviewed", "Conference paper"],
      summary:
        "Introduces an LLM-driven pipeline for retrieving and classifying food sharing initiatives from web data.",
    },
    {
      kind: "publication",
      id: "divaircity-d21",
      title: "Key performance indicators and monitoring metrics for DivAirCity specifications",
      authors: [
        "H. Cho",
        "S. Yontem",
        "E. West",
        "E. Yontem",
        "K. E. Hilding-Hamann",
        "L. Blond",
      ],
      period: { type: "year", value: 2022 },
      links: {
        pdf: "https://divaircity.eu/wp-content/uploads/2024/01/DivAirCity_KPIs-and-monitoring-metrics-for-DivAirCity-specifications-1.pdf",
      },
      tags: ["impact-measurement", "data-ai", "governance", "transition"],
      badges: ["Project deliverable"],
      summary:
        "Defines key performance indicators and monitoring metrics for cross-city evaluation of environmental, social, and health impacts.",
    },
    {
      kind: "publication",
      id: "divaircity-d22",
      title: "Digital Innovation and D&I Data Management Framework",
      authors: ["H. Cho", "E. Yontem", "S. Yontem", "E. West"],
      period: { type: "year", value: 2022 },
      links: {
        pdf: "https://divaircity.eu/wp-content/uploads/2024/01/DivAirCity_Digital-Innovation-and-DI-Data-Management-Framework.pdf",
      },
      tags: ["data-ai", "impact-measurement", "governance", "transition"],
      badges: ["Project deliverable"],
      summary:
        "Sets out a data management framework for digital innovation and diversity & inclusion, including pipelines, governance, interoperability, and GDPR-aligned practices.",
    },
    {
      kind: "publication",
      id: "divaircity-d24",
      title: "DivAirCity pilot cities data sources and their acquisition framework",
      authors: [
        "K. E. Hilding-Hamann",
        "L. Blond",
        "F. Cappelluti",
        "H. Cho",
        "E. Yontem",
        "S. Yontem",
        "T.-B. Ottosen",
        "L. M. F. Rasmussen",
      ],
      period: { type: "year", value: 2022 },
      links: {
        pdf: "https://divaircity.eu/wp-content/uploads/2024/01/DivAirCity_pilot-cities-data-sources-and-their-acquisition-framework-1.pdf",
      },
      tags: ["data-ai", "governance", "impact-measurement", "transition"],
      badges: ["Project deliverable"],
      summary:
        "Documents pilot-city data sources and provides a framework for data acquisition, harmonisation, and governance across cities.",
    },
    {
      kind: "publication",
      id: "cultivate-briefing-zenodo",
      title: "CULTIVATE briefing note: Food sharing landscapes in hub city locations",
      authors: ["A. Davies", "H. Cho", "A.-M. Gatejel", "R. Martinez Varderi", "M. Vedoa"],
      publisher: "Zenodo",
      period: { type: "year", value: 2024 },
      links: { doi: "10.5281/zenodo.11030355" },
      tags: ["transition", "governance"],
      badges: ["Project deliverable"],
      summary:
        "Policy-oriented briefing note analysing food sharing landscapes across hub city locations, with implications for urban food governance.",
    },
  ],
};

export const DETAILS_ITEMS: Item[] = [
  ...DETAILS_DATA.projects,
  ...DETAILS_DATA.publications,
];

export const DETAILS_KEYWORDS = DETAILS_DATA.keywords;
