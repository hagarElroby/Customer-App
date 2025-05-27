import Image from "next/legacy/image";

// interface ImageProps {
//   src: string
//   alt: string
// }

const NoYetImg = () => {
  return (
    <div>
      <div className="mx-4 w-36 h-36 md:w-40 md:h-40 relative hidden custom:block">
        <Image
          src="/images/noImg.svg"
          alt="No Image"
          layout="fill"
          objectFit="cover"
          unoptimized
        />
      </div>
    </div>
  );
};
export default NoYetImg;
