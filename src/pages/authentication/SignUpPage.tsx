import Button from "@/components/button/Button";
import NameInput from "@/components/input/NameInput";
import PasswordInput from "@/components/input/PasswordInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { postSignUp } from "@/redux/features/signUpSlice";
import toast from "react-hot-toast";
import { RootState } from "@/redux/root";

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

// Type for form values inferred from the schema
export type SignUpFormValues = z.infer<typeof SignUpSchema>;

const SignUpPage = () => {
  // useNavigate hook to programmatically navigate between pages
  const navigate = useNavigate();

  // Initialize useForm hook with Zod resolver and validation schema
  const methods = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema), // Zod resolver to validate form
    mode: "onChange", // Validation mode triggers on change
  });

  // Access the Redux state for loading status
  const isLoading = useSelector((state: RootState) => state?.signUp?.loading);

  // useDispatch hook to dispatch actions to the Redux store
  const dispatch = useDispatch<AppDispatch>();

  // Submit handler for the sign-up form
  const handleSignUp: SubmitHandler<SignUpFormValues> = (signUpValues) => {
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
        const success: boolean = Boolean(payload?.status === 201);
        if (success) {
          // If sign-up is successful, navigate to login page and show success toast
          navigate("/login");
          toast.success(payload?.data?.message);
        } else {
          toast.error(payload?.detail);
        }
      })
      .catch(() => {
        // Handle errors during sign-up process
        toast.error("An error occurred during sign-up.");
      });
  };

  // Function to navigate to the login page
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="w-screen h-screen bg-primary bg-opacity-[12%]">
      <div className="flex justify-center w-full h-full items-center">
        <div className="lg:border-2 bg-white p-5 lg:shadow-sm lg:h-[480px] h-full flex flex-col justify-center lg:rounded-md lg:w-[460px] md:w[350px] w-full">
          <FormProvider {...methods}>
            <h1 className="font-semibold flex justify-center">Sign Up</h1>

            {/* Form structure */}
            <form
              onSubmit={methods.handleSubmit(handleSignUp)} // Handle form submission
              className="flex flex-col gap-y-4 mt-4"
            >
              <div className="grid grid-cols-2 gap-4">
                {/* Form fields for sign-up */}
                <NameInput
                  name="email"
                  type="email"
                  label="Email Address"
                  error={methods.formState.errors.email} // Show validation error
                />
                <NameInput
                  name="username"
                  type="text"
                  label="Username"
                  error={methods.formState.errors.username}
                />
                <NameInput
                  name="first_name"
                  type="text"
                  label="First Name"
                  error={methods.formState.errors.first_name}
                />
                <NameInput
                  name="last_name"
                  type="text"
                  label="Last Name"
                  error={methods.formState.errors.last_name}
                />
                <NameInput
                  name="phone_number"
                  type="text"
                  label="Phone Number"
                  error={methods.formState.errors.phone_number}
                />
                <PasswordInput
                  name="password"
                  label="Password"
                  error={methods.formState.errors.password}
                />
              </div>

              <div className="flex flex-col gap-1">
                {/* Link to navigate to the login page */}
                <p className="capitalize flex justify-center text-[14px]">
                  I already have an account
                  <b
                    onClick={handleLogin} // Handle click event to navigate to login page
                    className="hover:text-primary cursor-pointer"
                  >
                    {" "}
                    Login
                  </b>
                </p>
              </div>

              {/* Submit button for registration */}
              <Button
                type="submit"
                loading={isLoading} // Show loading indicator if form is submitting
                disabled={
                  methods.formState.isSubmitting || !methods.formState.isValid // Disable button if form is invalid
                }
              >
                Register
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
