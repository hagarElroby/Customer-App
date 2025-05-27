import { MediaHeistSite } from "@/constants/links";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-4">
      <p className="flex flex-col items-center justify-center md:flex-row font-normal text-[10px] hd:text-[0.71vw] text-textAuth">
        <span>
          &copy; 2021 - {currentYear} All Rights Reserved. Developed by
        </span>
        <a
          href={MediaHeistSite}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-[2px] lg:ml-1 hd:ml-[0.3vw] text-main underline capitalize"
        >
          Media Heist
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;
