import { useEffect } from "react";
import DisableInput from "../input/DisableInput";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUser } from "@/redux/features/getAllUserSlice";
import { RootState } from "@/redux/root";

// Define the User interface
interface User {
  id: number;
  first_name: string;
  last_name: string;
}

const PreviewForm = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);

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

  return (
    <div className="grid grid-cols-2 gap-4">
      <DisableInput
        name="title"
        type="text"
        label="Title"
        placeholder={data?.title}
        disabled
      />

      <DisableInput
        name="description"
        type="text"
        label="Description"
        placeholder={data?.description}
        disabled
      />

      <DisableInput
        name="assigned_to"
        type="text"
        label="Assigned To"
        placeholder={getUserLabels(data?.assigned, allUser)}
        disabled
      />

      <DisableInput
        name="deadline"
        type="text"
        label="Deadline"
        placeholder={data?.deadline?.split("T")[0]}
        disabled
      />

      <DisableInput
        name="priority"
        type="text"
        label="Priority"
        placeholder={data?.priority}
        disabled
      />

      <DisableInput
        name="status"
        type="text"
        label="Status"
        placeholder={data?.status}
        disabled
      />
    </div>
  );
};

export default PreviewForm;
