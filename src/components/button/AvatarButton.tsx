import { useState } from "react";

interface UserData {
  id: number;
  role: string;
  email: string;
  username: string;
  last_name: string;
  first_name: string;
  is_active: boolean;
  hashed_password: string;
}

interface AvatarButtonProps {
  data?: UserData | null; // Make data optional or null
  loading?: boolean;
  signOut?: () => void;
}

const AvatarButton = ({
  data = null,
  loading = false,
  signOut,
}: AvatarButtonProps) => {
  const [modal, openModal] = useState(false);

  const handleButtonClick = () => {
    openModal(!modal);
  };

  return (
    <div className="relative">
      {loading ? (
        <div className="w-9 h-9 z-20 rounded-full shadow-md justify-center animate-pulse bg-primaryDark bg-opacity-[8%]"></div>
      ) : (
        <div
          onClick={handleButtonClick}
          className={`bg-white w-9 h-9 rounded-full relative flex items-center shadow-md justify-center cursor-pointer hover:border-2 hover:border-primaryGray ${
            modal
              ? "shadow-none bg-transparent border-2 border-primaryGray scale-105 "
              : "hover:scale-105 duration-300"
          }`}
        >
          <p className="font-semibold uppercase text-primary lg:text-base text-sm">
            {data?.last_name && data?.first_name
              ? data.last_name[0] + data.first_name[0]
              : "?"}{" "}
            {/* Fallback to '?' if data is unavailable */}
          </p>
        </div>
      )}

      {modal && (
        <div className="absolute z-50 w-56 bg-white bg-opacity-95 border border-dotted border-primaryGray shadow-md shadow-gray-200 top-12 right-0 rounded-lg">
          <div className="flex flex-col gap-2 py-2 z-50">
            <div className="flex flex-col gap-1 text-primaryGray border-b border-dashed px-2 pb-2">
              <p className="capitalize lg:text-[12px] text-[9px] font-medium">
                {data?.last_name} {data?.first_name}
              </p>
              <p className="lowercase lg:text-[12px] text-[9px] font-medium">
                {data?.email}
              </p>
            </div>

            <div className="flex flex-col gap-1 px-2 pb-2">
              <button
                onClick={signOut}
                className="flex items-center w-full gap-2 text-red-500"
              >
                <p className="flex font-bold">Logout</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarButton;
