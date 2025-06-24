import BannerSlider from "../banner/BannerSlider";
import PopularCategories from "../category/PopularCategories";
import NavigationBar from "../shared/NavigationBar";
import PreviouslyBrowsed from "../shared/PreviouslyBrowsed";
import ProductSlider from "../shared/ProductSlider";
import ServicesSection from "../shared/ServicesSection";
import AdsBanner from "./AdsBanner";
import AuctionSection from "./AuctionSection";

const HomePage = () => {
  return (
    <div className="flex flex-col bg-homeBg gap-10 pb-7 pt-3 md:pt-0">
      <NavigationBar />
      <div className="flex flex-col gap-10 md:px-8">
        <BannerSlider />
        <PopularCategories />
        <AuctionSection />
        <AdsBanner />
        <ProductSlider title="Best Selling" sortType="BEST_SELLER" />
        <PreviouslyBrowsed />
        <ProductSlider title="You may also like" />
        <ServicesSection />
      </div>
    </div>
  );
};

export default HomePage;
