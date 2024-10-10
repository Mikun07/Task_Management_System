import React from "react";
import { useGrayScale, useWhiteScale } from "@/hooks/useScale";

interface DashboardIconProps {
  size?: string;
  isGrayScale?: boolean;
  isWhiteScale?: boolean;
  className?: string;
}

const DashboardIcon: React.FC<DashboardIconProps> = ({
  size = "60",
  isGrayScale = false,
  isWhiteScale = false,
  className = "",
}) => {
  const originalColors = {
    fill: "#000",
  };

  const grayScaledColors = useGrayScale(originalColors);
  const whiteScaledColors = useWhiteScale(originalColors);

  const colors = isGrayScale
    ? grayScaledColors
    : isWhiteScale
    ? whiteScaledColors
    : originalColors;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 18 24"
      className={className}
    >
      <path
        fill={colors.fill}
        d="M10 6V0h8v6h-8ZM0 10V0h8v10H0Zm10 8V8h8v10h-8ZM0 18v-6h8v6H0Z"
      />
    </svg>
  );
};

export default DashboardIcon;