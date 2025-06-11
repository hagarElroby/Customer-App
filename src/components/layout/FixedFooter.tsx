"use client";

import React from "react";
import { svgs } from "../icons/svgs";
import Link from "next/link";
import { Avatar } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { usePathname } from "next/navigation";

const FixedFooter = () => {
  const pathName = usePathname();
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);

  const isActive = (path: string) => pathName === path;

  return (
    <div className="flex md:hidden fixed z-20 left-0 bottom-0 right-0 py-4 px-7 w-full h-20 bg-white border-t border-main rounded-t-lg">
      <div className="flex items-center justify-between w-full ssm:w-[80%] mx-auto">
        <div className="flex flex-col items-center justify-center gap-2">
          <Link href="/">
            {isActive("/") ? svgs.filledRedHome : svgs.grayHome}
          </Link>
          <span
            className={`text-xs font-medium ${isActive("/") ? "text-main" : "text-[#CACACA]"}`}
          >
            Home
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          {/* //TODO: change to auctions path  */}
          <Link href="/auctions">
            {isActive("/auctions/") ? svgs.redAuctions : svgs.grayAuctions}
          </Link>
          <span
            className={`text-xs font-medium ${isActive("/auctions/") ? "text-main" : "text-[#CACACA]"}`}
          >
            Auctions
          </span>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <Link href="/cart">
            {isActive("/cart/") ? svgs.redCartBack : svgs.grayCartBack}
          </Link>
          <span
            className={`text-xs font-medium ${isActive("/cart/") ? "text-main" : "text-[#CACACA]"}`}
          >
            Cart
          </span>{" "}
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          {isLoggedIn && user?.profilePicture ? (
            <Link href="/profile" className="border border-main rounded-full">
              <Avatar src={user.profilePicture || ""} />
            </Link>
          ) : (
            <Link href={isLoggedIn ? "/profile" : "/auth/login"}>
              {isActive("/profile/") ? svgs.redAvatar : svgs.grayAvatar}
            </Link>
          )}
          <span
            className={`text-xs font-medium ${isActive("/profile/") ? "text-main" : "text-[#CACACA]"}`}
          >
            {isLoggedIn ? "Account" : "Login"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FixedFooter;
