"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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
import { formatToTwoDecimals } from "@/utils/formatToTwoDecimals";

const AdsBanner = () => {
  const [randomAds, setRandomAds] = useState<AdObject[]>([]);
  const [loading, setLoading] = useState(false);
  const { currentSlide, goToSlide } = useSlider(randomAds, 5000);
  const router = useRouter();
  const currentAd = randomAds[currentSlide];

  const scrollRef = useRef<HTMLDivElement>(null);
  const currentIndex = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || randomAds.length === 0) return;

    const itemWidth = container.firstChild
      ? (container.firstChild as HTMLElement).offsetWidth + 16
      : 0;

    const autoScroll = () => {
      if (!container) return;

      currentIndex.current = (currentIndex.current + 1) % randomAds.length;

      container.scrollTo({
        left: currentIndex.current * itemWidth,
        behavior: "smooth",
      });
    };

    intervalRef.current = setInterval(autoScroll, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [randomAds]);

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);
      await getRandomAds({
        onSuccess: (data) => {
          setRandomAds(data);
          setLoading(false);
        },
        onError: () => setLoading(false),
      });
    };
    fetchAds();
  }, []);

  const handleClickBanner = (link: string) => {
    router.push(link);
  };
  if (randomAds.length === 0 && !loading) return null;

  return (
    <div className="lg:bg-white rounded-md overflow-hidden cursor-pointer h-fit">
      {loading && <Loading />}
      {!loading && randomAds.length > 0 && (
        <>
          <div
            onClick={() => handleClickBanner(currentAd?.url)}
            className="hidden lg:flex items-center justify-between h-[570px] w-full"
          >
            <div className="w-[40vw] h-full">
              <img
                src={currentAd?.portalImageUrl.image}
                alt={currentAd?.title}
                className="w-full h-full object-cover"
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
                  currentAd?.priceAfterDiscount ||
                  currentAd?.priceBeforeDiscount
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

          {/* Mobile View */}
          <motion.div
            ref={scrollRef}
            className="flex lg:hidden gap-4 scrollbar-hide overflow-x-auto snap-x snap-mandatory touch-pan-x scroll-pl-4"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {randomAds?.map((ad) => (
              <motion.div
                key={ad._id}
                onClick={() => handleClickBanner(ad.url)}
                className="flex-shrink-0 flex flex-col w-[75vw] h-[74vw] snap-center p-[10px] bg-white rounded-lg border border-[#700C1845] overflow-hidden gap-2"
              >
                <div className="h-[67%] w-full overflow-hidden rounded-lg relative">
                  <div className="bg-black/30 absolute top-0 left-0 right-0 w-full min-h-28 h-[15vw] z-10">
                    <div className="flex items-center justify-between h-full p-4">
                      <div className="flex flex-col items-start gap-2 w-[70%] h-[70%]">
                        <span className="text-[10px] font-bold text-white uppercase line-clamp-1">
                          {ad?.companyName}
                        </span>
                        <span className="text-xs font-bold text-white line-clamp-2">
                          {ad?.productName}
                        </span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="text-[15px] font-bold text-white">
                          IQD {formatToTwoDecimals(ad?.priceAfterDiscount || 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <img
                    src={ad.mobileImageUrl.image}
                    alt={ad.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-[24vw] py-2 px-[10px] bg-[#FCFAFA] border-[0.5px] border-[#0000002E] rounded-lg flex flex-col items-start gap-3">
                  <TitleBadge title={ad?.title} />
                  <DescBadge desc={ad?.description} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default AdsBanner;
