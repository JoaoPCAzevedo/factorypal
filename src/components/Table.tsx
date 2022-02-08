/** Load dependencies */
import React from "react";

/** Load types */
import { Metric, Types, Title } from "../types";

/** Interfaces */
interface TableProps {
  titles: Title[];
  data: Metric[];
  toggleVisibility: (position: number) => void;
  sort?: (position: number) => void;
}

/** Component */
const Table: React.FunctionComponent<TableProps> = ({
  titles,
  data,
  toggleVisibility,
  sort,
}: TableProps) => {
  let copyData = data;

  const valueType = (value: number, type: Types) => {
    switch (type) {
      case "percentage":
        return `${value}%`;
      case "hours":
        return `${value} hours`;
      case "secs":
        return `${value} secs`;
      default:
        return value;
    }
  };

  return (
    <div className="box">
      <table className="table is-fullwidth">
        <thead>
          <tr>
            {titles.map((eachTitle, position) => {
              let sortIcon;
              switch (eachTitle.sort?.state) {
                case "asc":
                  sortIcon = "mdi-sort-ascending";
                  break;
                case "desc":
                  sortIcon = "mdi-sort-descending";
                  break;
                default:
                  sortIcon = "mdi-sort";
                  break;
              }
              return (
                <th key={eachTitle.label}>
                  {eachTitle.label}
                  {sort && eachTitle?.sort?.key && (
                    <span
                      className="icon is-clickable"
                      onClick={() => sort(position)}
                    >
                      <i className={`mdi ${sortIcon}`}></i>
                    </span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {copyData.map((eachMetric, i) => {
            const icon = !eachMetric.show ? "mdi-eye" : "mdi-eye-off";
            const index = i + 1;
            return (
              <tr key={eachMetric.id}>
                <th>{index}</th>
                <td>{eachMetric.label}</td>
                <td>{valueType(eachMetric.value, eachMetric.type)}</td>
                <td>{eachMetric.description}</td>
                <td>{eachMetric.category}</td>
                <td className="has-text-centered">
                  <span
                    className="icon is-clickable"
                    onClick={() => toggleVisibility(i)}
                  >
                    <i className={`mdi ${icon}`}></i>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
