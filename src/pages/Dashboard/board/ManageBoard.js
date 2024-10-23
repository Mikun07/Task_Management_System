import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import BoardCard from "@/components/card/BoardCard";
import BoardCardSkeleton from "@/components/skeleton/BoardCardSkeleton";
import { fetchAllUser } from "@/redux/features/getAllUserSlice";
import { fetchBoard } from "@/redux/features/getBoardSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const ManageBoard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBoard());
        dispatch(fetchAllUser());
    }, [dispatch]);
    const { data: board = [], loading: isLoading } = useSelector((state) => state?.getBoard || { data: [], loading: false });
    const { data: allUser = [] } = useSelector((state) => state?.getAllUser || { data: [], loading: false });
    // Function to get user labels
    const getUserLabels = (assignedUsers, allUsers) => {
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
    const handleInvitedBoard = (boardItem) => {
        navigate("/layout/private", { state: { board: boardItem } });
    };
    const handleMyBoard = () => {
        navigate("/layout/task");
    };
    return (_jsxs("div", { className: "grid lg:grid-cols-3 sm:grid-cols-2 gap-6 overflow-y-auto", children: [_jsx(BoardCard, { title: "My", onClick: handleMyBoard }), !isLoading ? (board.length > 0 ? (board.map((boardItem) => (_jsx(BoardCard, { title: getUserLabels([{ user_id: boardItem.invited_by_id }], allUser), onClick: () => handleInvitedBoard(boardItem) }, boardItem.id)))) : (_jsx("p", { children: "No invite boards available" }))) : (_jsxs(_Fragment, { children: [_jsx(BoardCardSkeleton, {}), _jsx(BoardCardSkeleton, {}), _jsx(BoardCardSkeleton, {})] }))] }));
};
export default ManageBoard;
