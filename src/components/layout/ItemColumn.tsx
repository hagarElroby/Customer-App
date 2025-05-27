import Link from "next/link";
import React from "react";

const ItemCoulmn = ({ text }: { text: string }) => {
  //TODO: Add the link to the item
  return (
    <Link
      className="text-sm font-notrmal text-black hover:text-main hover:underline transition duration-200"
      href=""
    >
      {text}
    </Link>
  );
};

export default ItemCoulmn;
