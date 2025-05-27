type ResponsiveLogoProps = {
  mode?: "LIGHT" | "DARK";
  width?: string;
  height?: string;
  onClick: () => void;
};

const ResponsiveLogo: React.FC<ResponsiveLogoProps> = ({
  mode = "LIGHT",
  width = "10vw",
  height = "auto",
  onClick,
}) => {
  return (
    <div
      style={{ width: width, height: height }}
      className="min-w-[88px] md:w-[105px] min-h-[49.5px] md:h-[59px] hd:w-[7.2vw] hd:h-[5.7vh] relative cursor-pointer"
      onClick={onClick}
    >
      <img
        src={
          mode === "LIGHT"
            ? "/images/dizzlyRedLogo.svg"
            : "/images/dizzlyWhiteLogo.svg"
        }
      />
    </div>
  );
};

export default ResponsiveLogo;
