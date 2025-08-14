import { clearUser } from "@/redux/authSlice";
import { logout } from "@/services/auth/logout";
import { removeFCMToken } from "@/services/fcmToken/remove-fcm-token";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return async () => {
    await removeFCMToken({
      onSuccess: async () => {
        await logout({
          onSuccess: () => {
            localStorage.removeItem("FCMToken");
            localStorage.removeItem("user");
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("jwtRefreshToken");
            dispatch(clearUser());
            router.push("/");
          },
        });
      },
      onError: (error) => {
        toast.error(error.description);
      },
    });
  };
};
