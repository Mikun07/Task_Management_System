import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { fetchAllUser } from "@/redux/features/getAllUserSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import Button from "../button/Button";
import SelectInput from "../input/SelectInput";
import { invitedUser } from "@/redux/features/inviteUserSlice";
import toast from "react-hot-toast";
const inviteFormSchema = z.object({
    user_email: z.string(),
});
const InviteForm = ({ onClose }) => {
    const dispatch = useDispatch();
    const methods = useForm({
        resolver: zodResolver(inviteFormSchema),
        mode: "onChange",
    });
    useEffect(() => {
        dispatch(fetchAllUser());
    }, [dispatch]);
    const isLoading = useSelector((state) => state?.sendInvite?.loading);
    // Ensure allUser is always at least an empty array
    const { data: allUser = [] } = useSelector((state) => state?.getAllUser || { data: [], loading: false });
    // Use optional chaining in case allUser is null or undefined
    const userOptions = allUser?.map((user) => ({
        value: user.email.toString(),
        label: `${user.last_name} ${user.first_name}`,
    }));
    const handleUsersChange = (selectedUser) => {
        if (selectedUser) {
            methods.setValue("user_email", selectedUser.value);
        }
        else {
            methods.setValue("user_email", "");
        }
    };
    const handleCreateTask = (inviteValues) => {
        const inviteUserData = {
            user_email: inviteValues?.user_email,
        };
        dispatch(invitedUser(inviteUserData))
            .then((result) => {
            const { payload } = result;
            const success = Boolean(payload?.status === 200);
            if (success) {
                toast.success(payload?.data?.message);
                onClose();
            }
            else {
                toast.error("Failed, Try again");
            }
        })
            .catch(() => {
            toast.error("An error occurred during task creation.");
        });
    };
    return (_jsx("div", { children: _jsx("div", { className: "lg:w-[550px] md:w-[500px] w-full h-[400px] overflow-y-auto custom__scrollbar px-4", children: _jsx(FormProvider, { ...methods, children: _jsxs("form", { onSubmit: methods.handleSubmit(handleCreateTask), className: "flex flex-col gap-y-4 my-4", children: [_jsx(SelectInput, { options: userOptions, control: methods.control, handleChange: handleUsersChange, label: "Assign To", title: "Select a User...." }), _jsx(Button, { type: "submit", loading: isLoading, disabled: methods.formState.isSubmitting || !methods.formState.isValid, children: "Sent invite" })] }) }) }) }));
};
export default InviteForm;
