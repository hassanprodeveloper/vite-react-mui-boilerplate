import AuthGuard from "src/@core/components/auth/AuthGuard";
import GuestGuard from "src/@core/components/auth/GuestGuard";
import Spinner from "src/@core/components/spinner";

interface GuardProps {
  children: React.ReactNode;
  guestGuard?: boolean;
  authGuard?: boolean;
}

const Guard = ({ children, guestGuard, authGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>;
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>;
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>;
  }
};

export default Guard;
