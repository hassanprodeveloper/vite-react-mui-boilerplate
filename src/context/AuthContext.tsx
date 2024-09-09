// ** React Imports
import { createContext, useEffect, useState, ReactNode } from "react";

// ** Next Import
import useRouter from "src/hooks/useRouter";

// ** Config
import authConfig from "src/configs/auth";

// ** Types
import {
  AuthValuesType,
  LoginParams,
  ErrCallbackType,
  UserDataType,
} from "./types";

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
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  // ** Hooks
  const router = useRouter();

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(
        authConfig.storageTokenKeyName
      )!;
      const userData = window.localStorage.getItem("userData");

      if (!storedToken || !userData) {
        setLoading(false);
        return;
      }

      setLoading(true);

      setUser({ ...JSON.parse(userData) });

      setLoading(false);

      // await axios
      //   .get(authConfig.meEndpoint, {
      //     headers: {
      //       Authorization: storedToken,
      //     },
      //   })
      //   .then(async (response) => {
      //     setLoading(false);
      //     setUser({ ...response.data.userData });
      //   })
      //   .catch(() => {
      //     localStorage.removeItem("userData");
      //     localStorage.removeItem("refreshToken");
      //     localStorage.removeItem("accessToken");
      //     setUser(null);
      //     setLoading(false);
      //     if (
      //       authConfig.onTokenExpiration === "logout" &&
      //       !router.pathname.includes("login")
      //     ) {
      //       router.replace("/login");
      //     }
      //   });
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (
    params: LoginParams,
    errorCallback?: ErrCallbackType
  ) => {
    // axios.post(authConfig.loginEndpoint, params)
    new Promise((resolve) => setTimeout(resolve, 1000))
      .then(async () => {
        // .then(async (response) => {
        const response = {
          data: {
            userData: {
              id: 1,
              role: "admin",
              email: "admin@materialize.com",
              fullName: "Admin",
              username: "admin",
              password: "1234",
            },
            accessToken: "token",
          },
        };
        params.rememberMe
          ? window.localStorage.setItem(
              authConfig.storageTokenKeyName,
              response.data.accessToken
            )
          : null;
        const returnUrl = router.query.returnUrl;

        setUser({ ...response.data.userData });
        params.rememberMe
          ? window.localStorage.setItem(
              "userData",
              JSON.stringify(response.data.userData)
            )
          : null;

        const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";

        router.replace(redirectURL as string);
      })
      .catch((err) => {
        if (errorCallback) errorCallback(err);
      });
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("userData");
    window.localStorage.removeItem(authConfig.storageTokenKeyName);
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
