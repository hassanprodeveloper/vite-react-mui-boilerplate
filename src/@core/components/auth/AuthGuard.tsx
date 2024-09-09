// ** React Imports
import { ReactNode, ReactElement, useEffect } from "react";

// ** Hooks Import
import { useAuth } from "src/hooks/useAuth";
import useRouter from "src/hooks/useRouter";

interface AuthGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props;
  const auth = useAuth();
  const router = useRouter();

  console.log("AuthGuard router", router);

  useEffect(
    () => {
      if (auth.user === null && !window.localStorage.getItem("userData")) {
        if (router.asPath !== "/" && router.asPath !== "/login") {
          router.replace({
            pathname: "/login",
            query: { returnUrl: router.asPath },
          });
        } else {
          router.replace("/login");
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  );

  if (auth.loading || auth.user === null) {
    return fallback;
  }

  return <>{children}</>;
};

export default AuthGuard;
