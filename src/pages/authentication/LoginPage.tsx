import { z } from "zod";
import Button from "@/components/button/Button";
import NameInput from "@/components/input/NameInput";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "@/components/input/PasswordInput";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { postLogin } from "@/redux/features/loginSlice";
import toast from "react-hot-toast";
import { RootState } from "@/redux/root";
import { PayloadAction } from "@reduxjs/toolkit";

interface loginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  status: number;
  message?: string;
  detail?: string;
}

const passwordSchema = z.string().min(7, { message: "At least 7 characters" });

const LoginSchema = z.object({
  username: z
    .string()
    .min(2, { message: "At least 2 characters." })
    .max(30, { message: "At most 30 characters." }),
  password: passwordSchema,
});

type LoginFormValues = z.infer<typeof LoginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });

  const isLoading = useSelector((state: RootState) => state?.login?.loading);
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<LoginFormValues> = (loginValues) => {
    const loginData = {
      username: loginValues.username,
      password: loginValues.password,
    };

    dispatch(postLogin(loginData))
      .then((result) => {
        const { payload } = result as PayloadAction<
          { data: LoginResponse; status: number },
          string,
          { arg: loginPayload; requestId: string; requestStatus: "fulfilled" },
          never
        >;
        const success: boolean = payload?.status === 200;
        if (success) {
          navigate("/layout/dashboard");
          toast.success("Login Successful");
        } else {
          const errorMessage =
            payload?.data?.detail ||
            payload?.data?.message ||
            "Invalid username or password";
          toast.error(errorMessage);
        }
      })
      .catch((error) => {
        toast.error("Login error: " + (error as Error).message);
      });
  };

  const handleForgotPassword = () => {
    navigate("/forgotPassword");
  };

  const handleSignUp = () => {
    navigate("/signUp");
  };

  // console.log("Form Errors:", methods.formState.errors);
  // console.log("Form Values:", methods.getValues());

  return (
    <div className="w-screen h-screen bg-primary bg-opacity-[12%]">
      <div className="flex justify-center w-full h-full items-center">
        <div className="lg:border-2 bg-white p-5 lg:shadow-sm lg:h-[380px] h-full flex flex-col justify-center lg:rounded-md lg:w-[350px] md:w[350px] w-full">
          <FormProvider {...methods}>
            <h1 className="font-semibold flex justify-center">Login</h1>

            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-4 mt-4"
            >
              <NameInput
                name="username"
                type="name"
                label="Username"
                error={methods.formState.errors.username}
              />

              <PasswordInput
                name="password"
                label="Password"
                error={methods.formState.errors.password}
              />

              <div className="flex flex-col gap-1">
                <p
                  onClick={handleForgotPassword}
                  className="capitalize flex justify-center text-[14px] pl-7 hover:text-primary hover:scale-105 transition duration-300 cursor-pointer"
                >
                  forgot password?
                </p>
                <p className="capitalize flex justify-center text-[14px]">
                  Don’t have an account?{" "}
                  <span
                    onClick={handleSignUp}
                    className="hover:text-primary cursor-pointer"
                  >
                    {" "}
                    Register
                  </span>
                </p>
              </div>

              <Button
                type="submit"
                loading={isLoading}
                disabled={
                  methods.formState.isSubmitting || !methods.formState.isValid
                }
              >
                Login
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
