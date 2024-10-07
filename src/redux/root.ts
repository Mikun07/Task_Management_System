export interface BaseState {
  success: boolean;
  data: unknown; // Use unknown instead of any
  error: string | null;
  loading: boolean;
}

export interface LoginState extends BaseState {
  isLoggedIn: boolean;
}

export type RootState = {
  login: LoginState;
  signUp: BaseState;
};
