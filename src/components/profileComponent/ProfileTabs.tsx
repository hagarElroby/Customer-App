"use client";
import React, { useEffect, useState } from "react";
import TabContent from "./TabContent";
import { useRouter, useSearchParams } from "next/navigation";

const ProfileTabs = ({ tabs }: { tabs: string[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabFromParams = Number(searchParams.get("tab")) || 0;
  const [activeTab, setActiveTab] = useState(tabFromParams);

  useEffect(() => {
    setActiveTab(tabFromParams);
  }, [tabFromParams]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("tab", index.toString());
    router.push(`?${newParams.toString()}`);
  };

  return (
    <div>
      <div className="flex border-b border-customBorder items-center justify-center">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`p-4 text-sm font-medium ${
              activeTab === index
                ? "text-redText border-b-[2.4px] border-main rounded-t"
                : "text-grayProfile"
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-8 mx-auto w-[90vw] xl:w-[70vw] max-w-[1065px]">
        <TabContent activeTab={activeTab} />
      </div>
    </div>
  );
};

export default ProfileTabs;
