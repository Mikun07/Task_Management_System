export interface BaseState {
    success: boolean;
    data: unknown;
    error: string | null;
    loading: boolean;
}
export interface LoginState extends BaseState {
    isLoggedIn: boolean;
}
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
export interface TaskState extends BaseState {
    data: Task[] | null;
}
export type RootState = {
    login: LoginState;
    signUp: BaseState;
    getUser: BaseState;
    createTask: BaseState;
    getTask: BaseState;
    editTask: BaseState;
};
export {};
