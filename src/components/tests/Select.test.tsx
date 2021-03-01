/** Load dependencies */
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

/** Load components */
import Select from "../Select";

/** Load components */
import { ChartTypes } from "../Chart";

/** Load configs */
const types: ChartTypes[] = [
  "bar",
  "line",
  "radar",
  "pie",
  "doughnut",
  "polarArea",
];

/** Tests */
let container: any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with or without a name", () => {
  act(() => {
    render(
      <Select
        name="select-types"
        data={types}
        onChange={(e) => console.log(e.target.value)}
      />,
      container
    );
  });
  expect(container).toMatchSnapshot();
});

it("changes value when clicked", () => {
  const onChange = jest.fn();
  act(() => {
    render(
      <Select name="select-types" data={types} onChange={onChange} />,
      container
    );
  });

  const select: any = document.querySelector("[data-testid=change-select]");

  act(() => {
    select.value = "bar";
  });

  expect(select.value).toBe("bar");
});
