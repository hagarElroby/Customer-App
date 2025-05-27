import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const withAuthRedirect = (WrappedComponent: React.ComponentType) => {
  const AuthRedirect = (props: any) => {
    const router = useRouter();
    const { isLoggedIn } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
      if (isLoggedIn) {
        router.replace("/"); // Redirect logged-in users
      }
    }, [isLoggedIn]);

    return <WrappedComponent {...props} />;
  };

  return AuthRedirect;
};

export default withAuthRedirect;
