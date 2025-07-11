"use client";
import NavigationBar from "@/components/shared/NavigationBar";
import SubCategoryProducts from "../../../../components/category/SubCategoryProducts";
import VendorAdsSlider from "@/components/ads/VendorAdsSlider";

const page = () => {
  return (
    <div className="flex flex-col bg-homeBg gap-10 pb-7 pt-3 md:pt-0">
      <NavigationBar />
      <div className="flex flex-col gap-10 md:px-8">
        <VendorAdsSlider />
        <SubCategoryProducts />
      </div>
    </div>
  );
};

export default page;
