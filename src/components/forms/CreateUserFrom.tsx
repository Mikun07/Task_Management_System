import Button from "@/components/button/Button";
import NameInput from "@/components/input/NameInput";
import PasswordInput from "@/components/input/PasswordInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { postSignUp } from "@/redux/features/signUpSlice";
import toast from "react-hot-toast";
import { RootState } from "@/redux/root";
import { Roles } from "@/data/data.json";
import SelectInput from "../input/SelectInput";

// Define OptionType for dropdowns
interface OptionType {
  value: string;
  label: string;
}

const roleValues = Roles.map((role) => role.value) as [string, ...string[]];

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

// Type for form values inferred from the schema
export type SignUpFormValues = z.infer<typeof SignUpSchema>;

const CreateUserFrom = ({ onClose }) => {
  // Initialize useForm hook with Zod resolver and validation schema
  const methods = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema), // Zod resolver to validate form
    mode: "onChange", // Validation mode triggers on change
  });

  // Access the Redux state for loading status
  const isLoading = useSelector((state: RootState) => state?.signUp?.loading);

  // useDispatch hook to dispatch actions to the Redux store
  const dispatch = useDispatch<AppDispatch>();

  const handleRoleChange = (selectedUser: OptionType | null) => {
    if (selectedUser) {
      methods.setValue("role", selectedUser.value);
    } else {
      methods.setValue("role", "");
    }
  };

  const roleOptions = Roles.map((role) => ({
    value: role.value,
    label: role.label,
  }));

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
      role: signUpValues?.role,
    };

    // Dispatch the postSignUp action to the Redux store
    dispatch(postSignUp(signUpData))
      .then((result) => {
        const { payload } = result;
        const success: boolean = Boolean(payload?.status === 201);
        if (success) {
          toast.success(payload?.data?.message);
          onClose();
        } else {
          toast.error(payload?.detail);
        }
      })
      .catch(() => {
        // Handle errors during sign-up process
        toast.error("An error occurred during sign-up.");
      });
  };

  return (
    <div>
      {" "}
      <div className="lg:w-[550px] md:w-[500px] w-full h-[400px] overflow-y-auto custom__scrollbar px-4">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleSignUp)}
            className="flex flex-col gap-y-4 my-4"
          >
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
            <SelectInput
              options={roleOptions}
              control={methods.control}
              handleChange={handleRoleChange}
              label="Role"
              title="Select Role...."
            />

            <Button
              type="submit"
              loading={isLoading}
              disabled={
                methods.formState.isSubmitting || !methods.formState.isValid
              }
            >
              Create Task
            </Button>
          </form>
        </FormProvider>
      </div>{" "}
    </div>
  );
};

export default CreateUserFrom;
