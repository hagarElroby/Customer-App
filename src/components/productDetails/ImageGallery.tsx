import { svgs } from "../icons/svgs";
import React, { useState, useRef, useCallback, useEffect } from "react";

interface MediaModel {
  url: string;
  type: string;
}

const ImageGallery = ({ images }: { images: MediaModel[] }) => {
  const [selectedImage, setSelectedImage] = useState<MediaModel | null>(null);
  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  const thumbnailRef = useRef<HTMLDivElement>(null);
  // Check if scrolling is possible based on the number of images
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(() => {
    return images.length > 4;
  });

  const updateScrollButtons = useCallback(() => {
    if (thumbnailRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = thumbnailRef.current;
      setCanScrollUp(scrollTop > 0);
      setCanScrollDown(scrollTop + clientHeight < scrollHeight);
    }
  }, []);

  useEffect(() => {
    const ref = thumbnailRef.current;
    if (ref) {
      ref.addEventListener("scroll", updateScrollButtons);
      return () => ref.removeEventListener("scroll", updateScrollButtons);
    }
  }, [updateScrollButtons]);

  const handleHover = (image: MediaModel) => {
    setSelectedImage(image);
  };

  const scrollThumbnails = (direction: "up" | "down") => {
    if (thumbnailRef.current) {
      const scrollAmount = 100;
      thumbnailRef.current.scrollBy({
        top: direction === "up" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex gap-3 h-[464px] w-full">
      <div className="flex-[1] flex flex-col gap-6 items-center relative h-full py-3">
        {canScrollUp && (
          <button onClick={() => scrollThumbnails("up")}>{svgs.down}</button>
        )}
        <div
          ref={thumbnailRef}
          style={{ direction: "rtl" }}
          className="flex flex-col gap-2 overflow-y-auto h-full scrollbar-hide px-2"
        >
          {images?.map((img, index) => {
            if (img.type === "img") {
              return (
                <div
                  className={`flex h-24 w-24 cursor-pointer items-center justify-center rounded-sm border ${
                    selectedImage === img
                      ? "border-main"
                      : "border-homeBorderCard"
                  }`}
                  key={index}
                >
                  <img
                    src={img.url}
                    alt={`product image ${index}`}
                    className={`h-[90%] w-[90%] object-contain`}
                    onMouseEnter={() => handleHover(img)}
                  />
                </div>
              );
            }

            return (
              <div
                className={`flex h-24 w-24 cursor-pointer items-center justify-center rounded-sm border ${
                  selectedImage === img
                    ? "border-main"
                    : "border-homeBorderCard"
                }`}
                key={index}
              >
                <video
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  src={img.url}
                  className={`h-[90%] w-[90%] object-contain`}
                  onMouseEnter={() => handleHover(img)}
                />
              </div>
            );
          })}
        </div>
        {canScrollDown && (
          <button onClick={() => scrollThumbnails("down")}>{svgs.down}</button>
        )}
      </div>
      <div className="flex h-[464px] w-full flex-[3.4] items-center justify-center overflow-hidden rounded-xl border border-homeBorderCard">
        {selectedImage?.type === "img" && (
          <img
            src={selectedImage.url}
            alt="selected product"
            className="h-[70%] w-[85%] object-contain"
          />
        )}

        {selectedImage?.type === "video" && (
          <video
            controls
            src={selectedImage.url}
            className="h-[70%] w-[85%] object-contain"
          />
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
