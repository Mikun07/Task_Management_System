import React from "react";
interface DisableInputProps {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
}
declare const DisableInput: React.FC<DisableInputProps>;
export default DisableInput;
