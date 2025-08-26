"use client";
import React, { useEffect, useState } from "react";
import WishlistProducts from "@/components/whishlist/WishlistProducts";
import ProductSlider from "@/components/shared/ProductSlider";
import Loading from "@/components/shared/Loading";

const WishlistPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  });

  return (
    <main className="pb-7 flex flex-col gap-10 w-full flex-grow bg-homeBg">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="w-full bg-white py-7 px-40 flex flex-col gap-2">
            <h2 className="text-itemColor font-bold text-2xl capitalize">
              Your Favorites
            </h2>
            <p className="text-sm font-normal text-hardGray">
              Browse and manage your favorite products. Easily add or remove
              items from your wishlist and keep track of what you love!
            </p>
          </div>
          <WishlistProducts />
          <ProductSlider title="You may also like" sortType="BEST_SELLER" />
        </>
      )}
    </main>
  );
};

export default WishlistPage;
