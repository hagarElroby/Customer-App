"use client";
import React from "react";
import { useSelector } from "react-redux";
import NoYetImg from "../shared/NoYetImg";
import NoYetText from "../shared/NoYetText";
import FavoriteProduct from "./FavoriteProduct";
import { FavoriteProductResponse } from "@/types/product";
import { RootState } from "@/redux/store";

const WishlistProducts = () => {
  const { whishlistItems } = useSelector((state: RootState) => state.whishlist);
  return (
    <div className="w-full px-32">
      {whishlistItems.length ? (
        <div className="flex items-start justify-start gap-3 flex-wrap p-10 mx-auto">
          {whishlistItems.map((item: FavoriteProductResponse, index) => (
            <FavoriteProduct key={index} {...item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full overflow-hidden mt-10">
          <NoYetImg />
          <NoYetText
            title="No Favorites Yet"
            text="When you find something you love, click the heart to add it to your favorites"
          />
        </div>
      )}
    </div>
  );
};

export default WishlistProducts;
