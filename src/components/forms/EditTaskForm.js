import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { z } from "zod";
import { Status, Priority } from "../../data/data.json";
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
import { useEffect } from "react";
import { fetchAllUser } from "@/redux/features/getAllUserSlice";
import { fetchTask } from "@/redux/features/getTaskSlice";
const statusValues = Status.map((status) => status.value);
const priorityValues = Priority.map((priority) => priority.value);
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
    assigned_to: z.string().optional(),
});
const EditTaskForm = ({ task, onClose }) => {
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
    // const handleUsersChange = (selectedUser: OptionType | null) => {
    //   if (selectedUser) {
    //     methods.setValue("assigned_to", selectedUser.value);
    //   } else {
    //     methods.setValue("assigned_to", "");
    //   }
    // };
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
    const handleEditTask = (editTaskValues) => {
        const editTaskData = {
            id: task?.id,
            title: editTaskValues.title,
            description: editTaskValues.description,
            deadline: new Date(editTaskValues.deadline).toISOString(),
            priority: editTaskValues.priority,
            status: editTaskValues.status,
            assigned_to: task.assigned_to, // Ensuring this is a string of user IDs
            created_at: task.created_at,
            owner_id: task.owner_id,
        };
        dispatch(updateTask(editTaskData))
            .then((result) => {
            const { payload } = result;
            const success = Boolean(payload?.status === 204);
            if (success) {
                dispatch(fetchTask()); // Fetch tasks after deletion
                toast.success("Task edited");
                onClose();
            }
            else {
                toast.error("Failed, Try again");
            }
        })
            .catch(() => {
            toast.error("Network Error");
        });
    };
    return (_jsx("div", { className: "lg:w-[550px] md:w-[500px] w-full h-[400px] overflow-y-auto custom__scrollbar px-4", children: _jsx(FormProvider, { ...methods, children: _jsxs("form", { onSubmit: methods.handleSubmit(handleEditTask), className: "flex flex-col gap-y-4 my-4", children: [_jsx(NameInput, { name: "title", type: "text", label: "Title", placeholder: task?.title, error: methods.formState.errors.title }), _jsx(TextAreaInput, { name: "description", type: "text", label: "Description", placeholder: task?.description, error: methods.formState.errors.description }), _jsx(SelectInput, { options: priorityOptions, control: methods.control, handleChange: handlePriorityChange, label: "Priority", title: task?.priority }), _jsx(DateInput, { name: "deadline", label: "Deadline", placeholder: task?.deadline, error: methods.formState.errors.deadline }), _jsx(SelectInput, { options: statusOptions, control: methods.control, handleChange: handleStatusChange, label: "Status", title: task?.status }), _jsx(Button, { type: "submit", loading: isLoading, disabled: methods.formState.isSubmitting || !methods.formState.isValid, children: "Edit Task" })] }) }) }));
};
export default EditTaskForm;
