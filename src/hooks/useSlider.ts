import { useState, useEffect } from "react";

const useSlider = <T>(items: T[], autoSlideInterval: number) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % items.length);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [items.length, autoSlideInterval]);

  const goToSlide = (index: number) => setCurrentSlide(index);

  const goToPrevious = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? items.length - 1 : prevSlide - 1,
    );
  };

  return {
    currentSlide,
    goToSlide,
    goToPrevious,
  };
};

export default useSlider;
