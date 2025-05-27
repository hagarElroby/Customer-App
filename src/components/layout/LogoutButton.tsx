"use client";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/redux/store";
import { logout } from "@/services/auth";
import { clearUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { svgs } from "../icons/svgs";

const LogoutButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = async () => {
    await logout({
      onSuccess: (data) => {
        localStorage.removeItem("user");
        dispatch(clearUser());
        router.push("/");
      },
      onError: (error) => {
        toast.error(error.description);
      },
    });
  };

  return (
    <div
      className="text-xs font-semibold text-logout cursor-pointer
     flex items-center  gap-1"
    >
      {svgs.logoutIcon}
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};
export default LogoutButton;
