import { AdminUser } from "src/types/user";

export type ErrCallbackType = (err: { [key: string]: string }) => void;

export type LoginParams = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type AuthValuesType = {
  loading: boolean;
  logout: () => void;
  user: AdminUser | null;
  setLoading: (value: boolean) => void;
  setUser: (value: AdminUser | null) => void;
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void;
};
