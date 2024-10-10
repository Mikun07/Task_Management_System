import AvatarButton from "@/components/button/AvatarButton";
import { logout } from "@/redux/features/loginSlice";
import { AppDispatch } from "@/redux/store";
import React from "react";
import { useDispatch } from "react-redux";

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

interface HeaderProps {
  pageName: string;
  data: UserData | null; // Allow data to be null
  isLoading: boolean;
}

const Header: React.FC<HeaderProps> = ({ pageName, data, isLoading }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSignOut = () => {
    dispatch(logout());
  };

  return (
    <div className="w-full h-12 bg-white flex items-center sticky top-0 p-4 shadow-sm shadow-gray-200 z-10 justify-between">
      <p className="font-medium italic capitalize text-base text-primaryGray">
        {pageName}
      </p>

      {isLoading ? (
        <span className="loader" /> // Placeholder for loading state
      ) : (
        <AvatarButton
          data={data} // This can be null; handle it inside AvatarButton
          loading={isLoading}
          signOut={handleSignOut}
        />
      )}
    </div>
  );
};

export default Header;
