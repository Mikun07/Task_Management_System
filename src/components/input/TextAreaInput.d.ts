import React from "react";
import { FieldError } from "react-hook-form";
interface TextAreaInputProps {
    name: string;
    label: string;
    type?: string;
    error?: FieldError;
    placeholder?: string;
}
declare const TextAreaInput: React.FC<TextAreaInputProps>;
export default TextAreaInput;
