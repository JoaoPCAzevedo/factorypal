/** Load dependencies */
import React from "react";

/** Load types */
import { Metric, Title } from "../types";

/** Load components */
import Chart, { ChartTypes, ChartColors } from "./Chart";
import Table from "./Table";

/** Load helpers */
import { sortByAsc, sortByDesc } from "../helpers";

/** Interfaces */
interface DataShowProps {
  title?: string;
  titles: Title[];
  data: Metric[];
  chartColors?: ChartColors;
  chartTypes?: ChartTypes[];
}

/** Component */
const DataShow: React.FunctionComponent<DataShowProps> = ({
  title,
  titles,
  data,
  chartColors,
  chartTypes,
}) => {
  const [currentData, setCurrentData] = React.useState<Metric[]>(data);
  const [currentTitles, setCurrentTitles] = React.useState<Title[]>([
    ...titles,
  ]);
  const [orderedColumn, setOrderedColumn] = React.useState<number>(-1);

  const toggleVisibility = (position: number) => {
    const newData = [...currentData];
    console.log(newData[position]);

    newData[position].show =
      newData[position].show === undefined ? false : !newData[position].show;
    setCurrentData(newData);
  };

  const sortData = (position: number) => {
    const newTitles = [...currentTitles];

    if (orderedColumn !== position && orderedColumn >= 0) {
      delete newTitles[orderedColumn].sort?.state;
    }

    let sortedData: Metric[];
    switch (newTitles[position].sort?.state) {
      case "desc":
        newTitles[position].sort!.state = "asc";
        sortedData = sortByDesc(currentData, newTitles[position].sort!.key);
        break;
      default:
        newTitles[position].sort!.state = "desc";
        sortedData = sortByAsc(currentData, newTitles[position].sort!.key);
        break;
    }

    setCurrentTitles(newTitles);
    setCurrentData(sortedData);
    setOrderedColumn(position);
  };

  const getChartData = () => {
    const labels: Metric["label"][] = [];
    const values: Metric["value"][] = [];
    const colors: ChartColors = chartColors || {
      backgroundColor: [],
      borderColor: [],
    };

    data.forEach((eachMetric) => {
      if (eachMetric.show || eachMetric.show === undefined) {
        labels.push(eachMetric.label);
        values.push(eachMetric.value);

        if (!chartColors) {
          if (eachMetric.value >= 0) {
            colors.backgroundColor.push("rgba(54, 179, 100, 0.2)");
            colors.borderColor.push("rgba(54, 179, 100, 1)");
          } else {
            colors.backgroundColor.push("rgba(255, 99, 132, 0.2)");
            colors.borderColor.push("rgba(255, 99, 132, 1)");
          }
        }
      }
    });

    return { labels, values, colors };
  };

  return (
    <>
      {title && <h4 className="subtitle is-5">{title}</h4>}
      <Table
        titles={currentTitles}
        data={currentData}
        toggleVisibility={toggleVisibility}
        sort={sortData}
      />
      <Chart className="box" types={chartTypes} data={getChartData()} />
    </>
  );
};

export default DataShow;
