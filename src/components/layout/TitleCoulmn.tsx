import React from "react";

const TitleCoulmn = ({ title }: { title: string }) => {
  return (
    <h4 className="text-base lg:text-xl font-medium text-black">{title}</h4>
  );
};

export default TitleCoulmn;
