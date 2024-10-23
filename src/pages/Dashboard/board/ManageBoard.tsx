import DisplayButton from "@/components/button/DisplayButton";
import { fetchAllUser } from "@/redux/features/getAllUserSlice";
import { fetchBoard } from "@/redux/features/getBoardSlice";
import { RootState } from "@/redux/root";
import { AppDispatch } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

const ManageBoard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBoard());
    dispatch(fetchAllUser());
  }, [dispatch]);

  const { data: board, loading: isLoading } = useSelector(
    (state: RootState) => state?.getBoard
  );

  const { data: allUser = [] } = useSelector(
    (state: RootState) => state?.getAllUser || { data: [], loading: false }
  ) as { data: User[]; loading: boolean };

  const getUserLabels = (
    assignedUsers: { user_id: number }[],
    allUsers: User[]
  ) => {
    if (!assignedUsers || assignedUsers.length === 0) {
      return "N/A"; // No users assigned
    }

    return assignedUsers
      .map((assignedUser) => {
        // Find the user in allUser by matching the user_id
        const user = allUsers.find((u) => u.id === assignedUser.user_id);
        if (user) {
          // Get first and last initials from the matched user
          const firstInitial = user.first_name ? user.first_name : "";
          const lastInitial = user.last_name ? user.last_name : "";
          return `${lastInitial}${" "}${firstInitial}`;
        }
        return ""; // Return empty string if no user found
      })
      .filter((initials) => initials) // Filter out empty initials
      .join(", "); // Join initials with commas if there are multiple users
  };

  const handleMyBoard = () => {
    navigate("/layout/task");
  };

  const handleInvitedBoard = () => {
    navigate("/layout/private");
  };

  return (
    <div className="flex lg:flex-row flex-col gap-10">
      <DisplayButton onClick={handleMyBoard} title="My Board" />
      <DisplayButton onClick={handleInvitedBoard} title="invited board" />
    </div>
  );
};

export default ManageBoard;
