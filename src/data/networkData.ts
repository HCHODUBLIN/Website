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
    { id: "governance", label: "Data Modelling" },
    { id: "transition", label: "Data Engineering" },
    { id: "data-ai", label: "AI / ML" },
    { id: "impact-measurement", label: "BI & Reporting" },
    { id: "python", label: "DevOps & Quality" },
  ],

  edges: [
    { from: "governance", to: "transition" },
    { from: "governance", to: "impact-measurement" },
    { from: "transition", to: "data-ai" },
    { from: "transition", to: "python" },
    { from: "data-ai", to: "impact-measurement" },
    { from: "data-ai", to: "python" },
    { from: "impact-measurement", to: "python" },
  ],
};
