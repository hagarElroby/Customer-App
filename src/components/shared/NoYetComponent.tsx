import React from "react";
import NoYetImg from "./NoYetImg";
import NoYetText from "./NoYetText";

interface NoYetProps {
  title: string;
  text?: string;
}

const NoYetComponent: React.FC<NoYetProps> = ({ title, text }) => {
  return (
    <div className="mt-10 flex h-full flex-col items-center justify-center gap-3 overflow-hidden">
      <NoYetImg />
      <NoYetText title={title} text={text} />
    </div>
  );
};

export default NoYetComponent;
