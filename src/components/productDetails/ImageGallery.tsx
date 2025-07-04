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
    <div className="flex gap-3 h-[400px] w-full">
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
                <img
                  key={index}
                  src={img.url}
                  alt={`product image ${index}`}
                  className={`w-24 h-24 object-cover cursor-pointer border-2 ${
                    selectedImage === img
                      ? "border-main"
                      : "border-homeBorderCard"
                  }`}
                  onMouseEnter={() => handleHover(img)}
                />
              );
            }

            return (
              <video
                onClick={(e) => {
                  e.preventDefault();
                }}
                key={index}
                src={img.url}
                className={`w-24 h-24 object-cover cursor-pointer border-2 ${
                  selectedImage === img
                    ? "border-main"
                    : "border-homeBorderCard"
                }`}
                onMouseEnter={() => handleHover(img)}
              />
            );
          })}
        </div>
        {canScrollDown && (
          <button onClick={() => scrollThumbnails("down")}>{svgs.down}</button>
        )}
      </div>
      <div className="flex-[3.4] w-full h-full border border-homeBorderCard rounded-xl overflow-hidden">
        {selectedImage?.type === "img" && (
          <img
            src={selectedImage.url}
            alt="selected product"
            className="w-full h-full object-cover"
          />
        )}

        {selectedImage?.type === "video" && (
          <video
            controls
            src={selectedImage.url}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
