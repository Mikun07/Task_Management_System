import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Button from "@/components/button/Button";
import NameInput from "@/components/input/NameInput";
import PasswordInput from "@/components/input/PasswordInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { postSignUp } from "@/redux/features/signUpSlice";
import toast from "react-hot-toast";
import { Roles } from "@/data/data.json";
import SelectInput from "../input/SelectInput";
const roleValues = Roles.map((role) => role.value);
// Zod validation schema for form validation
const passwordSchema = z.string().min(7, { message: "At least 7 characters" });
// Main validation schema for the sign-up form
const SignUpSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    username: z
        .string()
        .min(2, { message: "At least 2 characters." })
        .max(30, { message: "At most 30 characters." }),
    first_name: z
        .string()
        .min(2, { message: "At least 2 characters." })
        .max(30, { message: "At most 30 characters." }),
    last_name: z
        .string()
        .min(2, { message: "At least 2 characters." })
        .max(30, { message: "At most 30 characters." }),
    phone_number: z.string().min(2, { message: "Enter phone number" }),
    password: passwordSchema,
    role: z.enum(roleValues),
});
const CreateUserFrom = ({ onClose }) => {
    // Initialize useForm hook with Zod resolver and validation schema
    const methods = useForm({
        resolver: zodResolver(SignUpSchema), // Zod resolver to validate form
        mode: "onChange", // Validation mode triggers on change
    });
    // Access the Redux state for loading status
    const isLoading = useSelector((state) => state?.signUp?.loading);
    // useDispatch hook to dispatch actions to the Redux store
    const dispatch = useDispatch();
    const handleRoleChange = (selectedUser) => {
        if (selectedUser) {
            methods.setValue("role", selectedUser.value);
        }
        else {
            methods.setValue("role", "");
        }
    };
    const roleOptions = Roles.map((role) => ({
        value: role.value,
        label: role.label,
    }));
    // Submit handler for the sign-up form
    const handleSignUp = (signUpValues) => {
        // Prepare the sign-up data
        const signUpData = {
            email: signUpValues.email,
            username: signUpValues.username,
            first_name: signUpValues.first_name,
            last_name: signUpValues.last_name,
            phone_number: signUpValues.phone_number,
            password: signUpValues.password,
            role: signUpValues?.role,
        };
        // Dispatch the postSignUp action to the Redux store
        dispatch(postSignUp(signUpData))
            .then((result) => {
            const { payload } = result;
            const success = Boolean(payload?.status === 201);
            if (success) {
                toast.success(payload?.data?.message);
                onClose();
            }
            else {
                toast.error(payload?.detail);
            }
        })
            .catch(() => {
            // Handle errors during sign-up process
            toast.error("An error occurred during sign-up.");
        });
    };
    return (_jsxs("div", { children: [" ", _jsx("div", { className: "lg:w-[550px] md:w-[500px] w-full h-[400px] overflow-y-auto custom__scrollbar px-4", children: _jsx(FormProvider, { ...methods, children: _jsxs("form", { onSubmit: methods.handleSubmit(handleSignUp), className: "flex flex-col gap-y-4 my-4", children: [_jsx(NameInput, { name: "email", type: "email", label: "Email Address", error: methods.formState.errors.email }), _jsx(NameInput, { name: "username", type: "text", label: "Username", error: methods.formState.errors.username }), _jsx(NameInput, { name: "first_name", type: "text", label: "First Name", error: methods.formState.errors.first_name }), _jsx(NameInput, { name: "last_name", type: "text", label: "Last Name", error: methods.formState.errors.last_name }), _jsx(NameInput, { name: "phone_number", type: "text", label: "Phone Number", error: methods.formState.errors.phone_number }), _jsx(PasswordInput, { name: "password", label: "Password", error: methods.formState.errors.password }), _jsx(SelectInput, { options: roleOptions, control: methods.control, handleChange: handleRoleChange, label: "Role", title: "Select Role...." }), _jsx(Button, { type: "submit", loading: isLoading, disabled: methods.formState.isSubmitting || !methods.formState.isValid, children: "Create Task" })] }) }) }), " "] }));
};
export default CreateUserFrom;
