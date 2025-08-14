interface NoText {
  title: string;
  text?: string;
}

const NoYetText: React.FC<NoText> = ({ title, text }) => {
  return (
    <div className="flex flex-col items-center text-center gap-2">
      <h2 className="font-bold text-5 md:text-6 text-headColor">{title}</h2>
      {text && (
        <p className="text-sm font-medium text-iconGray md:text-base">{text}</p>
      )}
    </div>
  );
};
export default NoYetText;
