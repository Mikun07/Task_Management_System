export interface BaseState {
  success: boolean;
  data: unknown | [];
  error: string | null;
  loading: boolean;
}

export interface LoginState extends BaseState {
  isLoggedIn: boolean;
}

interface AssignedUser {
  task_id: number;
  user_id: number;
  id: number;
}

interface Task {
  id: number;
  title: string;
  priority: string;
  status: string;
  assigned_to: AssignedUser[]; // Updated to reflect the array of assigned users
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
  getAllUser: BaseState;
  createTask: BaseState;
  getTask: BaseState;
  editTask: BaseState;
  removeTask: BaseState;
  sendInvite: BaseState
  getBoard: BaseState;
  getInviteTask: BaseState;
  inviteCreateTask: BaseState;
};
