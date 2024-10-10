import React from "react";
import { useGrayScale, useWhiteScale } from "@/hooks/useScale";

interface SettingIconProps {
  size?: string;
  isGrayScale?: boolean;
  isWhiteScale?: boolean;
  className?: string;
}

const SettingIcon: React.FC<SettingIconProps> = ({
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
      viewBox="0 0 25 25" // Adjust the viewBox as necessary
      className={className}
    >
      <path
        fill={colors.fill}
        d="M22.057 13.724c.054-.39.08-.794.08-1.224 0-.417-.026-.833-.093-1.224l2.717-2.057a.623.623 0 0 0 .16-.794l-2.57-4.323a.651.651 0 0 0-.34-.283.673.673 0 0 0-.449-.004l-3.2 1.25a9.522 9.522 0 0 0-2.168-1.224L15.713.534a.626.626 0 0 0-.22-.383A.659.659 0 0 0 15.07 0H9.93a.629.629 0 0 0-.63.534L8.82 3.84A9.733 9.733 0 0 0 6.65 5.065l-3.199-1.25a.647.647 0 0 0-.79.287L.106 8.424c-.16.274-.107.612.16.795l2.718 2.057c-.067.39-.12.82-.12 1.224s.026.833.093 1.224L.239 15.781a.623.623 0 0 0-.16.794l2.57 4.323c.16.287.494.378.789.287l3.2-1.25c.668.495 1.378.911 2.168 1.224l.481 3.307A.653.653 0 0 0 9.93 25h5.14a.619.619 0 0 0 .63-.534l.481-3.307a9.246 9.246 0 0 0 2.168-1.224l3.2 1.25c.294.104.629 0 .79-.287l2.57-4.322c.16-.287.093-.613-.161-.795l-2.69-2.057ZM12.5 17.187c-2.65 0-4.819-2.109-4.819-4.687 0-2.578 2.169-4.688 4.819-4.688s4.819 2.11 4.819 4.688-2.169 4.688-4.819 4.688Z"
      />
    </svg>
  );
};

export default SettingIcon;