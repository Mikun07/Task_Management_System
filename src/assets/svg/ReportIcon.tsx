import React from "react";
import { useGrayScale, useWhiteScale } from "@/hooks/useScale";

interface ReportIconProps {
  size?: string;
  isGrayScale?: boolean;
  isWhiteScale?: boolean;
  className?: string;
}

const ReportIcon: React.FC<ReportIconProps> = ({
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
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill={colors.fill}
        d="M19 3h-1a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM12.5 9h-1a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2ZM6 16H5a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2Z"
      />
    </svg>
  );
};

export default ReportIcon;