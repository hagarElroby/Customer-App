import React from "react";

interface TextBadgeProps {
  text: string;
}

const TextBadge: React.FC<TextBadgeProps> = ({ text }) => {
  return (
    <span className={`text-[10px] font-bold text-homeText uppercase`}>
      {text}
    </span>
  );
};

export default TextBadge;
