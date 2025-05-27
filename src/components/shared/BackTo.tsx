"use client";
import { useRouter } from "next/navigation";

interface Back {
  name: string;
  onClick: () => void;
}

const BackTo: React.FC<Back> = ({ name, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="custom-gap4 flex items-center cursor-pointer"
    >
      <svg
        width="9"
        height="16"
        viewBox="0 0 9 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.00012 14.75L1.25012 8L8.00012 1.25"
          stroke="#313131"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <button className="custom-font12 text-meduimBlack hover:text-main transition-colors duration-300 font-normal uppercase">
        Back to {name}
      </button>
    </div>
  );
};

export default BackTo;
