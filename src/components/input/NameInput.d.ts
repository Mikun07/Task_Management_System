import React from "react";
import { FieldError } from "react-hook-form";
interface NameInputProps {
    name: string;
    label: string;
    type?: string;
    error?: FieldError;
    placeholder?: string;
    disabled?: boolean;
}
declare const NameInput: React.FC<NameInputProps>;
export default NameInput;
