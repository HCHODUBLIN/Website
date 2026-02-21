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
    { id: "governance", label: "Snowflake" },
    { id: "transition", label: "dbt" },
    { id: "python", label: "Python" },
    { id: "azure", label: "Azure" },
    { id: "data-ai", label: "LLM Pipelines" },
    { id: "impact-measurement", label: "Data Modelling" },
  ],

  edges: [
    { from: "governance", to: "transition" },
    { from: "governance", to: "python" },
    { from: "governance", to: "impact-measurement" },
    { from: "transition", to: "impact-measurement" },
    { from: "transition", to: "azure" },
    { from: "python", to: "azure" },
    { from: "python", to: "data-ai" },
    { from: "azure", to: "data-ai" },
    { from: "data-ai", to: "impact-measurement" },
  ],
};
