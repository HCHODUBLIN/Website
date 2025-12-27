// js/network-data.js
const NETWORK_DATA = {
    nodes: [
        { id: "governance", label: "Governance" },
        { id: "data-ai", label: "Data & AI" },
        { id: "transition", label: "Sustainable transition" },
        { id: "impact-measurement", label: "Impact measurement" },
    ],

    edges: [

        // Governance / Inclusion / Transition 삼각
        { from: "governance", to: "transition" },
        { from: "governance", to: "impact-measurement" },
        { from: "governance", to: "data-ai" },

        // Data & AI 축
        { from: "data-ai", to: "innovation" },
        { from: "data-ai", to: "impact-measurement" },
        { from: "data-ai", to: "transition" },

        // Transition & Impact Measurement & Inclusion
        { from: "transition", to: "impact-measurement" }
    ]
};
