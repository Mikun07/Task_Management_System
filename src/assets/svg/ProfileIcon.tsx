import React from "react";

interface ProfileIconProps {
  size?: string;
  color?: string;
  className?: string;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({
  size = "60",
  color = "#000000",
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 25 25"
      className={className}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M6.944 5.556a5.556 5.556 0 1 1 11.112 0 5.556 5.556 0 0 1-11.112 0Zm0 8.333A6.944 6.944 0 0 0 0 20.833 4.167 4.167 0 0 0 4.167 25h16.666A4.167 4.167 0 0 0 25 20.833a6.944 6.944 0 0 0-6.944-6.944H6.944Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default ProfileIcon;
