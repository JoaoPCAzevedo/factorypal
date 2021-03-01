/** Load dependencies */
import React from "react";
import { Chart as ChartJS, ChartType } from "chart.js";
import "chartjs-plugin-datalabels";

/** Load components */
import Select from "./Select";

/** Load types */
import { Metric } from "../types";

/** Types */
type Context =
  | string
  | CanvasRenderingContext2D
  | HTMLCanvasElement
  | ArrayLike<CanvasRenderingContext2D | HTMLCanvasElement>;

type RefContext =
  | string
  | ((instance: HTMLCanvasElement | null) => void)
  | React.RefObject<HTMLCanvasElement>
  | null
  | undefined;

export type ChartColors = {
  backgroundColor: string[];
  borderColor: string[];
};

/** Interfaces */
interface Datalabels {
  anchor: string;
  align: string;
  formatter: (x: number) => number;
  font: {
    weight: string;
  };
}

interface ChartProps {
  className?: string;
  data: {
    labels: Metric["label"][];
    values: Metric["value"][];
    colors?: ChartColors;
  };
  types?: ChartType[];
}

/** Component */
const Chart: React.FunctionComponent<ChartProps> = ({
  className,
  data,
  types,
}) => {
  const [chartType, setChartType] = React.useState<ChartType>("bar");
  const ctx: React.MutableRefObject<Context> = React.useRef<Context>("");

  React.useEffect(() => {
    const chart: Context = ctx.current;

    const currentChart = new ChartJS(chart, {
      plugins: {
        datalabels: {
          anchor: "end",
          align: "top",
          formatter: Math.round,
          font: {
            weight: "bold",
          },
        } as Datalabels,
      } as any,
      type: chartType,
      data: {
        labels: data.labels,
        datasets: [
          {
            data: data.values,
            backgroundColor: data.colors?.backgroundColor,
            borderColor: data.colors?.borderColor,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        animation: {
          duration: 1000,
        },
      },
    });
    return () => {
      currentChart.destroy();
    };
  }, [data, chartType]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChartType(event.target.value as ChartType);
  };

  return (
    <div className={className}>
      {types && (
        <div className="block is-flex is-justify-content-flex-end is-align-items-center">
          <label className="label mr-4" htmlFor="chart types">
            Chart type:
          </label>
          <div className="select">
            <Select
              name="chart-types"
              className="is-capitalized"
              onChange={(e) => handleChange(e)}
              data={types}
            />
          </div>
        </div>
      )}
      <canvas key="chart" ref={ctx as RefContext} />
    </div>
  );
};

export default Chart;
