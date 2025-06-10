import {
  animate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

const left = `0%`;
const right = `100%`;
const rightInset = `100%`;
const transparent = `#0000`;
const opaque = `#000`;

export function useScrollOverflowMask(
  scrollXProgress: ReturnType<typeof useScroll>["scrollXProgress"],
) {
  // Initial: Right fade only
  const maskImage = useMotionValue(
    `linear-gradient(90deg, ${opaque}, ${opaque} ${rightInset}, ${transparent})`,
  );

  useMotionValueEvent(scrollXProgress, "change", (value) => {
    if (value === 0) {
      // Start of scroll: right fade only
      animate(
        maskImage,
        `linear-gradient(90deg, ${opaque}, ${opaque} ${rightInset}, ${transparent})`,
      );
    } else if (value === 1) {
      // End of scroll: no fade at all (or optional left fade)
      animate(
        maskImage,
        `linear-gradient(90deg, ${opaque}, ${opaque} ${right})`,
      );
    } else if (
      scrollXProgress.getPrevious() === 0 ||
      scrollXProgress.getPrevious() === 1
    ) {
      // Scrolling in-between: maintain right fade only
      animate(
        maskImage,
        `linear-gradient(90deg, ${opaque}, ${opaque} ${rightInset}, ${transparent})`,
      );
    }
  });

  return maskImage;
}
