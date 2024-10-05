import Button from "@/components/button/Button";
import PasswordInput from "@/components/input/PasswordInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const passwordSchema = z.string().min(7, { message: "At least 7 characters" });

const ForgotPasswordSchema = z
  .object({
    old_password: passwordSchema,
    new_password: passwordSchema,
  })
  .refine((data) => data.old_password === data.new_password, {
    message: "Passwords do not match",
    path: ["new_password"],
  });

type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const methods = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = (data) => {
    console.log(data);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-screen h-screen bg-primary bg-opacity-[12%]">
      <div className="flex justify-center w-full h-full items-center">
        <div className="lg:border-2 bg-white p-5 lg:shadow-sm lg:h-[380px] h-full flex flex-col justify-center lg:rounded-md lg:w-[350px] md:w[350px] w-full">
          <FormProvider {...methods}>
            <div className="flex justify-between items-center pb-6">
              <span className="cursor-pointer" onClick={handleGoBack}>
                <ChevronLeft />
              </span>
              <h1 className="font-semibold flex justify-center capitalize">
                Forgot password
              </h1>
            </div>

            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-4 mt-4"
            >
              <PasswordInput
                name="old_password"
                label="Old Password"
                error={methods.formState.errors.old_password}
              />

              <PasswordInput
                name="new_password"
                label="New Password"
                error={methods.formState.errors.new_password}
              />

              <Button
                type="submit"
                disabled={
                  methods.formState.isSubmitting || !methods.formState.isValid
                }
              >
                Submit
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
