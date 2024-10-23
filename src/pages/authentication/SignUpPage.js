import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Button from "@/components/button/Button";
import NameInput from "@/components/input/NameInput";
import PasswordInput from "@/components/input/PasswordInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { postSignUp } from "@/redux/features/signUpSlice";
import toast from "react-hot-toast";
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
});
const SignUpPage = () => {
    // useNavigate hook to programmatically navigate between pages
    const navigate = useNavigate();
    // Initialize useForm hook with Zod resolver and validation schema
    const methods = useForm({
        resolver: zodResolver(SignUpSchema), // Zod resolver to validate form
        mode: "onChange", // Validation mode triggers on change
    });
    // Access the Redux state for loading status
    const isLoading = useSelector((state) => state?.signUp?.loading);
    // useDispatch hook to dispatch actions to the Redux store
    const dispatch = useDispatch();
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
            role: "admin", // Default role is "admin"
        };
        // Dispatch the postSignUp action to the Redux store
        dispatch(postSignUp(signUpData))
            .then((result) => {
            const { payload } = result;
            const success = Boolean(payload?.status === 201);
            if (success) {
                // If sign-up is successful, navigate to login page and show success toast
                navigate("/login");
                toast.success(payload?.data?.message);
            }
            else {
                toast.error(payload?.detail);
            }
        })
            .catch(() => {
            // Handle errors during sign-up process
            toast.error("network error");
        });
    };
    // Function to navigate to the login page
    const handleLogin = () => {
        navigate("/login");
    };
    return (_jsx("div", { className: "w-screen h-screen bg-primary bg-opacity-[12%]", children: _jsx("div", { className: "flex justify-center w-full h-full items-center", children: _jsx("div", { className: "lg:border-2 bg-white p-5 lg:shadow-sm lg:h-[480px] h-full flex flex-col justify-center lg:rounded-md lg:w-[460px] md:w[350px] w-full", children: _jsxs(FormProvider, { ...methods, children: [_jsx("h1", { className: "font-semibold flex justify-center", children: "Sign Up" }), _jsxs("form", { onSubmit: methods.handleSubmit(handleSignUp), className: "flex flex-col gap-y-4 mt-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(NameInput, { name: "email", type: "email", label: "Email Address", error: methods.formState.errors.email }), _jsx(NameInput, { name: "username", type: "text", label: "Username", error: methods.formState.errors.username }), _jsx(NameInput, { name: "first_name", type: "text", label: "First Name", error: methods.formState.errors.first_name }), _jsx(NameInput, { name: "last_name", type: "text", label: "Last Name", error: methods.formState.errors.last_name }), _jsx(NameInput, { name: "phone_number", type: "text", label: "Phone Number", error: methods.formState.errors.phone_number }), _jsx(PasswordInput, { name: "password", label: "Password", error: methods.formState.errors.password })] }), _jsx("div", { className: "flex flex-col gap-1", children: _jsxs("p", { className: "capitalize flex justify-center text-[14px]", children: ["I already have an account", _jsxs("b", { onClick: handleLogin, className: "hover:text-primary cursor-pointer", children: [" ", "Login"] })] }) }), _jsx(Button, { type: "submit", loading: isLoading, disabled: methods.formState.isSubmitting || !methods.formState.isValid // Disable button if form is invalid
                                    , children: "Register" })] })] }) }) }) }));
};
export default SignUpPage;
