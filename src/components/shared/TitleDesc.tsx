import React from "react";

interface TitleDesc {
  title: string;
  description?: string;
  isProfileTitle?: boolean;
}

const TitleDesc: React.FC<TitleDesc> = ({
  title,
  description,
  isProfileTitle,
}) => {
  return (
    <div className="flex items-start flex-col custom-gap-form-title">
      <h2
        className={`${isProfileTitle ? "font-bold text-itemColor text-2xl" : "font-auth-header font-medium text-meduimBlack"}`}
      >
        {title}
      </h2>
      <p className="text-textAuth font-normal custom-font12">{description}</p>
    </div>
  );
};

export default TitleDesc;
