"use client";
import { svgs } from "../icons/svgs";
import { Badge, Dropdown, Flex, Image, MenuProps } from "antd";
import LogoutButton from "./LogoutButton";
import { useRouter } from "next/navigation";
import { UserLoginResponse } from "@/types/user";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { updateCartAndState } from "@/utils/cartHelpers";
import { updateWishlistAndState } from "@/utils/updateWishlistAndState";

const TopNavRightSide = ({ user }: { user: UserLoginResponse | null }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  //Fetch items in cart and wishlist
  useEffect(() => {
    if (user) {
      updateCartAndState({ dispatch });
      updateWishlistAndState({ dispatch });
    }
  }, [user]);

  const { carts } = useSelector((state: RootState) => state.cart);
  const { whishlistItems } = useSelector((state: RootState) => state.whishlist);
  const cartItemsCount = carts?.length ?? 0;
  console.log({ carts });
  const whishlistItemsCount = whishlistItems?.length ?? 0;

  const handleClickToLogin = () => {
    router.push("/auth/login");
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div
          onClick={() => router.push(`/profile`)}
          className="flex items-center gap-1 cursor-pointer"
        >
          {svgs.profileIcon}
          <span className="font-semibold text-xs text-meduimBlack">
            Profile
          </span>
        </div>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: <LogoutButton />,
      key: "1",
    },
  ];

  return (
    <div className="flex-1 flex items-center justify-end gap-3 lg:gap-4">
      <div className="hidden md:flex items-center justify-center gap-2 bg-[#858D9D63] rounded-[39px] p-3 w-[85px] h-[38px]">
        <span>{svgs.langIcon}</span>
        <span className="text-base font-bold text-[#1C1818]">EN</span>
      </div>
      {user && (
        <Flex gap={16} align="center" justify="center">
          {/* //TODO: change count based on items length  */}
          <Badge className="cursor-pointer">
            <span>{svgs.notification}</span>
          </Badge>
          <Badge
            count={
              typeof whishlistItemsCount === "number" ? whishlistItemsCount : 0
            }
            className="cursor-pointer"
            onClick={() => router.push("/whishlist")}
          >
            {svgs.grayHeart}
          </Badge>
          <Badge
            count={cartItemsCount}
            className="cursor-pointer hidden md:block"
            onClick={() => router.push("/cart")}
          >
            {svgs.grayCart}
          </Badge>
        </Flex>
      )}

      <div className="m-3">
        {!user && (
          <div className="flex gap-2 items-center">
            <button
              onClick={handleClickToLogin}
              className="hidden md:flex text-main text-xs xl:text-sm font-medium p-2 items-center gap-2 outline-none"
            >
              {svgs.defaultAvatar}
              Login / Register
            </button>
            <button onClick={handleClickToLogin}>{svgs.grayHeart}</button>
            <button className="hidden md:block" onClick={handleClickToLogin}>
              {svgs.grayCart}
            </button>
          </div>
        )}

        {user && (
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            className=" hidden md:flex"
          >
            <Flex align="center" gap={8} className="cursor-pointer">
              {user.profilePicture ? (
                <Image
                  preview={false}
                  style={{ borderRadius: "50%" }}
                  src={user.profilePicture}
                  alt="user"
                  width={40}
                  height={40}
                />
              ) : (
                svgs.defaultAvatar
              )}
              <Flex gap={2} justify="center" vertical>
                <div className="text-[#700C18] text-[14px]">
                  {user.role === "USER" && "Hi, "}
                  {user?.firstName}
                </div>
              </Flex>
              {svgs.downArrow}
            </Flex>
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default TopNavRightSide;
