// src/data/networkData.ts

export type NetworkNode = {
  id: string;
  label: string;
};

export type NetworkEdge = {
  from: string;
  to: string;
};

export type NetworkData = {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
};

export const NETWORK_DATA: NetworkData = {
  nodes: [
    { id: "governance", label: "Governance" },
    { id: "data-ai", label: "Data & AI" },
    { id: "transition", label: "Sustainable transition" },
    { id: "impact-measurement", label: "Impact measurement" },
  ],

  edges: [
    // Governance / Inclusion / Transition triangle
    { from: "governance", to: "transition" },
    { from: "governance", to: "impact-measurement" },
    { from: "governance", to: "data-ai" },

    // Data & AI axis
    { from: "data-ai", to: "impact-measurement" },
    { from: "data-ai", to: "transition" },

    // Transition & Impact Measurement
    { from: "transition", to: "impact-measurement" },
  ],
};
