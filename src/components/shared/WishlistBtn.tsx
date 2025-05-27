import { svgs } from "../icons/svgs";

interface WishlistButtonProps {
  inWishlist: boolean;
  onToggleWishlist: () => void;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  inWishlist,
  onToggleWishlist,
}) => {
  return (
    <button onClick={onToggleWishlist}>
      {inWishlist ? svgs.redHeart : svgs.whiteHeart}
    </button>
  );
};

export default WishlistButton;
