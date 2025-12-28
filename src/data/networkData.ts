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
    { from: "governance", to: "transition" },
    { from: "governance", to: "impact-measurement" },
    { from: "governance", to: "data-ai" },
    { from: "data-ai", to: "impact-measurement" },
    { from: "data-ai", to: "transition" },
    { from: "transition", to: "impact-measurement" },
  ],
};
