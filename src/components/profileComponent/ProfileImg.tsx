import Image from "next/image";
interface ProfileImgProps {
  src: string;
}
const ProfileImg: React.FC<ProfileImgProps> = ({ src }) => {
  return (
    <div className="w-11 h-11 relative rounded-full">
      <Image
        src={src}
        alt="Profile Photo"
        layout="fill"
        objectFit="contain"
        unoptimized
      />
    </div>
  );
};
export default ProfileImg;
