import { Users } from "@/data/data.json";
import DisableInput from "../input/DisableInput";

const PreviewForm = ({ data }) => {
  console.log(data);

  const getUserLabel = (id: string) => {
    const user = Users.find((user) => user.value === String(id));
    return user ? `${user?.label}` : "Unknown User";
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
        placeholder={getUserLabel(data.assigned_to)}
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
