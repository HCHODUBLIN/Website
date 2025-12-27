// js/details-data.js

function doiUrl(doi) {
    if (!doi) return "";
    return `https://doi.org/${doi}`;
}

// -------------------------
// DETAILS_DATA
// -------------------------
const DETAILS_DATA = {
    // -------------------------
    // KEYWORDS (node id 1:1 매칭)
    // -------------------------
    keywords: {
        "food-systems": {
            label: "Food systems",
            description:
                "Designing data-driven methods for mapping food activities, food sharing networks and civic food infrastructures, with a focus on measurable social impact and policy relevance.",
        },

        governance: {
            label: "Governance",
            description:
                "Experience in governance, participation and multi-stakeholder coordination, supporting evidence-based decision-making across public institutions, EU programmes and civil society partners.",
        },

        inclusion: {
            label: "Inclusion",
            description:
                "Analysing how environmental and social impacts are distributed across diverse communities, and turning qualitative insight into indicators that inform policy, sustainability reporting and strategic planning.",
        },

        "data-ai": {
            label: "Data & AI",
            description:
                "SQL engineering, ETL design, LLM/ML modelling and automated classification systems used to improve data accuracy, reduce manual processing and enable scalable analytics.",
        },

        innovation: {
            label: "Innovation",
            description:
                "Delivery of advanced data systems and AI-driven workflows in large EU-funded innovation programmes, supporting digital transformation, interoperability and scalable sustainability solutions.",
        },

        transition: {
            label: "Sustainable transition",
            description:
                "Work on sustainable and just transitions in urban systems and food systems, combining indicators, data governance frameworks and cross-sector partnerships.",
        },

        "impact-measurement": {
            label: "Impact measurement",
            description:
                "Development of CSRD- and GRI-aligned indicators, KPI frameworks and reporting structures that strengthen compliance, auditability and organisational transparency.",
        },
    },

    // -------------------------
    // PROJECTS
    // -------------------------
    projects: [
        {
            id: "proj-cultivate",
            title: "CULTIVATE – EU Horizon 2020",
            tags: ["food-systems", "impact-measurement", "data-ai", "innovation", "transition"],
            badges: ["Project", "EU Horizon 2020"],
            summary:
                "Lead for EU-wide mapping and analytics, combining web data, LLM/ML models and GIS to analyse food systems across 100+ cities.",
            achievements: [
                "Improved automated classification accuracy from 32% to 74% through LLM optimisation.",
                "Reduced manual data review time by approximately 50% using Azure Data Factory and automated workflows.",
                "Presented sustainability insights to 1,000+ policymakers, NGOs and academics to support evidence-based decisions.",
            ],
        },
        {
            id: "proj-divaircity",
            title: "DivAirCity – Inclusive data framework (EU Horizon 2020)",
            tags: ["data-ai", "innovation", "impact-measurement", "governance", "inclusion", "transition"],
            badges: ["Project", "EU Horizon 2020"],
            summary:
                "Led the design of an inclusive data framework linking environmental, demographic and community-perceived air quality data across multiple European cities.",
            achievements: [
                "Built cloud-based ETL pipelines integrating multi-source city data under GDPR requirements.",
                "Developed inclusion-focused indicators for monitoring air quality and exposure across different population groups.",
                "Supported cross-city governance processes and decarbonisation analytics for partner municipalities.",
            ],
        },
        {
            id: "proj-shareweave",
            title: "SHAREWEAVE – Research Ireland New Foundations (PI)",
            tags: ["food-systems", "transition", "governance", "impact-measurement"],
            badges: ["Project", "PI"],
            summary:
                "Principal Investigator for a funded project with FoodCloud, co-developing a methodology to analyse the social impact of food sharing in Dublin.",
            achievements: [
                "Secured €12,000 competitive funding as PI under the Research Ireland New Foundations scheme.",
                "Designed a relational mapping and impact framework combining qualitative and spatial data.",
                "Coordinating a co-learning workshop with civic partners to translate findings into policy-relevant insights.",
            ],
        },
        {
            id: "proj-uk2070",
            title: "UK2070 & Lincoln Institute projects",
            tags: ["governance", "transition"],
            badges: ["Project"],
            summary:
                "Developed place-based inequality indicators, food insecurity metrics and civil-society profiles informing national policy debates on levelling-up.",
            achievements: [
                "Produced analytical profiles used in the UK 2070 Commission report and the English Devolution White Paper.",
                "Delivered evidence syntheses and policy briefs for government-facing publications.",
                "Combined quantitative indicators with civil-society insight to inform regional investment priorities.",
            ],
        },
        {
            id: "proj-phd",
            title: "PhD research – Planning & participation",
            tags: ["governance", "inclusion"],
            badges: ["Project", "PhD"],
            summary:
                "Doctoral research on recognition, planning practices and community participation in a diverse Seoul neighbourhood.",
            achievements: [
                "Developed a recognition-focused framework for analysing participation and governance.",
                "Generated empirical findings that underpin later work on inclusion, democracy and data justice.",
                "Published multiple peer-reviewed papers on diversity, governance and planning practice.",
            ],
        },
    ],

    // -------------------------
    // PUBLICATIONS / OUTPUTS (배지로 구분)
    // -------------------------
    publications: [
        // ---- Journal articles
        {
            id: "pub-geoforum-2025",
            title:
                "Evolving foodscapes: Tracing trajectories of urban food sharing initiatives for just urban food transitions",
            authors: ["A. R. Davies", "H. Cho", "M. Vedoa", "R. Martinez Varderi", "A. M. Gatejel"],
            venue: "Geoforum",
            year: 2025,
            type: "Journal article",
            status: "Advance online publication",
            doi: "10.1016/j.geoforum.2025.104318",
            links: { doi: doiUrl("10.1016/j.geoforum.2025.104318") },
            tags: ["food-systems", "transition"],
            badges: ["Journal article"],
            summary:
                "Traces how food sharing initiatives evolve over time and what these trajectories imply for just urban food transitions.",
        },
        {
            id: "pub-ppp-2025",
            title: "Assemblages of urban food sharing initiatives: actions, interactions and connections",
            authors: ["A. R. Davies", "H. Cho", "A. McGeever"],
            venue: "People, Place and Policy",
            year: 2025,
            type: "Journal article",
            volume: "19",
            issue: "1",
            pages: "1–19",
            doi: "10.3351/ppp.2025.6842985999",
            links: { doi: doiUrl("10.3351/ppp.2025.6842985999") },
            tags: ["food-systems", "inclusion"],
            badges: ["Journal article"],
            summary:
                "Uses assemblage thinking to explain how food sharing initiatives interrelate and shape local care infrastructures.",
        },
        {
            id: "pub-asian-geographer-2023",
            title: "Inner-group and inter-group relations in Seoul participatory planning: Revisiting the concept of social capital",
            authors: ["H. Cho"],
            venue: "Asian Geographer",
            year: 2023,
            type: "Journal article",
            pages: "1–15",
            doi: "10.1080/10225706.2022.2038221",
            links: { doi: doiUrl("10.1080/10225706.2022.2038221") },
            tags: ["governance", "inclusion"],
            badges: ["Journal article"],
            summary:
                "Revisits social capital through inner- and inter-group dynamics in participatory planning processes in Seoul.",
        },
        {
            id: "pub-jrectc-2022",
            title: "Imagining diversity in Seoul: Gender and immigrant identities",
            authors: ["H. Cho"],
            venue: "Journal of Race, Ethnicity and the City",
            year: 2022,
            type: "Journal article",
            pages: "1–18",
            doi: "10.1080/26884674.2022.2051778",
            links: { doi: doiUrl("10.1080/26884674.2022.2051778") },
            tags: ["inclusion", "governance"],
            badges: ["Journal article"],
            summary:
                "Examines how diversity is imagined and governed through gendered and immigrant identities in Seoul.",
        },
        {
            id: "pub-urban-studies-2021",
            title:
                "The politics of recognition and planning practices in diverse neighbourhoods: Korean Chinese in Garibong-dong, Seoul",
            authors: ["H. Cho"],
            venue: "Urban Studies",
            year: 2021,
            type: "Journal article",
            volume: "58",
            issue: "14",
            pages: "2863–2879",
            doi: "10.1177/0042098020970450",
            links: { doi: doiUrl("10.1177/0042098020970450") },
            tags: ["governance", "inclusion"],
            badges: ["Journal article"],
            summary:
                "Develops a recognition perspective on planning practices and minority experiences in a diverse neighbourhood in Seoul.",
        },

        // ---- Conference paper
        {
            id: "pub-cikm-2024",
            title: "LLM-based Automated Web Retrieval and Text Classification of Food Sharing Initiatives",
            authors: ["H. Wu", "H. Cho", "A. R. Davies", "G. J. F. Jones"],
            venue: "Proceedings of the 33rd ACM International Conference on Information and Knowledge Management (CIKM)",
            year: 2024,
            type: "Conference paper",
            pages: "4983–4990",
            month: "October",
            doi: "10.1145/3627673.3680090",
            links: { doi: doiUrl("10.1145/3627673.3680090") },
            tags: ["data-ai", "innovation"],
            badges: ["Conference paper"],
            summary:
                "Introduces an LLM-driven pipeline for retrieving and classifying food sharing initiatives from web data.",
        },

        // ---- Under review
        {
            id: "ms-under-review-city",
            title: "The role of civil society in the changing landscape of democracy",
            authors: ["H. Cho", "L. Natarajan", "E. Ilie"],
            venue: "City",
            year: null,
            type: "Journal article",
            status: "Under review",
            tags: ["governance", "inclusion"],
            badges: ["Journal article", "Under review"],
            summary: "",
        },

        // ---- In preparation
        {
            id: "ms-in-prep-cities",
            title:
                "Diversity and sustainability: Urban food sharing initiatives as care infrastructures for a just transition",
            authors: ["H. Cho", "A. R. Davies"],
            venue: "Cities",
            year: 2025,
            type: "Manuscript",
            status: "In preparation",
            planned_submission: "Dec 2025",
            tags: ["food-systems", "inclusion", "transition"],
            badges: ["Manuscript", "In preparation"],
            summary: "",
        },
        {
            id: "ms-in-prep-bds",
            title: "AI and data justice in social science: LLM classifiers for mapping urban food sharing",
            authors: ["H. Cho", "A. R. Davies", "G. J. F. Jones"],
            venue: "Big Data & Society",
            year: 2026,
            type: "Manuscript",
            status: "In preparation",
            planned_submission: "Mar 2026",
            tags: ["data-ai", "governance", "inclusion"],
            badges: ["Manuscript", "In preparation"],
            summary: "",
        },

        // ---- DivAirCity deliverables
        {
            id: "divaircity-d21",
            title: "Key performance indicators and monitoring metrics for DivAirCity specifications",
            authors: ["H. Cho", "S. Yontem", "E. West", "E. Yontem", "K. E. Hilding-Hamann", "L. Blond"],
            year: 2022,
            type: "Project deliverable",
            project: "DivAirCity (EU Horizon 2020)",
            deliverable_no: "2.1",
            version: "2.2",
            access: "Public",
            links: {
                pdf: "https://divaircity.eu/wp-content/uploads/2024/01/DivAirCity_KPIs-and-monitoring-metrics-for-DivAirCity-specifications-1.pdf",
            },
            tags: ["impact-measurement", "data-ai", "governance", "transition"],
            badges: ["Project deliverable", "EU Horizon 2020", "Public"],
            summary:
                "Defines key performance indicators and monitoring metrics for cross-city evaluation of environmental, social, and health impacts.",
        },
        {
            id: "divaircity-d22",
            title: "Digital Innovation and D&I Data Management Framework",
            authors: ["H. Cho", "E. Yontem", "S. Yontem", "E. West"],
            year: 2022,
            type: "Project deliverable",
            project: "DivAirCity (EU Horizon 2020)",
            deliverable_no: "2.2",
            access: "Public",
            lead_beneficiary: "EcoWise",
            links: {
                pdf: "https://divaircity.eu/wp-content/uploads/2024/01/DivAirCity_Digital-Innovation-and-DI-Data-Management-Framework.pdf",
            },
            tags: ["data-ai", "innovation", "impact-measurement", "governance"],
            badges: ["Project deliverable", "EU Horizon 2020", "Public"],
            summary:
                "Sets out a data management framework for digital innovation and diversity & inclusion, including pipelines, governance, interoperability, and GDPR-aligned practices.",
        },
        {
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
            year: 2022,
            type: "Project deliverable",
            project: "DivAirCity (EU Horizon 2020)",
            deliverable_no: "2.4",
            access: "Public",
            links: {
                pdf: "https://divaircity.eu/wp-content/uploads/2024/01/DivAirCity_pilot-cities-data-sources-and-their-acquisition-framework-1.pdf",
            },
            tags: ["data-ai", "governance", "impact-measurement"],
            badges: ["Project deliverable", "EU Horizon 2020", "Public"],
            summary:
                "Documents pilot-city data sources and provides a framework for data acquisition, harmonisation, and governance across cities.",
        },

        // ---- CULTIVATE briefing note (Zenodo DOI)
        {
            id: "cultivate-briefing-zenodo",
            title: "CULTIVATE briefing note: Food sharing landscapes in hub city locations",
            authors: ["A. Davies", "H. Cho", "A.-M. Gatejel", "R. Martinez Varderi", "M. Vedoa"],
            year: 2024,
            type: "Briefing note",
            project: "CULTIVATE (EU Horizon 2020)",
            publisher: "Zenodo",
            doi: "10.5281/zenodo.11030355",
            links: { doi: doiUrl("10.5281/zenodo.11030355") },
            tags: ["food-systems", "impact-measurement", "governance"],
            badges: ["Briefing note", "EU Horizon 2020"],
            summary:
                "Policy-oriented briefing note analysing food sharing landscapes across hub city locations, with implications for urban food governance.",
        },
    ],
};

// -------------------------
// ALIASES for main.js
// -------------------------
const DETAILS_KEYWORDS = DETAILS_DATA.keywords;

// 네 main.js가 기존에 DETAILS_ITEMS를 기대하는 구조라면 그대로 유지:
const DETAILS_ITEMS = [...DETAILS_DATA.projects, ...DETAILS_DATA.publications];
