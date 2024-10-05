import React from "react";
import { useFormContext, FieldError } from "react-hook-form";
import Select, { StylesConfig } from "react-select";
import { motion } from "framer-motion";

interface OptionType {
  value: string;
  label: string;
}

interface SelectInputProps {
  name: string;
  label: string;
  options: OptionType[];
  error?: FieldError;
  placeholder?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  name,
  label,
  options,
  error,
  placeholder,
}) => {
  const { setValue, getValues, formState } = useFormContext();
  const isError = Boolean(error);
  const isSuccess = formState.isSubmitted && !isError;

  const customStyles: StylesConfig<OptionType, false> = {
    control: (provided, state) => ({
      ...provided,
      borderColor: isError
        ? "red"
        : isSuccess
        ? "green"
        : state.isFocused
        ? "#888888"
        : "#E6E6E6",
      boxShadow: state.isFocused ? "0 0 0 1px #007BFF" : "none",
      "&:hover": {
        borderColor: isError ? "red" : isSuccess ? "green" : "",
      },
    }),
  };

  const handleChange = (selectedOption: OptionType | null) => {
    setValue(name, selectedOption ? selectedOption.value : "");
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className="text-gray-700 text-[12px] font-semibold mb-1"
      >
        {label}
      </label>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full"
      >
        <Select
          id={name}
          options={options}
          styles={customStyles}
          placeholder={placeholder}
          onChange={handleChange}
          value={options.find((option) => option.value === getValues(name))}
          className="rounded-[6px] w-full z-50"
        />
      </motion.div>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default SelectInput;
