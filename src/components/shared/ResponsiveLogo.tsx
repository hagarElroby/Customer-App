type ResponsiveLogoProps = {
  mode?: "LIGHT" | "DARK";
  onClick: () => void;
};

const ResponsiveLogo: React.FC<ResponsiveLogoProps> = ({
  mode = "LIGHT",
  onClick,
}) => {
  return (
    <div
      className="w-[60px] md:w-[100px] relative cursor-pointer"
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
