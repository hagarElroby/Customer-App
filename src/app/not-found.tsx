"use client";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 md:gap-6 xxl:gap-8 hd:gap-[2vw] p-9 md:p-12 xxl:p-[60px] hd:p-[5vw]">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-[64px] hd:text-[4.44vw] text-main">
        Oops!
      </h1>
      <p className="font-normal text-sm md:text-base xxl:text-xl hd:text-[1.38vw] text-meduimBlack">
        You are lost
      </p>
      <img
        src="/images/404.svg"
        alt="404"
        className="min-w-[250px] min-h-[200px] w-[41vw] h-[40vh]"
      />
      <p className="font-normal text-sm md:text-base xxl:text-xl hd:text-[1.38vw] text-meduimBlack">
        The requested page does not exist.
      </p>
      <button
        onClick={() => window.history.go(-2)}
        className="font-semibold text-xs md:text-sm xxl:text-base hd:text-[1.11vw] text-white min-w-36 w-[9.86vw] h-10
                hd:h-[2.77vw] bg-main rounded-lg hd:rounded-[0.55vw] px-4 py-2 md:px-6 md:py-[10px] flex items-center justify-center"
      >
        Return Back
      </button>
    </div>
  );
}
