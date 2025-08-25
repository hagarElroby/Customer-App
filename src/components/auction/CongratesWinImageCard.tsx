import React from "react";

type CongratesWinImageCardProps = {
  width: string;
  height: string;
  isRoundedTop?: boolean;
};

const CongratesWinImageCard = ({
  width,
  height,
  isRoundedTop = false,
}: CongratesWinImageCardProps) => {
  return (
    <div
      className={`w-[width] h-[height] ${isRoundedTop ? "rounded-t-[15px]" : "rounded-l-[15px]"} overflow-hidden flex items-center justify-center`}
    ></div>
  );
};

export default CongratesWinImageCard;
