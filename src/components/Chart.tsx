/** Load dependencies */
import React from "react";
import { Chart as ChartJS } from "chart.js";
import "chartjs-plugin-datalabels";

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

export type ChartTypes =
  | "line"
  | "bar"
  | "radar"
  | "pie"
  | "doughnut"
  | "polarArea";

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
  types?: ChartTypes[];
}

/** Component */
const Chart: React.FunctionComponent<ChartProps> = ({
  className,
  data,
  types,
}) => {
  const [chartType, setChartType] = React.useState<ChartTypes>("bar");
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
    setChartType(event.target.value as ChartTypes);
  };

  return (
    <div className={className}>
      {types && (
        <div className="block is-flex is-justify-content-flex-end is-align-items-center">
          <label className="label mr-4" htmlFor="chart types">
            Chart type:
          </label>
          <div className="select">
            <select
              name="chart types"
              className="is-capitalized"
              onChange={(e) => handleChange(e)}
            >
              {types.map((eachType) => (
                <option key={eachType} value={eachType}>
                  {eachType}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      <canvas key="chart" ref={ctx as RefContext} />
    </div>
  );
};

export default Chart;
