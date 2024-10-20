import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Users } from "@/data/data.json";
import DisableInput from "../input/DisableInput";
const PreviewForm = ({ data }) => {
    console.log(data);
    const getUserLabel = (id) => {
        const user = Users.find((user) => user.value === String(id));
        return user ? `${user?.label}` : "Unknown User";
    };
    return (_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(DisableInput, { name: "title", type: "text", label: "Title", placeholder: data?.title, disabled: true }), _jsx(DisableInput, { name: "description", type: "text", label: "Description", placeholder: data?.description, disabled: true }), _jsx(DisableInput, { name: "assigned_to", type: "text", label: "Assigned To", placeholder: getUserLabel(data.assigned_to), disabled: true }), _jsx(DisableInput, { name: "deadline", type: "text", label: "Deadline", placeholder: data?.deadline?.split("T")[0], disabled: true }), _jsx(DisableInput, { name: "priority", type: "text", label: "Priority", placeholder: data?.priority, disabled: true }), _jsx(DisableInput, { name: "status", type: "text", label: "Status", placeholder: data?.status, disabled: true })] }));
};
export default PreviewForm;
