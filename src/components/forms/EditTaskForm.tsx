import { z } from "zod";
import { Status, Priority } from "../../data/data.json";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/root";
import { AppDispatch } from "@/redux/store";
import { updateTask } from "@/redux/features/EditTaskSlice";
import toast from "react-hot-toast";
import NameInput from "../input/NameInput";
import TextAreaInput from "../input/TextAreaInput";
import SelectInput from "../input/SelectInput";
import DateInput from "../input/DateInput";
import Button from "../button/Button";
import { useEffect } from "react";
import { fetchAllUser } from "@/redux/features/getAllUserSlice";
import { fetchTask } from "@/redux/features/getTaskSlice";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface Task {
  id: number;
  title: string;
  priority: string;
  status: string;
  assigned_to: string | User[]; // Either string (single user ID) or array of users
  created_at: string;
  deadline: string;
  description: string;
  owner_id: number;
}

interface OptionType {
  value: string;
  label: string;
}

interface EditTaskFormProps {
  task: Task;
  onClose: () => void; // Define the type for onClose
}

const statusValues = Status.map((status) => status.value) as [
  string,
  ...string[]
];

const priorityValues = Priority.map((priority) => priority.value) as [
  string,
  ...string[]
];

// Use Zod schema, assuming `assigned_to` will be a string (user ID) for validation
const editTaskSchema = z.object({
  title: z
    .string()
    .min(2, { message: "At least 2 characters." })
    .max(30, { message: "At most 30 characters." }),
  description: z
    .string()
    .min(2, { message: "At least 2 characters." })
    .max(200, { message: "At most 200 characters." }),
  deadline: z.string(),
  priority: z.enum(priorityValues),
  status: z.enum(statusValues),
  assigned_to: z.string(), // Enforcing that assigned_to will be a string (user ID)
});

export type editTaskFormValues = z.infer<typeof editTaskSchema>;

const EditTaskForm = ({ task, onClose }: EditTaskFormProps) => {
  const methods = useForm<editTaskFormValues>({
    resolver: zodResolver(editTaskSchema),
    mode: "onChange",
    defaultValues: {
      title: task.title,
      description: task.description,
      deadline: task.deadline.split("T")[0], // Assuming deadline is in ISO string format
      priority: task.priority,
      status: task.status,
      // Convert assigned_to to string (comma-separated user IDs) if it's an array
      assigned_to: Array.isArray(task.assigned_to)
        ? task.assigned_to.map((user) => user.id.toString()).join(", ")
        : task.assigned_to,
    },
  });

  const isLoading = useSelector((state: RootState) => state?.editTask?.loading);
  const dispatch = useDispatch<AppDispatch>();

  const handlePriorityChange = (selectedPriority: OptionType | null) => {
    if (selectedPriority) {
      methods.setValue("priority", selectedPriority.value);
    } else {
      methods.setValue("priority", "");
    }
  };

  const handleStatusChange = (selectedStatus: OptionType | null) => {
    if (selectedStatus) {
      methods.setValue("status", selectedStatus.value);
    } else {
      methods.setValue("status", "");
    }
  };

  const handleUsersChange = (selectedUser: OptionType | null) => {
    if (selectedUser) {
      methods.setValue("assigned_to", selectedUser.value);
    } else {
      methods.setValue("assigned_to", "");
    }
  };

  const statusOptions = Status.map((status) => ({
    value: status.value,
    label: status.label,
  }));

  const priorityOptions = Priority.map((priority) => ({
    value: priority.value,
    label: priority.label,
  }));

  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);

  const { data: allUser = [] } = useSelector(
    (state: RootState) => state?.getAllUser || { data: [], loading: false }
  ) as { data: User[]; loading: boolean };

  const userOptions = allUser?.map((user) => ({
    value: user.id.toString(),
    label: `${user.last_name} ${user.first_name}`,
  }));

  const handleEditTask: SubmitHandler<editTaskFormValues> = (
    editTaskValues
  ) => {
    const editTaskData: Task = {
      id: task?.id,
      title: editTaskValues.title,
      description: editTaskValues.description,
      deadline: new Date(editTaskValues.deadline).toISOString(),
      priority: editTaskValues.priority,
      status: editTaskValues.status,
      assigned_to: editTaskValues.assigned_to, // Ensuring this is a string of user IDs
      created_at: task.created_at,
      owner_id: task.owner_id,
    };

    dispatch(updateTask(editTaskData))
      .then((result) => {
        const { payload } = result;
        const success: boolean = Boolean(payload?.status === 204);
        if (success) {
          dispatch(fetchTask()); // Fetch tasks after deletion
          toast.success("Task edited");
          onClose();
        } else {
          toast.error("Failed, Try again");
        }
      })
      .catch(() => {
        toast.error("Network Error");
      });
  };

  return (
    <div className="lg:w-[550px] md:w-[500px] w-full h-[400px] overflow-y-auto custom__scrollbar px-4">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleEditTask)}
          className="flex flex-col gap-y-4 my-4"
        >
          <NameInput
            name="title"
            type="text"
            label="Title"
            placeholder={task?.title}
            error={methods.formState.errors.title}
          />

          <TextAreaInput
            name="description"
            type="text"
            label="Description"
            placeholder={task?.description}
            error={methods.formState.errors.description}
          />

          <SelectInput
            options={userOptions}
            control={methods.control}
            handleChange={handleUsersChange}
            label="Assign To"
            title={
              Array.isArray(task.assigned_to)
                ? task.assigned_to
                    .map((user) => `${user.first_name} ${user.last_name}`)
                    .join(", ")
                : task.assigned_to
            }
          />

          <SelectInput
            options={priorityOptions}
            control={methods.control}
            handleChange={handlePriorityChange}
            label="Priority"
            title={task?.priority}
          />

          <DateInput
            name="deadline"
            label="Deadline"
            placeholder={task?.deadline}
            error={methods.formState.errors.deadline}
          />

          <SelectInput
            options={statusOptions}
            control={methods.control}
            handleChange={handleStatusChange}
            label="Status"
            title={task?.status}
          />

          <Button
            type="submit"
            loading={isLoading}
            disabled={
              methods.formState.isSubmitting || !methods.formState.isValid
            }
          >
            Edit Task
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditTaskForm;
