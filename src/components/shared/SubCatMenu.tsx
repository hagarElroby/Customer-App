"use client";
import ItemTitle from "./ItemTitle";
import FeaturedCard from "./FeaturedCard";
import { useRouter } from "next/navigation";
import { SubCategory } from "@/types/category";

interface SubCatMenuProps {
  subCat: SubCategory[];
}

type FeaturedItem = {
  src: string;
  alt: string;
  desc: string;
  price: string;
};

const featuredData: FeaturedItem[] = [
  {
    src: "/images/samsung.png",
    alt: "Samsung Galaxy S21 5G",
    desc: "Samsung Electronics Samsung Galexy S21 5G",
    price: "$160",
  },
  {
    src: "/images/cam.png",
    alt: "iPhone 13 Pro Max",
    desc: "Apple iPhone 13 Pro Max 256GB",
    price: "$999",
  },
  {
    src: "/images/phone.png",
    alt: "OnePlus 9 Pro",
    desc: "OnePlus 9 Pro 5G 256GB",
    price: "$899",
  },
];

const SubCatMenu: React.FC<SubCatMenuProps> = ({ subCat }) => {
  const router = useRouter();

  const handleClickSubCat = (clickedSubCat: SubCategory) => {
    router.push(
      `/category/subCat?subCat=${clickedSubCat.name}&id=${clickedSubCat._id}`,
    );
  };
  return (
    <div className="flex gap-5 relative overflow-y-auto overflow-x-hidden max-h-[440px]">
      <div className="overflow-y-auto overflow-x-hidden w-[15vw]">
        {subCat.map((item: SubCategory, index) =>
          item.isActive === true ? (
            <div
              key={index}
              className="group"
              onClick={() => handleClickSubCat(item)}
            >
              <ItemTitle title={item.name} isArrow={true} />
            </div>
          ) : null,
        )}
      </div>

      {/* //TODO:: replace static products to products in barnds when add brands in db */}
      {/* Make the featured section sticky */}
      <div className="flex flex-col gap-4 overflow-y-auto sticky top-0 w-[30vw] max-h-[70vh]">
        <h2 className="text-base font-semibold text-blackTitle uppercase">
          Featured Phones
        </h2>
        {featuredData.map((feature: FeaturedItem, index) => (
          <FeaturedCard
            width="100%"
            height="90px"
            key={index}
            src={feature.src}
            alt={feature.alt}
            desc={feature.desc}
            price={feature.price}
          />
        ))}
      </div>
    </div>
  );
};

export default SubCatMenu;
