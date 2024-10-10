import React from "react";
import Select, { SingleValue, StylesConfig } from "react-select";
import { startCase } from "lodash";
import { Controller, Control } from "react-hook-form";

interface OptionType {
  value: string;
  label: string;
}

interface SelectInputProps {
  options: OptionType[];
  handleChange?: (data: OptionType | null) => void;
  control: Control;
  label: string;
  title?: string;
}

const colorStyles: StylesConfig<OptionType, false> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#FFFFFF",
    fontSize: "14px",
  }),
  option: (styles) => ({
    ...styles,
  }),
};

const SelectInput: React.FC<SelectInputProps> = ({
  options,
  handleChange = () => null,
  control,
  label,
  title = "",
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={label}
        className="text-gray-700 text-[12px] font-semibold mb-1"
      >
        <div>{title ? startCase(title) : startCase(label)}</div>
      </label>
      <Controller
        name={label}
        control={control}
        render={({ field }) => {
          return (
            <Select
              {...field}
              options={options}
              onChange={(selected: SingleValue<OptionType>) => {
                field.onChange(selected);
                handleChange(selected); // Call the external change handler
              }}
              styles={colorStyles}
              isClearable
              isSearchable
              closeMenuOnSelect
              blurInputOnSelect
              value={field.value as SingleValue<OptionType> | null} // Ensure the value is typed correctly
              theme={(theme) => ({
                ...theme,
                borderRadius: 5,
                colors: {
                  ...theme.colors,
                  primary25: "#76b1ef",
                  primary: "#007BFF",
                },
              })}
            />
          );
        }}
      />
    </div>
  );
};

export default SelectInput;
