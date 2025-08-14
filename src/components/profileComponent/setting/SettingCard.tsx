const SettingCard = ({
  title,
  desc,
  onClick,
}: {
  title: string;
  desc: string;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="flex min-h-[142px] w-[974px] cursor-pointer flex-col items-start gap-3 bg-white px-10 py-8"
    >
      <h3 className="text-base font-bold text-[#404553]">{title}</h3>
      <p className="text-sm text-[#404553]">{desc}</p>
    </div>
  );
};

export default SettingCard;
