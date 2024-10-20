import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import NameInput from "../input/NameInput";
import TextAreaInput from "../input/TextAreaInput";
import DateInput from "../input/DateInput";
import { Status, Priority, Users } from "../../data/data.json";
import SelectInput from "../input/SelectInput";
import Button from "../button/Button";
import { makeTask } from "@/redux/features/CreateTaskSlice";
import toast from "react-hot-toast";
const statusValues = Status.map((status) => status.value);
const priorityValues = Priority.map((priority) => priority.value);
const usersValues = Users.map((users) => users.value);
const CreateTaskSchema = z.object({
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
const CreateTaskForm = () => {
  //   const navigate = useNavigate();
  const methods = useForm({
    resolver: zodResolver(CreateTaskSchema),
    mode: "onChange",
  });
  const isLoading = useSelector((state) => state?.createTask?.loading);
  const dispatch = useDispatch();
  const handlePriorityChange = (selectedPriority) => {
    if (selectedPriority) {
      methods.setValue("priority", selectedPriority.value);
    } else {
      methods.setValue("priority", "");
    }
  };
  const handleStatusChange = (selectedStatus) => {
    if (selectedStatus) {
      methods.setValue("status", selectedStatus.value);
    } else {
      methods.setValue("status", "");
    }
  };
  const handleUsersChange = (selectedUser) => {
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
  const handleCreateTask = (createTaskValues) => {
    const createTaskData = {
      title: createTaskValues?.title,
      description: createTaskValues?.description,
      deadline: new Date(createTaskValues.deadline).toISOString(),
      priority: createTaskValues?.priority,
      status: createTaskValues?.status,
      assigned_to: createTaskValues?.assigned_to,
    };
    dispatch(makeTask(createTaskData))
      .then((result) => {
        const { payload } = result;
        const success = Boolean(payload?.status === 201);
        console.log(success);
        if (success) {
          toast.success("Task Created");
        } else {
          toast.error("Failed, Try again");
        }
      })
      .catch(() => {
        toast.error("An error occurred during sign-up.");
      });
  };
  return _jsx("div", {
    children: _jsx("div", {
      className:
        "lg:w-[550px] md:w-[500px] w-full h-[400px] overflow-y-auto custom__scrollbar px-4",
      children: _jsx(FormProvider, {
        ...methods,
        children: _jsxs("form", {
          onSubmit: methods.handleSubmit(handleCreateTask),
          className: "flex flex-col gap-y-4 my-4",
          children: [
            _jsx(NameInput, {
              name: "title",
              type: "text",
              label: "Title",
              error: methods.formState.errors.title,
            }),
            _jsx(TextAreaInput, {
              name: "description",
              type: "text",
              label: "Description",
              error: methods.formState.errors.description,
            }),
            _jsx(SelectInput, {
              options: userOptions,
              control: methods.control,
              handleChange: handleUsersChange,
              label: "Assign To",
              title: "Select a User....",
            }),
            _jsx(SelectInput, {
              options: priorityOptions,
              control: methods.control,
              handleChange: handlePriorityChange,
              label: "Priority",
              title: "Select Priority....",
            }),
            _jsx(DateInput, {
              name: "deadline",
              label: "Deadline",
              error: methods.formState.errors.deadline,
            }),
            _jsx(SelectInput, {
              options: statusOptions,
              control: methods.control,
              handleChange: handleStatusChange,
              label: "Status",
              title: "Select Status....",
            }),
            _jsx(Button, {
              type: "submit",
              loading: isLoading,
              disabled:
                methods.formState.isSubmitting || !methods.formState.isValid,
              children: "Create Task",
            }),
          ],
        }),
      }),
    }),
  });
};
export default CreateTaskForm;
