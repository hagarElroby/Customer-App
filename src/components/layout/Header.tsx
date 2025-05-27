import { useSelector } from "react-redux";
import TopNavLeftSide from "./TopNavLeftSide";
import TopNavRightSide from "./TopNavRightSide";
import { RootState } from "@/redux/store";

const Header = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <header
      className={`bg-white py-4 px-14 z-30 w-full h-auto border-b-[0.5px] border-[#00000040] flex flex-col md:flex-row items-center justify-between gap-10`}
    >
      <div className="z-10">
        <TopNavLeftSide />
      </div>
      <TopNavRightSide user={user} />
    </header>
  );
};

export default Header;
