// ** React Imports
import { useState, useEffect, ReactNode } from "react";
import useRouter from "src/hooks/useRouter";

interface Props {
  children: ReactNode;
}

const WindowWrapper = ({ children }: Props) => {
  // ** State
  const [windowReadyFlag, setWindowReadyFlag] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowReadyFlag(true);
    }
  }, [router.route]);

  if (windowReadyFlag) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export default WindowWrapper;
