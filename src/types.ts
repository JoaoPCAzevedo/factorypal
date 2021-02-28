export type Types = "percentage" | "number" | "secs" | "hours";

export interface Metric {
  id: string;
  label: string;
  value: number;
  type: Types;
  description: string;
  category: string;
  show?: boolean;
}

export interface ApiData {
  data: Metric[];
}

export type SortState = "asc" | "desc";

export interface Title {
  label: string;
  sort?: {
    key: string;
    state?: SortState;
  };
}
