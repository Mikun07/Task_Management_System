import { z } from "zod";
declare const SignUpSchema: z.ZodObject<{
    email: z.ZodString;
    username: z.ZodString;
    first_name: z.ZodString;
    last_name: z.ZodString;
    phone_number: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    password?: string;
}, {
    email?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    password?: string;
}>;
export type SignUpFormValues = z.infer<typeof SignUpSchema>;
declare const SignUpPage: () => import("react/jsx-runtime").JSX.Element;
export default SignUpPage;
