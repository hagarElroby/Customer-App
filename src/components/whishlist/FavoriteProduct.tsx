import { useRouter } from "next/navigation";
import SmallRoundedCont from "../shared/SmallRoundedCont";
import { formatToTwoDecimals } from "@/utils/formatToTwoDecimals";
import { FavoriteProductResponse } from "@/types/product";
import { svgs } from "../icons/svgs";
import { useDispatch } from "react-redux";
import { removeFavorite } from "@/services/whishlist";
import { AppDispatch } from "@/redux/store";
import { removeFromList } from "@/redux/whishlistSlice";

const FavoriteProduct: React.FC<FavoriteProductResponse> = ({
  productId,
  groupName,
  productName,
  productCover,
  rating,
  ratingCount,
  companyName,
  priceAfterDiscount,
}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleClickProduct = (id: string) => {
    router.push(`/product?id=${id}`);
  };

  const handleRemoveFromWishlist = async () => {
    if (!productId || !groupName) return;
    await removeFavorite({ productId, groupName });
    dispatch(removeFromList({ productId, groupName }));
  };

  return (
    <div className="cursor-pointer w-[262px] h-[420px] p-2 bg-white rounded-md flex flex-col gap-4">
      <div
        onClick={() => handleClickProduct(productId)}
        className="flex items-center justify-between w-[250px]"
      >
        <SmallRoundedCont>
          <span className="text-white font-medium text-xs">Best Seller</span>
        </SmallRoundedCont>
        <SmallRoundedCont className="bg-white h-[23px] w-[86px] shadow-custom-4 gap-[2px]">
          {svgs.star}
          <span className="text-main font-semibold text-xs">{rating}</span>
          <span className="text-main font-medium text-[10px]">
            ( {ratingCount} )
          </span>
        </SmallRoundedCont>
      </div>

      {/* Image Section */}
      <div className="relative w-full">
        <div
          className="w-full h-[250px] cursor-pointer"
          onClick={() => handleClickProduct(productId)}
        >
          <img
            src={productCover}
            alt={`${productName} image`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-2 absolute z-10 right-0 bottom-0">
          <button onClick={handleRemoveFromWishlist}>{svgs.redHeart}</button>
          <button
          //TODO: Add to cart functionality
          // onClick={() => router.push('/cart')}
          >
            {svgs.addCart}
          </button>
        </div>
      </div>
      {/* Text Section */}
      <div
        onClick={() => handleClickProduct(productId)}
        className="flex flex-col items-start gap-2"
      >
        <span className="text-[10px] text-homeText font-bold uppercase">
          {companyName}
        </span>
        <span className="text-[15px] text-homeHeaders font-bold capitalize">
          {productName}
        </span>
        <div className="flex gap-2">
          <span className="text-base text-[#2D8653] font-bold">
            IQD{formatToTwoDecimals(priceAfterDiscount)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FavoriteProduct;
