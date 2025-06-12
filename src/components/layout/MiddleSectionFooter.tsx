import Link from "next/link";
import { svgs } from "../icons/svgs";
const MiddleSectionFooter = () => {
  return (
    <div className="py-9 flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-2 px-5 md:px-10 lg:px-20 w-full">
      {/* Language and Payment Options */}
      <div className="grid grid-cols-1 ssm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 mx-auto w-full max-w-[960px] items-center text-center">
        <div
          className="w-[120px] sm:w-[150px] md:max-w-[240px] h-10 lg:h-[53px] px-5 text-[15px] text-homeHeaders bg-white border border-inputGray 
    flex items-center justify-between rounded cursor-pointer mx-auto"
        >
          <span>English</span>
          {svgs.languageArrow}
        </div>

        <div className="flex flex-col gap-2 sm:gap-3 items-center">
          <h5 className="text-[13px] font-normal text-homeText">We accept:</h5>
          <div className="flex items-center gap-1 sm:gap-[6px]">
            {svgs.visaIcon}
            {svgs.mastercardIcon}
            {svgs.paypalIcon}
          </div>
        </div>

        <div className="justify-center items-center hidden md:flex">
          <div className="w-[2px] h-14 bg-bgBullets"></div>
        </div>

        <div className="flex flex-col gap-2 sm:gap-3 items-center">
          <h5 className="text-[13px] font-normal text-homeText">Follow Us:</h5>
          <div className="flex items-center gap-6 ssm:gap-2 sm:gap-6">
            <Link href="">{svgs.twitterIcon}</Link>
            <Link href="">{svgs.facebookIcon}</Link>
            <Link href="">{svgs.instaIcon}</Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <h3 className="text-base lg:text-xl font-bold text-black">
          Dizzly App Download
        </h3>
        <div className="flex items-center gap-3">
          <Link href="">{svgs.appStoreImg}</Link>
          <Link href="">{svgs.googlePlayImg}</Link>
        </div>
      </div>
    </div>
  );
};

export default MiddleSectionFooter;
