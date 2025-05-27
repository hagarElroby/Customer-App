import Link from "next/link";
import { svgs } from "../icons/svgs";
const MiddleSectionFooter = () => {
  return (
    <div className="py-9 flex flex-col md:flex-row justify-between items-center px-20">
      {/* Language and Payment Options */}
      <div className="flex items-center space-x-6">
        <div
          className="w-[200px] p-5 text-[15px] text-homeHeaders bg-white border border-inputGray 
          flex items-center justify-between rounded focus:outline-none cursor-pointer"
          defaultValue="English"
        >
          <span>English</span>
          {svgs.languageArrow}
        </div>

        <div className="flex flex-col gap-3 items-start">
          <h5 className="text-[13px] font-normal text-homeText">We accept:</h5>
          <div className="flex items-center gap-[6px]">
            {svgs.visaIcon}
            {svgs.mastercardIcon}
            {svgs.paypalIcon}
          </div>
        </div>

        <div className="w-[2px] h-14 bg-bgBullets"></div>
        <div className="flex flex-col gap-3 items-start">
          <h5 className="text-[13px] font-normal text-homeText">Follow Us:</h5>
          <div className="flex items-center gap-6">
            <Link href="">{svgs.twitterIcon}</Link>
            <Link href="">{svgs.facebookIcon}</Link>
            <Link href="">{svgs.instaIcon}</Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-xl font-bold text-black">Dizzly App Download</h3>
        <div className="flex items-center gap-3">
          <Link href="">{svgs.appStoreImg}</Link>
          <Link href="">{svgs.googlePlayImg}</Link>
        </div>
      </div>
    </div>
  );
};

export default MiddleSectionFooter;
