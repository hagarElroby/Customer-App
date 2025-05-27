import React from "react";

interface DescBadgeProps {
  desc: string;
}

const DescBadge: React.FC<DescBadgeProps> = ({ desc }) => {
  return (
    <p className="text-homeText font-normal text-xl text-center max-w-[600px] line-clamp-3 h-[76px]">
      {desc}
    </p>
  );
};

export default DescBadge;
