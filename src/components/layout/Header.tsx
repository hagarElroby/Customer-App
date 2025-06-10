import { useSelector } from "react-redux";
import TopNavLeftSide from "./TopNavLeftSide";
import TopNavRightSide from "./TopNavRightSide";
import { RootState } from "@/redux/store";

const Header = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <header
      className={`bg-white py-[10px] px-[10px] sm:py-3 sm:px-3 md:px-5 lg:px-8 lg:py-4 xl:px-14 z-30 w-full h-auto border-b-[1px] border-main md:border-b-[0.5px] md:border-[#00000040] flex items-center justify-between lg:gap-10`}
    >
      <div className="z-10">
        <TopNavLeftSide />
      </div>
      <TopNavRightSide user={user} />
    </header>
  );
};

export default Header;
