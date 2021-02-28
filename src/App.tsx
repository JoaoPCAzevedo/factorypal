/** Load dependencies */
import React from "react";

/** Load components */
import Chart, { ChartTypes, ChartColors } from "./components/Chart";
import Table from "./components/Table";

/** Load types */
import { Metric, Title } from "./types";

/** Load helpers */
import { sortByAsc, sortByDesc } from "./helpers";

/** Load data */
import { apiData } from "./data";
const titlesData: Title[] = [
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
  const [orderedColumn, setOrderedColumn] = React.useState<number>(-1);
  const [titles, setTitles] = React.useState<Title[]>([...titlesData]);
  const [data, setData] = React.useState<Metric[]>(apiData.data);

  const getChartData = () => {
    const labels: Metric["label"][] = [];
    const values: Metric["value"][] = [];
    const colors: ChartColors = columnColors;

    data.forEach((eachMetric) => {
      if (eachMetric.show || eachMetric.show === undefined) {
        labels.push(eachMetric.label);
        values.push(eachMetric.value);
      }
    });

    return { labels, values, colors };
  };

  const toggleVisibility = (position: number) => {
    const newData = [...data];
    newData[position].show =
      newData[position].show === undefined ? false : !newData[position].show;
    setData(newData);
  };

  const sortData = (position: number) => {
    const newTitles = [...titles];

    if (orderedColumn !== position && orderedColumn >= 0) {
      delete newTitles[orderedColumn].sort?.state;
    }

    let sortedData: Metric[];
    switch (newTitles[position].sort?.state) {
      case "desc":
        newTitles[position].sort!.state = "asc";
        sortedData = sortByDesc(data, newTitles[position].sort!.key);
        break;
      default:
        newTitles[position].sort!.state = "desc";
        sortedData = sortByAsc(data, newTitles[position].sort!.key);
        break;
    }

    setTitles(newTitles);
    setData(sortedData);
    setOrderedColumn(position);
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">FactoryPal</h1>
        <Table
          titles={titles}
          data={data}
          toggleVisibility={toggleVisibility}
          sort={sortData}
        />
        <Chart className="box" types={types} data={getChartData()} />
      </div>
    </section>
  );
};

export default App;
