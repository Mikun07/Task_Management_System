import { z } from "zod";
import { Status, Priority, Users } from "../../data/data.json";
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

interface Task {
  id: number;
  title: string;
  priority: string;
  status: string;
  assigned_to: string;
  created_at: string;
  deadline: string;
  description: string;
  owner_id: number;
}

interface OptionType {
  value: string;
  label: string;
}

const statusValues = Status.map((status) => status.value) as [
  string,
  ...string[]
];

const priorityValues = Priority.map((priority) => priority.value) as [
  string,
  ...string[]
];

const usersValues = Users.map((users) => users.value) as [string, ...string[]];

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
  assigned_to: z.enum(usersValues),
});

export type editTaskFormValues = z.infer<typeof editTaskSchema>;

const EditTaskForm = ({ task }: { task: Task }) => {
  const methods = useForm<editTaskFormValues>({
    resolver: zodResolver(editTaskSchema),
    mode: "onChange",
    defaultValues: {
      title: task.title,
      description: task.description,
      deadline: task.deadline.split("T")[0], // Assuming deadline is in ISO string format
      priority: task.priority,
      status: task.status,
      assigned_to: task.assigned_to,
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

  const userOptions = Users.map((user) => ({
    value: user.value,
    label: user.label,
  }));

  const handleEditTask: SubmitHandler<editTaskFormValues> = (
    editTaskValues
  ) => {
    const editTaskData = {
      id: task?.id, // Use the ID of the task being edited
      title: editTaskValues.title || task.title, // Use edited title or default from task
      description: editTaskValues.description || task.description, // Use edited description or default
      deadline: editTaskValues.deadline
        ? new Date(editTaskValues.deadline).toISOString()
        : task.deadline, // Use edited deadline or default
      priority: editTaskValues.priority || task.priority, // Use edited priority or default
      status: editTaskValues.status || task.status, // Use edited status or default
      assigned_to: editTaskValues.assigned_to || task.assigned_to,
    };
    dispatch(updateTask(editTaskData))
      .then((result) => {
        const { payload } = result;
        const success: boolean = Boolean(payload?.status === 204);
        console.log(success);
        if (success) {
          toast.success("Task edited");
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
            title={task?.assigned_to}
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
