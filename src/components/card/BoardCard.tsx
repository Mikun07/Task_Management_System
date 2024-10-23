import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

// Define prop types
interface BoardCardProps {
  title: string;
  onClick: () => void;
}

const BoardCard: React.FC<BoardCardProps> = ({ title, onClick }) => {
  return (
    <div className="flex bg-white w-[250px] h-[135px] p-2 rounded-md shadow-sm cursor-pointer flex-col justify-between">
      <div>
        <h1 className="capitalize">{title} Board</h1>
      </div>

      <div className="flex w-full p-1 justify-end">
        <button onClick={onClick} className="text-primaryGray">
          <BsThreeDotsVertical size={25} />
        </button>
      </div>
    </div>
  );
};

export default BoardCard;
