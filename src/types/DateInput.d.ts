import React from "react";
import { FieldError } from "react-hook-form";
interface DateInputProps {
    name: string;
    label: string;
    error?: FieldError;
    placeholder?: string;
}
declare const DateInput: React.FC<DateInputProps>;
export default DateInput;
