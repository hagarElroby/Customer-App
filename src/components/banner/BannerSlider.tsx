import useFetchData from "@/hooks/useFetchData";
import useSlider from "@/hooks/useSlider";
import { getBanners } from "@/services/banner";
import { Banner } from "@/types/banner";
import { svgs } from "../icons/svgs";
import Spinner from "../shared/Spinner";
import { useRouter } from "next/navigation";

const BannerSlider = () => {
  const router = useRouter();

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

  // Return null if not loading and no banners
  if (!loading && (!banners || banners.length === 0)) {
    return null;
  }

  return (
    <div
      className="relative w-full h-[350px] overflow-hidden cursor-pointer"
      onClick={() => handleClickBanner(banners[currentSlide]?.link)}
    >
      {loading && <Spinner />}

      {!loading && !error && (
        <>
          {/* Slider Images */}
          <div
            className="flex transition-transform duration-500 ease-in-out w-full h-full"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {banners.slice(0, 7).map((banner, index) => (
              <img
                key={index}
                src={banner?.portalImageUrl}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover flex-shrink-0"
              />
            ))}
          </div>

          {/* Navigation Bullets */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
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
          <div className="absolute left-[-80px] top-0 bottom-0 w-[120px] h-full bg-arrowGradient rounded-r-full flex items-center justify-end pr-3">
            <button
              onClick={goToPrevious}
              className="text-white flex items-center justify-center"
            >
              <span>{svgs.smallwhiteArr}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BannerSlider;
