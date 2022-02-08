export type Types = "percentage" | "number" | "secs" | "hours";

interface DataStructure {
  id: string;
  label: string;
  value: number;
  type: Types;
  description: string;
  category: string;
  show?: boolean;
}

export interface ApiData {
  data: DataStructure[];
}

export interface Metric extends DataStructure {
  show?: boolean;
}

export type SortState = "asc" | "desc";

export interface Title {
  label: string;
  sort?: {
    key: string;
    state?: SortState;
  };
}
