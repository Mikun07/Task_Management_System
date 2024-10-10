import React from "react";
interface ButtonProps {
    type?: "button" | "submit" | "reset";
    icon?: React.ReactNode;
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
