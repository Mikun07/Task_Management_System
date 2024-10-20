import { z } from "zod";
interface Task {
    id: number;
    title: string;
    priority: string;
    status: string;
    assigned_to: string;
    created_at: string;
    deadline: string;
    description: string;
    owner_id: number;
}
declare const editTaskSchema: z.ZodObject<{
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
export type editTaskFormValues = z.infer<typeof editTaskSchema>;
declare const EditTaskForm: ({ task }: {
    task: Task;
}) => import("react/jsx-runtime").JSX.Element;
export default EditTaskForm;
