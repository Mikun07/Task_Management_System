export interface BaseState {
  success: boolean;
  data: any;
  error: string | null;
  loading: boolean;
}

export interface LoginState extends BaseState {
  isLoggedIn: boolean
}

export type RootState = {
  login: LoginState,
  signUp: BaseState,
}