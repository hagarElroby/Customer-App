import React from "react";
import ItemCoulmn from "./ItemColumn";
import TitleCoulmn from "./TitleCoulmn";
import { useRouter } from "next/navigation";
import { svgs } from "../icons/svgs";

const TopSectionFooter = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col custom:flex-row items-center justify-between gap-8 lg:gap-16 px-8 py-12 bg-white w-full">
      {/* Logo and Intro */}
      <div
        onClick={() => router.push("/")}
        className="cursor-pointer flex items-center justify-center w-[100px] md:w-36 lg:w-[162px] custom:mb-14"
      >
        <img src="/images/dizzlyRedLogo.svg" />
      </div>

      {/* Links Sections */}
      <div className="grid grid-cols-1 ssm:grid-cols-2 md:flex gap-4 items-start justify-between w-full">
        <div className="space-y-5 flex-1">
          <TitleCoulmn title="Get to Know Us" />
          <ul className="space-y-3">
            <li>
              <ItemCoulmn text="About Dizzly" />
            </li>
            <li>
              <ItemCoulmn text="Careers" />
            </li>
            <li>
              <ItemCoulmn text="Dizzly Science" />
            </li>
          </ul>
        </div>

        <div className="space-y-5 flex-1">
          <TitleCoulmn title="Shop with Us" />
          <ul className="space-y-3">
            <li>
              <ItemCoulmn text="Your Account" />
            </li>
            <li>
              <ItemCoulmn text="Your Orders" />
            </li>
            <li>
              <ItemCoulmn text="Your Addresses" />
            </li>
            <li>
              <ItemCoulmn text="Your Wishlist" />
            </li>
          </ul>
        </div>

        <div className="space-y-5 flex-1">
          <TitleCoulmn title="Make Money with Us" />
          <ul className="space-y-3">
            <li>
              <ItemCoulmn text="Protect and Build Your Brand" />
            </li>
            <li>
              <ItemCoulmn text="Advertise Your Products" />
            </li>
            <li>
              <ItemCoulmn text="Sell on Dizzly" />
            </li>
            <li>
              <ItemCoulmn text="Fulfillment by Dizzly" />
            </li>
            <li>
              <ItemCoulmn text="Supply to Dizzly" />
            </li>
          </ul>
        </div>

        <div className="space-y-5 flex-1">
          <TitleCoulmn title="Let Us Help You" />
          <ul className="space-y-3">
            <li>
              <ItemCoulmn text="Help" />
            </li>
            <li>
              <ItemCoulmn text="Shipping & Delivery" />
            </li>
            <li>
              <ItemCoulmn text="Returns & Replacements" />
            </li>
            <li>
              <ItemCoulmn text="Recalls and Product Safety Alerts" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopSectionFooter;
