"use client";
import { Button } from "antd";
import React from "react";

type Props = {
  title: string;
  desc: string;
  onClick: () => void;
};

const InfoCardWithBtn = ({ title, desc, onClick }: Props) => {
  return (
    <div className="flex-[1] max-w-[536px] flex flex-col gap-12 items-start w-[536px] h-[453px] bg-white rounded-md pt-[84px] px-12">
      <span className="uppercase text-[10px] font-bold text-[#717171] leading-3">
        Today’s
      </span>
      <h2 className="text-[40px] font-bold text-[#040404] leading-[44px]">
        {title}
      </h2>
      <p className="text-base text-[#717171 ] leading-5">{desc}</p>
      <Button
        type="primary"
        style={{
          backgroundColor: "#760813",
          borderColor: "#700c18",
          borderRadius: 4,
          height: 40,
          padding: "16px 32px",
          fontWeight: 700,
          fontSize: "13px",
        }}
        onClick={onClick}
      >
        See More
      </Button>
    </div>
  );
};

export default InfoCardWithBtn;
