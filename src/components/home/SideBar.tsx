import { Drawer } from "antd";
import React from "react";
import { svgs } from "../icons/svgs";

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideBar = ({ isOpen, onClose }: SideBarProps) => {
  return (
    <Drawer
      placement="left"
      width={500}
      open={isOpen}
      onClose={onClose}
      closeIcon={false}
      styles={{
        body: {
          padding: 24,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <div className="flex items-center justify-between">
        <h3>Side Bar </h3>
        <button onClick={onClose}>{svgs.boldGrayIcon}</button>
      </div>
    </Drawer>
  );
};

export default SideBar;
