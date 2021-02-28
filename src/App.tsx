/** Load dependencies */
import React from "react";

/** Load components */
import { ChartTypes, ChartColors } from "./components/Chart";
import DataShow from "./components/DataShow";

/** Load types */
import { Metric, Title } from "./types";

/** Load data */
import { apiData } from "./data";
const dataEfficiency: Metric[] = apiData.data.filter((obj) => {
  return obj.category === "efficiency";
});
const dataShift: Metric[] = apiData.data.filter((obj) => {
  return obj.category === "shift";
});
const dataDowntine: Metric[] = apiData.data.filter((obj) => {
  return obj.category === "downtime";
});

/** Configs */
const titles: Title[] = [
  { label: "ID" },
  { label: "Label", sort: { key: "label" } },
  { label: "Value", sort: { key: "value" } },
  { label: "Description" },
  { label: "Category" },
  { label: "Show/Hide" },
];

const types: ChartTypes[] = [
  "bar",
  "line",
  "radar",
  "pie",
  "doughnut",
  "polarArea",
];

const columnColors: ChartColors = {
  backgroundColor: [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(54, 179, 100, 0.2)",
  ],
  borderColor: [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(54, 179, 100, 1)",
  ],
};

/** Component */
const App: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        <section className="hero is-small is-info box">
          <div className="hero-body">
            <h1 className="title">FactoryPal</h1>
          </div>
        </section>
        <DataShow
          title={"Efficiency"}
          titles={titles}
          data={dataEfficiency}
          chartTypes={types}
          chartColors={columnColors}
        />
        <DataShow
          title={"Shift"}
          titles={titles}
          data={dataShift}
          chartTypes={types}
        />
        <DataShow
          title={"Downtime"}
          titles={titles}
          data={dataDowntine}
          chartTypes={types}
        />
      </div>
    </section>
  );
};

export default App;
