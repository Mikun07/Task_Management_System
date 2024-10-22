import { fetchAllUser } from "@/redux/features/getAllUserSlice";
import { RootState } from "@/redux/root";
import { AppDispatch } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import Button from "../button/Button";
import SelectInput from "../input/SelectInput";
import { invitedUser } from "@/redux/features/inviteUserSlice";
import toast from "react-hot-toast";

// Define the User interface
interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

// Define OptionType for dropdowns
interface OptionType {
  value: string;
  label: string;
}

const inviteFormSchema = z.object({
  user_email: z.string(),
});

export type inviteFormValues = z.infer<typeof inviteFormSchema>;

const InviteForm = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const methods = useForm<inviteFormValues>({
    resolver: zodResolver(inviteFormSchema),
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);

  const isLoading = useSelector(
    (state: RootState) => state?.sendInvite?.loading
  );

  // Ensure allUser is always at least an empty array
  const { data: allUser = [] } = useSelector(
    (state: RootState) => state?.getAllUser || { data: [], loading: false }
  ) as { data: User[]; loading: boolean };

  // Use optional chaining in case allUser is null or undefined
  const userOptions = allUser?.map((user) => ({
    value: user.email.toString(),
    label: `${user.last_name} ${user.first_name}`,
  }));

  const handleUsersChange = (selectedUser: OptionType | null) => {
    if (selectedUser) {
      methods.setValue("user_email", selectedUser.value);
    } else {
      methods.setValue("user_email", "");
    }
  };

  const handleCreateTask: SubmitHandler<inviteFormValues> = (inviteValues) => {
    const inviteUserData = {
      user_email: inviteValues?.user_email,
    };
    dispatch(invitedUser(inviteUserData))
      .then((result) => {
        const { payload } = result;
        const success: boolean = Boolean(payload?.status === 200);
        if (success) {
          toast.success(payload?.data?.message);
          onClose();
        } else {
          toast.error("Failed, Try again");
        }
      })
      .catch(() => {
        toast.error("An error occurred during task creation.");
      });
  };

  return (
    <div>
      <div className="lg:w-[550px] md:w-[500px] w-full h-[400px] overflow-y-auto custom__scrollbar px-4">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleCreateTask)}
            className="flex flex-col gap-y-4 my-4"
          >
            <SelectInput
              options={userOptions}
              control={methods.control}
              handleChange={handleUsersChange}
              label="Assign To"
              title="Select a User...."
            />

            <Button
              type="submit"
              loading={isLoading}
              disabled={
                methods.formState.isSubmitting || !methods.formState.isValid
              }
            >
              Sent invite
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default InviteForm;
