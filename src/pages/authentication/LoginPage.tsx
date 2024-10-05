import { z } from "zod";
import Button from "@/components/button/Button";
import NameInput from "@/components/input/NameInput";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "@/components/input/PasswordInput";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const passwordSchema = z.string().min(7, { message: "At least 7 characters" });

const LoginSchema = z.object({
  username: z.string().email({ message: "Invalid email address" }),
  password: passwordSchema,
});

type LoginFormValues = z.infer<typeof LoginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log(data);
  };

  const handleForgotPassword = () => {
    navigate("/forgotPassword");
  };

  const handleSignUp = () => {
    navigate("/signUp");
  };

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
