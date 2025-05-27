import React from "react";
import ItemCoulmn from "./ItemColumn";
import TitleCoulmn from "./TitleCoulmn";
import { useRouter } from "next/navigation";
import { svgs } from "../icons/svgs";

const TopSectionFooter = () => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 p-12 bg-white">
      {/* Logo and Intro */}
      <div
        onClick={() => router.push("/")}
        className="cursor-pointer flex items-center justify-center mb-10"
      >
        {svgs.dizzlyLogo}
      </div>

      {/* Links Sections */}
      <div className="space-y-5">
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
      <div className="space-y-5">
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
      <div className="space-y-5">
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
      <div className="space-y-5">
        <TitleCoulmn title="Let Us Help You" />
        <ul className="space-y-3">
          <li>Help</li>
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
  );
};

export default TopSectionFooter;
