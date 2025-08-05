import { Category } from "@/types/category";
import { useRouter } from "next/navigation";
import { svgs } from "../icons/svgs";

interface CardProps {
  item: Category;
}

const CategoryItem: React.FC<CardProps> = ({ item }) => {
  const router = useRouter();

  const handleClickCategory = (category: Category) => {
    router.push(`/category?category=${category.name}&id=${category._id}`);
  };

  return (
    <div
      className="custom-rounded-input w-full h-[390px] xxl:h-[391px] flex flex-col justify-between hd:gap-[1.1vw] 
        border hd:border-[0.06vw] border-customBorder overflow-hidden"
      onClick={() => handleClickCategory(item)}
    >
      <div className="w-full h-[200px] cursor-pointer">
        <img
          src={item?.image ? item.image : "/images/catImg.svg"}
          alt="category"
          className="block w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col gap-4 hd:gap-[1.1vw] mx-6 hd:mx-[1.66vw] mb-6 hd:mb-[1.66vw]">
        <div className="flex flex-col gap-2 hd:gap-[0.55vw] cursor-pointer">
          <h3 className="font-medium text-sm md:text-base xxl:text-lg hd:text-[1.25vw] text-headColor">
            {item.name}
          </h3>
          <p
            className="font-normal text-xs hd:text-[0.83vw] text-emailText"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.description}
          </p>
        </div>
        <p className="font-medium text-xs hd:text-[0.83vw] text-headColor">
          {item?.subCategories?.length} Subcategory
        </p>
        <a
          href="#"
          className="font-normal text-xs hd:text-[0.83vw] text-main flex items-center justify-between"
        >
          <span className="underline decoration-[1px] decoration-main">
            Lorem ipsum dolor sit amet consectetur.
          </span>
          <span>{svgs.redSqareArr}</span>
        </a>
      </div>
    </div>
  );
};

export default CategoryItem;
