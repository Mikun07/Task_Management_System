import Button from "@/components/button/Button";
import NameInput from "@/components/input/NameInput";
import PasswordInput from "@/components/input/PasswordInput";
// import SelectInput from "@/components/input/SelectInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
// import { Roles } from "../../data/data.json";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { postSignUp } from "@/redux/features/signUpSlice";
import toast from "react-hot-toast";
import { RootState } from "@/redux/root";

// // Interface for role options
// interface OptionType {
//   value: string;
//   label: string;
// }

// Validation schema using Zod
const passwordSchema = z.string().min(7, { message: "At least 7 characters" });

// const roleValues = Roles.map((role) => role.value) as [string, ...string[]];

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
  // role: z.enum(roleValues),
  // role: z.string(),
});

export type SignUpFormValues = z.infer<typeof SignUpSchema>;

const SignUpPage = () => {
  const navigate = useNavigate();
  const methods = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
  });
  const isLoading = useSelector((state: RootState) => state?.signUp?.loading);
  const dispatch = useDispatch<AppDispatch>();

  // const handleRoleChange = (selectedRole: OptionType | null) => {
  //   // Update the role in the form
  //   if (selectedRole) {
  //     methods.setValue("role", selectedRole.value); // Set the role value directly
  //   } else {
  //     methods.setValue("role", ""); // Reset the value if no role is selected
  //   }
  // };

  // const roleOptions = Roles.map((role) => ({
  //   value: role.value,
  //   label: role.label,
  // }));

  const handleSignUp: SubmitHandler<SignUpFormValues> = (signUpValues) => {
    const signUpData = {
      email: signUpValues.email,
      username: signUpValues.username,
      first_name: signUpValues.first_name,
      last_name: signUpValues.last_name,
      phone_number: signUpValues.phone_number,
      password: signUpValues.password,
      role: "admin",
    };

    dispatch(postSignUp(signUpData))
      .then((result) => {
        const { payload } = result;
        const success: boolean = Boolean(payload?.status === 201);
        if (success) {
          navigate("/login");
          toast.success(payload?.data?.message);
        } else {
          toast.error("Sign-up failed.");
        }
      })
      .catch(() => {
        toast.error("An error occurred during sign-up.");
      });
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="w-screen h-screen bg-primary bg-opacity-[12%]">
      <div className="flex justify-center w-full h-full items-center">
        <div className="lg:border-2 bg-white p-5 lg:shadow-sm lg:h-[480px] h-full flex flex-col justify-center lg:rounded-md lg:w-[460px] md:w[350px] w-full">
          <FormProvider {...methods}>
            <h1 className="font-semibold flex justify-center">Sign Up</h1>

            <form
              onSubmit={methods.handleSubmit(handleSignUp)}
              className="flex flex-col gap-y-4 mt-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <NameInput
                  name="email"
                  type="email"
                  label="Email Address"
                  error={methods.formState.errors.email}
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
                {/* <SelectInput
                  options={roleOptions}
                  control={methods.control}
                  handleChange={handleRoleChange}
                  label="role"
                  title="Select Role...."
                /> */}
              </div>

              <div className="flex flex-col gap-1">
                <p className="capitalize flex justify-center text-[14px]">
                  I already have an account
                  <b
                    onClick={handleLogin}
                    className="hover:text-primary cursor-pointer"
                  >
                    {" "}
                    Login
                  </b>
                </p>
              </div>

              <Button
                type="submit"
                loading={isLoading}
                disabled={
                  methods.formState.isSubmitting || !methods.formState.isValid
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
