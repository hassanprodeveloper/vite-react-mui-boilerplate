// ** React Imports
import { ReactNode, ReactElement, useEffect } from "react";
import authConfig from "src/configs/auth";

// ** Hooks Import
import { useAuth } from "src/hooks/useAuth";
import useRouter from "src/hooks/useRouter";

interface GuestGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props;
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (window.localStorage.getItem(authConfig.userDataKeyName)) {
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route]);

  if (auth.loading || (!auth.loading && auth.user !== null)) {
    return fallback;
  }

  return <>{children}</>;
};

export default GuestGuard;
