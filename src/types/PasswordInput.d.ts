import React from "react";
import { FieldError } from "react-hook-form";
interface PasswordInputProps {
    name: string;
    label: string;
    error?: FieldError;
}
declare const PasswordInput: React.FC<PasswordInputProps>;
export default PasswordInput;
