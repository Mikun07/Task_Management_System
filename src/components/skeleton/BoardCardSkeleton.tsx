import React from "react";

const BoardCardSkeleton: React.FC = () => {
  return (
    <div className="flex bg-gray-200 animate-pulse w-[250px] h-[135px] p-2 rounded-md shadow-sm cursor-pointer flex-col justify-between">
      <div>
        {/* Title Placeholder */}
        <div className="bg-gray-300 w-[150px] h-4 rounded-md mb-4"></div>
      </div>

      <div className="flex w-full p-1 justify-end">
        {/* Icon Placeholder */}
        <div className="bg-gray-300 w-6 h-6 rounded-full"></div>
      </div>
    </div>
  );
};

export default BoardCardSkeleton;
