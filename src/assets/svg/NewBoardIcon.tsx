import React from "react";
import { useGrayScale, useWhiteScale } from "@/hooks/useScale";

interface NewBoardIconProps {
  size?: string;
  isGrayScale?: boolean;
  isWhiteScale?: boolean;
  className?: string;
}

const NewBoardIcon: React.FC<NewBoardIconProps> = ({
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
        d="M17 15a1 1 0 0 1 1 1v2h3a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h8v-2a1 1 0 0 1 1-1h5Zm-1 2h-3v1h3v-1Zm3-12a2 2 0 0 1 2 2v9a1 1 0 0 1-2 0V7H5v9a1 1 0 1 1-2 0V7a2 2 0 0 1 2-2h14Z"
      />
    </svg>
  );
};

export default NewBoardIcon;
