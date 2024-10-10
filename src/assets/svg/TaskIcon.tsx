import React from "react";
import { useGrayScale, useWhiteScale } from "@/hooks/useScale";

interface TaskIconProps {
  size?: string;
  isGrayScale?: boolean;
  isWhiteScale?: boolean;
  className?: string;
}

const TaskIcon: React.FC<TaskIconProps> = ({
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
        d="M17.75 2.001a2.25 2.25 0 0 1 2.245 2.096L20 4.25v10.128c-.12.08-.234.173-.341.28l-3.409 3.408-.908-.91a2.24 2.24 0 0 0-1.5-.657h2.408a.75.75 0 1 0 0-1.5h-5.004a.75.75 0 1 0 0 1.5h2.413a2.25 2.25 0 0 0-1.5 3.839l1.659 1.66H6.25a2.25 2.25 0 0 1-2.245-2.096L4 19.75V4.251a2.25 2.25 0 0 1 2.096-2.245l.154-.005h11.5ZM9 7.751a1 1 0 1 0-2 0 1 1 0 0 0 2 0ZM11.246 7a.75.75 0 1 0 0 1.5h5.004a.75.75 0 1 0 0-1.5h-5.004Zm-.75 4.75c0 .414.336.75.75.75h5.004a.75.75 0 1 0 0-1.5h-5.004a.75.75 0 0 0-.75.75ZM9 11.75a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm0 3.998a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm7.25 4.441 4.47-4.47a.75.75 0 1 1 1.06 1.061l-5 5-.051.047a.75.75 0 0 1-1.01-.047l-2.5-2.501a.75.75 0 1 1 1.062-1.06l1.969 1.97Z"
      />
    </svg>
  );
};

export default TaskIcon;
