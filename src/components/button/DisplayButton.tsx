import React, { MouseEventHandler } from "react";

interface DisplayButtonProps {
  image?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  title: string;
  useWidth?: string | number;
}

const DisplayButton: React.FC<DisplayButtonProps> = ({
  image,
  useWidth,
  onClick = () => {},
  title = "",
}: DisplayButtonProps) => {
  return (
    <button
      className={`h-11 bg-white rounded-lg text-primary flex items-center justify-center hover:scale-95 duration-300 ${
        useWidth ? useWidth : "lg:w-48 md:w-full w-full"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center">
        {image}
        <p className="ml-2 capitalize font-semibold text-[14px] leading-5 tracking-tighter">
          {title}
        </p>
      </div>
    </button>
  );
};

export default DisplayButton;
