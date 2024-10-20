import React from "react";
interface Option {
  label: string;
  onClick: () => void;
}
interface OptionButtonProps {
  options: Option[];
}
declare const OptionButton: React.FC<OptionButtonProps>;
export default OptionButton;
