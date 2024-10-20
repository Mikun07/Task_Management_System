import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { z } from "zod";
import { Status, Priority, Users } from "../../data/data.json";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "@/redux/features/EditTaskSlice";
import toast from "react-hot-toast";
import NameInput from "../input/NameInput";
import TextAreaInput from "../input/TextAreaInput";
import SelectInput from "../input/SelectInput";
import DateInput from "../input/DateInput";
import Button from "../button/Button";
const statusValues = Status.map((status) => status.value);
const priorityValues = Priority.map((priority) => priority.value);
const usersValues = Users.map((users) => users.value);
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
const EditTaskForm = ({ task }) => {
    const methods = useForm({
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
    const isLoading = useSelector((state) => state?.editTask?.loading);
    const dispatch = useDispatch();
    const handlePriorityChange = (selectedPriority) => {
        if (selectedPriority) {
            methods.setValue("priority", selectedPriority.value);
        }
        else {
            methods.setValue("priority", "");
        }
    };
    const handleStatusChange = (selectedStatus) => {
        if (selectedStatus) {
            methods.setValue("status", selectedStatus.value);
        }
        else {
            methods.setValue("status", "");
        }
    };
    const handleUsersChange = (selectedUser) => {
        if (selectedUser) {
            methods.setValue("assigned_to", selectedUser.value);
        }
        else {
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
    const handleEditTask = (editTaskValues) => {
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
            const success = Boolean(payload?.status === 204);
            console.log(success);
            if (success) {
                toast.success("Task edited");
            }
            else {
                toast.error("Failed, Try again");
            }
        })
            .catch(() => {
            toast.error("Network Error");
        });
    };
    return (_jsx("div", { className: "lg:w-[550px] md:w-[500px] w-full h-[400px] overflow-y-auto custom__scrollbar px-4", children: _jsx(FormProvider, { ...methods, children: _jsxs("form", { onSubmit: methods.handleSubmit(handleEditTask), className: "flex flex-col gap-y-4 my-4", children: [_jsx(NameInput, { name: "title", type: "text", label: "Title", placeholder: task?.title, error: methods.formState.errors.title }), _jsx(TextAreaInput, { name: "description", type: "text", label: "Description", placeholder: task?.description, error: methods.formState.errors.description }), _jsx(SelectInput, { options: userOptions, control: methods.control, handleChange: handleUsersChange, label: "Assign To", title: task?.assigned_to }), _jsx(SelectInput, { options: priorityOptions, control: methods.control, handleChange: handlePriorityChange, label: "Priority", title: task?.priority }), _jsx(DateInput, { name: "deadline", label: "Deadline", placeholder: task?.deadline, error: methods.formState.errors.deadline }), _jsx(SelectInput, { options: statusOptions, control: methods.control, handleChange: handleStatusChange, label: "Status", title: task?.status }), _jsx(Button, { type: "submit", loading: isLoading, disabled: methods.formState.isSubmitting || !methods.formState.isValid, children: "Edit Task" })] }) }) }));
};
export default EditTaskForm;
