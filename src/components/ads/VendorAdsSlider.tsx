import useSlider from "@/hooks/useSlider";
import { svgs } from "../icons/svgs";
import Spinner from "../shared/Spinner";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AdObject } from "@/types/ads";
import { getRandomAds } from "@/services/random-ads";
import { motion } from "framer-motion";

const VendorAdsSlider = () => {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentIndex = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleClickBanner = (link: string) => {
    if (link) router.push(link);
  };

  const [randomAds, setRandomAds] = useState<AdObject[]>([]);
  const [loading, setLoading] = useState(false);

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

  const { currentSlide, goToSlide, goToPrevious } = useSlider<AdObject>(
    randomAds,
    6000,
  );

  // Auto scroll for mobile
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || randomAds.length === 0) return;

    const itemWidth = container.firstChild
      ? (container.firstChild as HTMLElement).offsetWidth + 10
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

  if (!loading && randomAds.length === 0) return null;

  return (
    <div
      className="relative w-full h-[155px] sm:h-[200px] lg:h-[350px] overflow-hidden cursor-pointer"
      onClick={() => handleClickBanner(randomAds[currentSlide]?.url)}
    >
      {loading && <Spinner />}

      {!loading && (
        <>
          {/* Desktop view */}
          <div
            className="hidden lg:flex transition-transform duration-500 ease-in-out w-full h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {randomAds?.map((ad, index) => (
              <img
                key={index}
                src={ad?.portalImageUrl.cover || ""}
                alt={`Ad ${index + 1}`}
                className="w-full h-full object-cover flex-shrink-0"
                onClick={() => handleClickBanner(ad.url)}
              />
            ))}
          </div>

          {/* Navigation Bullets (Desktop only) */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden lg:flex space-x-2"
          >
            {randomAds.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(index);
                }}
                className={`h-[9px] rounded-full ${
                  currentSlide === index ? "bg-main w-7" : "bg-white w-[9px]"
                }`}
              />
            ))}
          </div>

          {/* Left Arrow (Desktop only) */}
          <div className="hidden lg:flex absolute left-[-80px] top-0 bottom-0 w-[120px] h-full bg-arrowGradient rounded-r-full items-center justify-end pr-3">
            <button
              onClick={goToPrevious}
              className="text-white flex items-center justify-center"
            >
              <span>{svgs.smallwhiteArr}</span>
            </button>
          </div>

          {/* Mobile view: horizontal scroll */}
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
            {randomAds?.map((ad) => (
              <motion.div
                key={ad._id}
                onClick={() => handleClickBanner(ad.url)}
                className="flex-shrink-0 w-[80vw] h-[155px] sm:h-[200px] snap-center rounded-lg overflow-hidden"
              >
                <img
                  src={ad.mobileImageUrl.cover || ""}
                  alt={ad.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default VendorAdsSlider;
