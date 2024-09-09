// ** React Imports
import { createContext, useEffect, useState, ReactNode } from "react";

// ** Next Import
import useRouter from "src/hooks/useRouter";

// ** Config
import authConfig from "src/configs/auth";

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType } from "./types";
import login from "src/services/auth/login";
import { AdminUser } from "src/types/user";

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<AdminUser | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  // ** Hooks
  const router = useRouter();

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = localStorage.getItem(authConfig.storageTokenKeyName)!;
      const userData = localStorage.getItem(authConfig.userDataKeyName);

      if (!storedToken || !userData) {
        setLoading(false);
        return;
      }

      setLoading(true);

      setUser({ ...JSON.parse(userData) });

      setLoading(false);
    };

    initAuth();
  }, []);

  const handleLogin = async (
    params: LoginParams,
    errorCallback?: ErrCallbackType
  ) => {
    try {
      setLoading(true);
      const response = await login(params);

      if (!response.success) throw new Error(response.message);

      params.rememberMe
        ? localStorage.setItem(authConfig.storageTokenKeyName, response.token)
        : null;
      const returnUrl = router.query.returnUrl;

      const userData: AdminUser = { ...response.admin, role: response.role };

      setUser(userData);
      if (params.rememberMe) {
        localStorage.setItem(
          authConfig.userDataKeyName,
          JSON.stringify(userData)
        );
        localStorage.setItem(authConfig.storageTokenKeyName, response.token);
      }

      const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";

      router.replace(redirectURL as string);
    } catch (error: any) {
      if (errorCallback) errorCallback(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem(authConfig.userDataKeyName);
    localStorage.removeItem(authConfig.storageTokenKeyName);
    router.push("/login");
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
