import React from "react";
import { svgs } from "../icons/svgs";

type CustomProps = {
  onClose: () => void;
  title: string;
};

const CustomHeaderInModal = ({ onClose, title }: CustomProps) => {
  return (
    <div className="flex items-center justify-between p-3">
      <h2 className="text-[22px] font-bold text-main">{title}</h2>
      <button onClick={onClose}>{svgs.boldGrayIcon}</button>
    </div>
  );
};

export default CustomHeaderInModal;
