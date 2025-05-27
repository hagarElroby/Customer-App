import React, { useEffect, useState } from "react";
import TextBadge from "../ads/TextBadge";
import TitleBadge from "../ads/TitleBadge";
import DescBadge from "../ads/DescBadge";
import GreenBullet from "../ads/GreenBullet";
import ProductCard from "../shared/ProductCard";
import useSlider from "@/hooks/useSlider";
import { getRandomAds } from "@/services/random-ads";
import { AdObject } from "@/types/ads";
import Loading from "../shared/Loading";
import { useRouter } from "next/navigation";

const AdsBanner = () => {
  const [randomAds, setRandomAds] = useState<AdObject[]>([]);
  const [loading, setLoading] = useState(false);
  const { currentSlide, goToSlide, goToPrevious } = useSlider(randomAds, 5000);
  const router = useRouter();
  const currentAd = randomAds[currentSlide];

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);
      await getRandomAds({
        onSuccess: (data) => {
          setRandomAds(data);
          setLoading(false);
        },
        onError: (e) => {
          setLoading(false);
        },
      });
    };

    fetchAds();
  }, []);

  const handleClickBanner = (link: string) => {
    router.push(link);
  };

  if (randomAds.length === 0 && !loading) {
    return null;
  }

  return (
    <div className="bg-white rounded-md h-[570px] overflow-hidden cursor-pointer">
      {loading && <Loading />}
      {/* Content */}
      {randomAds.length > 0 && (
        <div
          onClick={() => handleClickBanner(randomAds[currentSlide]?.url)}
          className="flex items-center justify-between h-full w-full transition-transform duration-500 ease-in-out"
        >
          <div className="w-[40vw] h-full">
            <img
              src={currentAd?.portalImageUrl.image}
              alt={currentAd?.title}
              className="w-full h-full block object-cover"
            />
          </div>
          <div className="flex flex-col items-center p-12 justify-between h-full w-[60vw]">
            <div className="flex flex-col items-center gap-5">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-3">
                  <GreenBullet />
                  {currentAd?.stock > 0 && <TextBadge text="in stock now" />}
                </div>
                <TitleBadge title={currentAd?.title} />
              </div>
              <DescBadge desc={currentAd?.description} />
            </div>

            <ProductCard
              src={currentAd?.productCover}
              text={currentAd?.companyName}
              desc={currentAd?.productName}
              price={
                currentAd?.priceAfterDiscount || currentAd?.priceBeforeDiscount
              }
            />
            <div className="flex space-x-2">
              {randomAds.slice(0, 7).map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    goToSlide(index);
                    e.stopPropagation();
                  }}
                  className={`h-[9px] rounded-full ${
                    currentSlide === index
                      ? "bg-main w-7"
                      : "bg-bgBullets w-[9px]"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdsBanner;
