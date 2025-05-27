import React from "react";
import PersonalInfo from "./PersonalInfo";
import PaymentMethods from "./PaymentMethods";
import Addresses from "./Addresses";

interface TabContentProps {
  activeTab: number;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
  if (activeTab === 0) return <PersonalInfo />;
  if (activeTab === 1) return <PaymentMethods />;
  if (activeTab === 2) return <Addresses />;

  return <div>No content available</div>;
};

export default TabContent;
