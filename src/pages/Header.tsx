import React from "react";

interface HeaderProps {
  pageName: string;
}

const Header: React.FC<HeaderProps> = ({ pageName }) => {
  return (
    <div className="w-full h-12 bg-white flex items-center sticky top-0 p-4 shadow-sm shadow-gray-200 z-10 justify-between">
      <p className="font-medium italic capitalize text-base text-primaryGray">
        {pageName}
      </p>

      <div>Search bar</div>
    </div>
  );
};

export default Header;
