import { z } from "zod";
declare const CreateTaskSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    deadline: z.ZodString;
    priority: z.ZodEnum<[string, ...string[]]>;
    status: z.ZodEnum<[string, ...string[]]>;
    assigned_to: z.ZodEnum<[string, ...string[]]>;
}, "strip", z.ZodTypeAny, {
    title?: string;
    status?: string;
    description?: string;
    deadline?: string;
    priority?: string;
    assigned_to?: string;
}, {
    title?: string;
    status?: string;
    description?: string;
    deadline?: string;
    priority?: string;
    assigned_to?: string;
}>;
export type CreateTaskFormValues = z.infer<typeof CreateTaskSchema>;
declare const CreateTaskForm: () => import("react/jsx-runtime").JSX.Element;
export default CreateTaskForm;
