/** Load dependencies */
import React from "react";
import "jest-dom/extend-expect";
import { render, cleanup, fireEvent } from "@testing-library/react";

/** Load components */
import Select from "./Select";
import { ChartTypes } from "./Chart";

/** Load configs */
const types: ChartTypes[] = [
  "bar",
  "line",
  "radar",
  "pie",
  "doughnut",
  "polarArea",
];

const handleChange = (value: string) => {
  return value as ChartTypes;
};

jest.mock("react-select", () => (value: ChartTypes) => {
  return (
    <Select
      name="chart-types"
      className="is-capitalized"
      onChange={(e) => handleChange(e.target.value)}
      data={types}
    />
  );
});

afterEach(cleanup);

test("it should give the value of selected option", () => {
  const { getByText, getByTestId } = render(
    <Select
      name="chart-types"
      className="is-capitalized"
      onChange={(e) => handleChange(e.target.value)}
      data={types}
    />
  );
  expect(getByText("Selected option is bar")).toBeInTheDocument();
  fireEvent.change(getByTestId("custom-select"), "bar");
  expect(getByText("Selected option is line")).toBeInTheDocument();
});
