"use client";
import { useLogout } from "@/hooks/useLogout";
import { svgs } from "../icons/svgs";
const LogoutButton = () => {
  const logoutUser = useLogout();
  return (
    <div
      className="text-xs font-semibold text-logout cursor-pointer
     flex items-center  gap-1"
    >
      {svgs.logoutIcon}
      <button onClick={logoutUser}>Log Out</button>
    </div>
  );
};
export default LogoutButton;
