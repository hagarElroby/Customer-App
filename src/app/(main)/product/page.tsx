"use client";
import { useSearchParams } from "next/navigation";
import NavigationBar from "@/components/shared/NavigationBar";
import { useEffect, useState } from "react";
import Loading from "@/components/shared/Loading";
import TopSection from "@/components/productDetails/TopSection";
import Overview from "@/components/productDetails/Overview";
import Specifications from "@/components/productDetails/Specifications";
import ProductSlider from "@/components/shared/ProductSlider";
import { getOneProduct } from "@/services/product";
import { OneProductResponse } from "@/types/product";
import PreviouslyBrowsed from "@/components/shared/PreviouslyBrowsed";
import { BrowseObject } from "@/types/browses";
import { getPreviouslyBrowsed } from "@/services/browses";

const ProductPage = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const groupName = searchParams.get("group");
  const [product, setProduct] = useState<OneProductResponse>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getProduct = async () => {
      if (productId) {
        setLoading(true);
        await getOneProduct({
          productId,
          ...(groupName ? { groupName } : {}),
          onSuccess: (data) => {
            setProduct(data);
            setLoading(false);
          },
          onError: (err) => {
            setLoading(false);
          },
        });
      }
    };
    getProduct();
  }, [productId]);

  return (
    <main className="pb-28 flex flex-col gap-10 w-full flex-grow bg-homeBg">
      <NavigationBar />
      {loading && <Loading />}

      {!loading && product !== undefined && (
        <div className="flex flex-col gap-10 w-full p-9">
          <TopSection product={product} />
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-5">
            <Overview description={product.productDescription} />
            <Specifications specifications={product.productProperties} />
          </div>
        </div>
      )}
      <PreviouslyBrowsed />
      <ProductSlider title="You may also like" sortType="BEST_SELLER" />
    </main>
  );
};

export default ProductPage;
