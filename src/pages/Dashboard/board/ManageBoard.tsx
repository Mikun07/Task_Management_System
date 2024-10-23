import BoardCard from "@/components/card/BoardCard";
import BoardCardSkeleton from "@/components/skeleton/BoardCardSkeleton";
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

interface Board {
  id: number;
  invited_by_id: number;
  invited_user_data: User;
}

const ManageBoard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBoard());
    dispatch(fetchAllUser());
  }, [dispatch]);

  const { data: board = [], loading: isLoading } = useSelector(
    (state: RootState) => state?.getBoard || { data: [], loading: false }
  ) as { data: Board[]; loading: boolean };

  const { data: allUser = [] } = useSelector(
    (state: RootState) => state?.getAllUser || { data: [], loading: false }
  ) as { data: User[]; loading: boolean };

  // Function to get user labels
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
          return `${lastInitial} ${firstInitial}`.trim();
        }
        return ""; // Return empty string if no user found
      })
      .filter((initials) => initials) // Filter out empty initials
      .join(", "); // Join initials with commas if there are multiple users
  };

  // Pass board information to the /layout/private route
  const handleInvitedBoard = (boardItem: Board) => {
    navigate("/layout/private", { state: { board: boardItem } });
  };

  const handleMyBoard = () => {
    navigate("/layout/task");
  };

  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 overflow-y-auto">
      <BoardCard title="My" onClick={handleMyBoard} />

      {!isLoading ? (
        board.length > 0 ? (
          board.map((boardItem) => (
            <BoardCard
              key={boardItem.id}
              title={getUserLabels(
                [{ user_id: boardItem.invited_by_id }],
                allUser
              )}
              onClick={() => handleInvitedBoard(boardItem)} // Pass individual board data
            />
          ))
        ) : (
          <p>No invite boards available</p>
        )
      ) : (
        <>
          <BoardCardSkeleton />
          <BoardCardSkeleton />
          <BoardCardSkeleton />
        </>
      )}
    </div>
  );
};

export default ManageBoard;
