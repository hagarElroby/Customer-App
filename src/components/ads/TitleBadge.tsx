import React from "react";

interface TitleBadgeProps {
  title: string;
}

const TitleBadge: React.FC<TitleBadgeProps> = ({ title }) => {
  return (
    <h2
      className={`text-4xl font-bold text-homeHeaders text-center max-w-[500px] line-clamp-2 h-[100px]`}
    >
      {title}
    </h2>
  );
};

export default TitleBadge;
