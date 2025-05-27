const WelcomeText = ({ name }: { name: string }) => {
  return (
    <h2 className="flex items-center gap-2 px-12 py-4 w-full">
      <span className="text-black font-black text-2xl font-shadows italic">
        Hi, {name}
      </span>
      <span className="text-xl text-grayProfile font-normal font-montserrat">
        welcome to Dizzly vendor profile
      </span>
    </h2>
  );
};
export default WelcomeText;
