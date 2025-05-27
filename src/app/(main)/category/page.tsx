"use client";
import NavigationBar from "@/components/shared/NavigationBar";
import Subcat from "../../../components/category/Subcat";
import ProductSlider from "@/components/shared/ProductSlider";
import VendorAdsSlider from "@/components/ads/VendorAdsSlider";
const CategoryLayout = () => {
  return (
    <div className="flex flex-col bg-homeBg gap-10 pb-7">
      <NavigationBar />
      <div className="flex flex-col gap-10 px-8">
        <VendorAdsSlider />
        <Subcat />
        <ProductSlider title="Best Selling" sortType="BEST_SELLER" />
        <ProductSlider title="Top rated" sortType="NEWEST" />
        <ProductSlider title="sponsored" sponsored={true} />
        <ProductSlider title="Featured products" />
      </div>
    </div>
  );
};

export default CategoryLayout;
