"use client";
import { useSelector } from "react-redux";

const ProfileName = () => {
  const { firstName, lastName } =
    useSelector((state: any) => state.userData?.user) || "";
  return (
    <h2 className="font-medium text-base text-headColor">{`${firstName} ${lastName}`}</h2>
  );
};
export default ProfileName;
