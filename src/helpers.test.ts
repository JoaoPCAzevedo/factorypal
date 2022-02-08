/** Load data */
import { apiData } from "./data";

/** Load helpers */
import { sortByAsc, sortByDesc } from "./helpers";

/** Load types */
import { Metric } from "./types";

/** IO */
const input: Metric[] = apiData.data.filter((obj) => {
  return obj.category === "efficiency";
});

const outputAsc: Metric[] = [
  {
    id: "lbp",
    label: "Loss before pallets",
    value: -268,
    type: "number",
    description: "Loss of produced goods before reaching the pelletizer",
    category: "efficiency",
  },
  {
    id: "sl",
    label: "Speed loss",
    value: -10.5,
    type: "number",
    description: "The line speed loss",
    category: "efficiency",
  },
  {
    id: "oee",
    label: "oee",
    value: 0.68,
    type: "percentage",
    description: "The overall equipment efficiency in %",
    category: "efficiency",
  },
];

const outputDesc: Metric[] = [
  {
    id: "oee",
    label: "oee",
    value: 0.68,
    type: "percentage",
    description: "The overall equipment efficiency in %",
    category: "efficiency",
  },
  {
    id: "sl",
    label: "Speed loss",
    value: -10.5,
    type: "number",
    description: "The line speed loss",
    category: "efficiency",
  },
  {
    id: "lbp",
    label: "Loss before pallets",
    value: -268,
    type: "number",
    description: "Loss of produced goods before reaching the pelletizer",
    category: "efficiency",
  },
];

/** Test */
describe("sortBy function", () => {
  test("it should order (asc) data by given key", () => {
    // With expected key
    expect(sortByAsc(input, "value")).toEqual(outputAsc);
    // With unexpected key
    expect(sortByAsc(input, "nonExistentKey")).toEqual(input);
  });

  test("it should order (desc) data by given key", () => {
    // With expected key
    expect(sortByDesc(input, "value")).toEqual(outputDesc);
    // With unexpected key
    expect(sortByDesc(input, "nonExistentKey")).toEqual(input);
  });
});
