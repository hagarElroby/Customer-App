import useFetchData from "@/hooks/useFetchData";
import useSlider from "@/hooks/useSlider";
import { getBanners } from "@/services/banner";
import { Banner } from "@/types/banner";
import { svgs } from "../icons/svgs";
import Spinner from "../shared/Spinner";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const BannerSlider = () => {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentIndex = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleClickBanner = (link: string) => {
    router.push(link);
  };

  const { data, loading, error } = useFetchData({
    apiFunction: getBanners,
    params: {
      isActive: true,
      page: 1,
      limit: 7,
      allowPagination: true,
    },
  });

  const banners = data?.docs || [];

  const { currentSlide, goToSlide, goToPrevious } = useSlider<Banner>(
    banners,
    6000,
  );

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || banners.length === 0) return;

    const itemWidth = container.firstChild
      ? (container.firstChild as HTMLElement).offsetWidth + 10 // gap-[10px]
      : 0;

    const autoScroll = () => {
      if (!container) return;

      currentIndex.current = (currentIndex.current + 1) % banners.length;

      container.scrollTo({
        left: currentIndex.current * itemWidth,
        behavior: "smooth",
      });
    };

    intervalRef.current = setInterval(autoScroll, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [banners]);

  // Return null if not loading and no banners
  if (!loading && (!banners || banners.length === 0)) {
    return null;
  }

  return (
    <div
      className="relative w-full h-[155px] sm:h-[200px] lg:h-[350px] overflow-hidden md:cursor-pointer"
      onClick={() => handleClickBanner(banners[currentSlide]?.link)}
    >
      {loading && <Spinner />}

      {!loading && !error && (
        <>
          {/* Slider Images */}
          <div
            className="hidden lg:flex transition-transform duration-500 ease-in-out w-full h-full "
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {banners.slice(0, 7).map((banner, index) => (
              <div
                key={index}
                className="flex-shrink-0 rounded-lg overflow-hidden w-full"
                onClick={() => router.push(banner.link)}
              >
                <img
                  key={index}
                  src={banner?.portalImageUrl}
                  alt={`Portal Banner ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Navigation Bullets */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden lg:flex space-x-2"
          >
            {banners.slice(0, 7).map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(index);
                }}
                className={`h-[9px] rounded-full ${
                  currentSlide === index ? "bg-main w-7" : "bg-white w-[9px]"
                }`}
              ></button>
            ))}
          </div>

          {/* Left Arrow */}
          <div className="hidden lg:flex absolute left-[-80px] top-0 bottom-0 w-[120px] h-full bg-arrowGradient rounded-r-full items-center justify-end pr-3">
            <button
              onClick={goToPrevious}
              className="text-white flex items-center justify-center"
            >
              <span>{svgs.smallwhiteArr}</span>
            </button>
          </div>
        </>
      )}
      <motion.div
        ref={scrollRef}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        className="flex lg:hidden gap-[10px] overflow-x-auto scrollbar-hide snap-x snap-mandatory touch-pan-x scroll-pl-4"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollSnapType: "x mandatory",
        }}
      >
        {banners.map((banner) => (
          <motion.div
            key={banner._id}
            onClick={() => handleClickBanner(banner.link)}
            className="flex-shrink-0 w-[80vw] h-[155px] sm:h-[200px] snap-center rounded-lg overflow-hidden"
          >
            <img
              src={banner.imageUrl}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BannerSlider;
