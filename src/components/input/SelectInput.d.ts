import React from "react";
import { Control } from "react-hook-form";
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
declare const SelectInput: React.FC<SelectInputProps>;
export default SelectInput;
