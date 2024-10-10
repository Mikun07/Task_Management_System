import React, { MouseEventHandler } from "react";
interface DisplayButtonProps {
    image?: React.ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    title: string;
    useWidth?: string | number;
}
declare const DisplayButton: React.FC<DisplayButtonProps>;
export default DisplayButton;
