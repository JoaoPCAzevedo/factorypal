/** Load dependencies */
import React from "react";

/** Interfaces */
interface SelectProps {
  name: string;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  data: string[];
  selected?: string;
}

/** Component */
const Select: React.FunctionComponent<SelectProps> = ({
  name,
  className,
  data,
  onChange,
  selected,
}) => {
  return (
    <select
      name={name}
      className={className}
      onChange={(e) => onChange(e)}
      data-testid="change-select"
      value={selected}
    >
      {data.map((eachData) => (
        <option key={eachData} value={eachData}>
          {eachData}
        </option>
      ))}
    </select>
  );
};

export default Select;
