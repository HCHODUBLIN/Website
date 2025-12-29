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
      title: "CULTIVATE: The food sharing compass platform",
      tags: ["data-ai", "transition", "governance"],
      period: { type: "range", from: 2023, to: 2026 },
      funder: "EU Horizon 2020",
      summary:
        "As part of Trinity College Dublin’s CULTIVATE project team, led multi-city mapping and analytics of food-sharing initiatives, translating large-scale web and GIS data into evidence to support city-level sustainability impact assessment and reporting.",
      achievements: [
        "Enabled city-level sustainability impact reporting by automating the mapping and analysis of food-sharing initiatives across 100+ cities, providing comparable evidence for policy, funding, and governance decisions.",
        "Designed and implemented an automated web-mining and GIS-based pipeline for mapping food-sharing initiatives.",
        "Scaled mapping to 100+ cities, identifying over 4,000 local food-sharing initiatives using the CULTIVATE automation methodology.",
        "Reduced mapping timelines from ~3 months per city to a one-day automated multi-city pipeline with expert review, covering 100+ cities in 1–2 months.",
        "Improved automated classification accuracy from 32% to 74% through iterative LLM optimisation.",
        "Reduced manual data review time by approximately 50% using Azure Data Factory and automated workflows.",
        "Presented sustainability insights to policymakers, NGOs, and academic audiences to support evidence-based decision-making.",
      ],
      links: {
        website: "https://cultivate-project.eu/",
      },
    },
    {
      kind: "project",
      id: "proj-divaircity",
      title:
        "DivAirCity: The power of Diversity & Inclusion for climate neutral cities",
      tags: ["impact-measurement", "transition", "governance"],
      funder: "EU Horizon 2020",
      period: { type: "range", from: 2021, to: 2024 },
      summary:
        "As part of the EcoWise team, led the design of an inclusive data framework linking environmental, demographic, and community-perceived air quality data across multiple European cities.",
      achievements: [
        "Reviewed over 200 KPIs and consolidated them into 63 core indicators, aligned with data acquisition protocols and implemented through an automated analytics pipeline with real-time visualisation, reducing reporting time by approximately 50%.",
        "Built cloud-based ETL pipelines integrating multi-source city data under GDPR requirements.",
        "Developed inclusion-focused indicators for monitoring air quality and exposure across different population groups.",
        "Supported cross-city governance processes and decarbonisation analytics for partner municipalities.",
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

  publications: [
    {
      kind: "publication",
      id: "pub-geoforum-2025",
      title:
        "Evolving foodscapes: Tracing trajectories of urban food sharing initiatives for just urban food transitions",
      authors: [
        "A. R. Davies",
        "H. Cho",
        "M. Vedoa",
        "R. Martinez Varderi",
        "A. M. Gatejel",
      ],
      publisher: "Geoforum",
      period: { type: "year", value: 2025 },
      links: { doi: "10.1016/j.geoforum.2025.104318" },
      tags: ["transition", "governance"],
      badges: ["Journal paper"],
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
      badges: ["Journal paper"],
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
      badges: ["Journal paper"],
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
      badges: ["Journal paper"],
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
      badges: ["Journal paper"],
      summary:
        "Develops a recognition perspective on planning practices and minority experiences in a diverse neighbourhood in Seoul.",
    },
    {
      kind: "publication",
      id: "pub-cikm-2024",
      title:
        "LLM-based Automated Web Retrieval and Text Classification of Food Sharing Initiatives",
      authors: ["H. Wu", "H. Cho", "A. R. Davies", "G. J. F. Jones"],
      publisher: "ACM CIKM",
      period: { type: "year", value: 2024 },
      pages: "4983–4990",
      month: "October",
      links: { doi: "10.1145/3627673.3680090" },
      tags: ["data-ai"],
      badges: ["Conference paper"],
      summary:
        "Introduces an LLM-driven pipeline for retrieving and classifying food sharing initiatives from web data.",
    },
    {
      kind: "publication",
      id: "divaircity-d21",
      title:
        "Key performance indicators and monitoring metrics for DivAirCity specifications",
      authors: [
        "H. Cho",
        "S. Yontem",
        "E. West",
        "E. Yontem",
        "K. E. Hilding-Hamann",
        "L. Blond",
      ],
      period: { type: "year", value: 2022 },
      publisher: "DivAirCity",
      links: {
        pdf: "https://divaircity.eu/wp-content/uploads/2024/01/DivAirCity_KPIs-and-monitoring-metrics-for-DivAirCity-specifications-1.pdf",
      },
      tags: ["impact-measurement"],
      badges: ["Report"],
      summary:
        "Defines key performance indicators and monitoring metrics for cross-city evaluation of environmental, social, and health impacts.",
    },
    {
      kind: "publication",
      id: "divaircity-d22",
      publisher: "DivAirCity",
      title: "Digital Innovation and D&I Data Management Framework",
      authors: ["H. Cho", "E. Yontem", "S. Yontem", "E. West"],
      period: { type: "year", value: 2022 },
      links: {
        pdf: "https://divaircity.eu/wp-content/uploads/2024/01/DivAirCity_Digital-Innovation-and-DI-Data-Management-Framework.pdf",
      },
      tags: ["impact-measurement"],
      badges: ["Report"],
      summary:
        "Sets out a data management framework for digital innovation and diversity & inclusion, including pipelines, governance, interoperability, and GDPR-aligned practices.",
    },
    {
      kind: "publication",
      id: "divaircity-d24",
      publisher: "CULTIVATE",
      title:
        "DivAirCity pilot cities data sources and their acquisition framework",
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
      tags: ["impact-measurement"],
      badges: ["Report"],
      summary:
        "Documents pilot-city data sources and provides a framework for data acquisition, harmonisation, and governance across cities.",
    },
    {
      kind: "publication",
      id: "cultivate-briefing-zenodo",
      title:
        "CULTIVATE briefing note: Food sharing landscapes in hub city locations",
      authors: [
        "A. Davies",
        "H. Cho",
        "A.-M. Gatejel",
        "R. Martinez Varderi",
        "M. Vedoa",
      ],
      publisher: "CULTIVATE",
      period: { type: "year", value: 2024 },
      links: { doi: "10.5281/zenodo.11030355" },
      tags: ["transition", "governance"],
      badges: ["Report"],
      summary:
        "Policy-oriented briefing note analysing food sharing landscapes across hub city locations, with implications for urban food governance.",
    },
    {
      kind: "publication",
      id: "pub-civil-society-focus-groups-2020",
      title:
        "Civil Society Perspectives on Inequality: Focus Group Research Findings",
      authors: ["L. Natarajan", "E. Ilie", "H. Cho"],
      publisher: "Sheffield University",
      period: { type: "year", value: 2020 },
      tags: ["governance"],
      badges: ["Report"],
      links: {
        pdf: "https://uk2070.org.uk/wp-content/uploads/2020/02/UK2070-Civil-Society-Perspectives-UCL-2020.pdf",
      },
      summary:
        "Presents findings from focus group research with civil society organisations across multiple UK cities.",
    },
    {
      kind: "publication",
      id: "pub-bame-awarding-gap-2020",
      title: "BAME Awarding Gap – Research Findings",
      authors: ["Y. Beebeejaun", "H. Cho", "A. Juangbhanich"],
      publisher: "University College London",
      period: { type: "year", value: 2020 },
      tags: ["governance"],
      badges: ["Report"],
      summary:
        "Investigates awarding gaps affecting BAME students and implications for higher education policy.",
    },
    {
      kind: "publication",
      id: "pub-civil-society-inequality-2021",
      title: "A Civil Society Perspective on Inequalities: the COVID revision",
      authors: ["H. Cho", "E. Ilie", "L. Natarajan"],
      publisher: "UK 2070 Commission Working Paper Series",
      period: { type: "year", value: 2021 },
      tags: ["governance"],
      badges: ["Report"],
      summary:
        "Analyses how civil society organisations experienced and responded to inequalities during the COVID-19 period.",
    },
    {
      kind: "publication",
      id: "pub-place-profiles-2022",
      title: "Place Profiles: Localizing Understandings of Disadvantage",
      authors: ["L. Natarajan", "H. Cho"],
      publisher: "Lincoln Institute of Land Policy",
      period: { type: "year", value: 2022 },
      links: {
        pdf: "https://www.lincolninst.edu/publications/working-papers/place-profiles-localizing-understandings-disadvantage/",
      },
      tags: ["governance"],
      badges: ["Report"],
      summary:
        "Develops place-based analytical profiles to support evidence-led regional policy and investment decisions.",
    },
    {
      kind: "publication",
      id: "pub-food-security-civil-society-2022",
      title: "Food Security & Civil Society",
      authors: [
        "L. Natarajan",
        "G. Grimble",
        "H. Cho",
        "M. Armstrong",
        "A. Woodward",
      ],
      publisher: "University College London",
      period: { type: "year", value: 2022 },
      links: {
        pdf: "https://discovery.ucl.ac.uk/id/eprint/10175784/1/ucl_2022_food_security_findings.pdf",
      },
      tags: ["governance"],
      badges: ["Report"],
      summary:
        "Commissioned report examining the role of civil society organisations in addressing food insecurity at the local level.",
    },
    {
      kind: "publication",
      id: "pub-food-resilient-urbanism-2024",
      title: "Food resilient urbanism: reconstructing hunger with NGOs",
      authors: ["L. Natarajan", "H. Cho", "B. Yanful", "A. Woodward"],
      publisher: "Edward Elgar",
      period: { type: "year", value: 2024 },
      links: {
        pdf: "https://www.elgaronline.com/edcollchap/book/9781802201116/book-part-9781802201116-17.xml",
      },
      pages: "125–139",
      tags: ["governance"],
      badges: ["Book chapter"],
      summary:
        "Book chapter in Pandemic Recovery? Reframing and Rescaling Societal Challenges (eds. L. Andres, J. R. Bryson, A. Ersoy, L. Reardon). Examines the role of NGOs in reconstructing urban food resilience during and after the COVID-19 pandemic.",
    },
    {
      kind: "publication",
      id: "cultivate-d23-sharecity200-database-2024",
      title: "SHARECITY200 Database prototype & guidance manual",
      authors: [
        "I. Bacher",
        "A. Potyagalova",
        "H. Wu",
        "G. Jones",
        "P. Buffini",
        "H. Cho",
        "A. Davies",
      ],
      publisher: "CULTIVATE (EU Horizon 2020)",
      period: { type: "year", value: 2024 },
      tags: ["data-ai"],
      summary:
        "EU Horizon project deliverable documenting the design and implementation of the SHARECITY200 database prototype, including data structures, governance considerations, and practical guidance for mapping and monitoring food sharing initiatives.",
    },
    {
      kind: "publication",
      id: "cultivate-105-fsi-landscapes-summary-2024",
      title: "A Summary Report of 105 FSI Landscapes",
      authors: [
        "H. Cho",
        "A. Davies",
        "A. Potyagalova",
        "I. Bacher",
        "P. Buffini",
        "G. Jones",
      ],
      publisher: "CULTIVATE",
      period: { type: "year", value: 2024 },
      tags: ["transition", "governance", "impact-measurement"],
      badges: ["Report"],
      summary:
        "Policy-facing summary report synthesising evidence from 105 food sharing initiative landscapes, translating large-scale mapping outputs into insights to support urban food governance and sustainability decision-making.",
    },
    {
      kind: "publication",
      id: "pub-frontiers-par-support-2022",
      title: "Call for reimagining institutional support for PAR post-COVID",
      authors: [
        "J. Auerbach",
        "S. Muñoz",
        "E. Walsh",
        "U. Affiah",
        "G. Barrera de la Torre",
        "S. Börner",
        "H. Cho",
        "R. Cofield",
        "C. M. DiEnno",
        "G. Graddy-Lovelace",
        "S. Klassen",
      ],
      publisher: "Frontiers in Sustainable Food Systems",
      period: { type: "year", value: 2022 },
      volume: "6",
      pages: "916384",
      links: { doi: "10.3389/fsufs.2022.916384" },
      tags: ["governance"],
      badges: ["Journal paper"],
      summary:
        "Discusses how institutions can better support participatory action research (PAR) in the post-COVID context.",
    },
    {
      kind: "publication",
      id: "pub-frontiers-displacement-scholar-2022",
      title:
        "Displacement of the scholar? Participatory action research under COVID-19",
      authors: [
        "J. Auerbach",
        "S. Muñoz",
        "U. Affiah",
        "G. Barrera de la Torre",
        "S. Börner",
        "H. Cho",
        "R. Cofield",
        "C. M. DiEnno",
        "G. Graddy-Lovelace",
        "S. Klassen",
        "V. Limeberry",
        "A. Morse",
        "L. Natarajan",
        "E. A. Walsh",
      ],
      publisher: "Frontiers in Sustainable Food Systems",
      period: { type: "year", value: 2022 },
      pages: "762065",
      links: { doi: "10.3389/fsufs.2022.762065" },
      tags: ["governance"],
      badges: ["Journal paper"],
      summary:
        "Examines how COVID-19 reshaped participatory action research practice and the positionality of researchers.",
    },
    {
      kind: "publication",
      id: "pub-wsdm-2026-sharecity200",
      title:
        "An Application for Development and Interactive Visual Engagement with the SHARECITY 200 Food Sharing Initiative (FSI) Database in the CULTIVATE Project",
      authors: [
        "A. Potyagalova",
        "I. Bacher",
        "H. Cho",
        "P. Buffini",
        "A. R. Davies",
        "H. Wu",
        "G. J. F. Jones",
      ],
      publisher: "ACM WSDM 2026 Proceedings",
      period: { type: "year", value: 2026 },
      tags: ["data-ai"],
      badges: ["Conference paper"],
      summary:
        "Presents the design and implementation of the SHARECITY200 database and an interactive visual engagement system that supports exploration, governance analysis, and impact-oriented use of large-scale food sharing initiative data within the CULTIVATE project.",
    },
  ],
};

export const DETAILS_ITEMS: Item[] = [
  ...DETAILS_DATA.projects,
  ...DETAILS_DATA.publications,
];

export const DETAILS_KEYWORDS = DETAILS_DATA.keywords;
