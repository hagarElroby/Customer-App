"use client";
import React, { use, useCallback, useEffect, useRef, useState } from "react";
import ResponsiveLogo from "../shared/ResponsiveLogo";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { svgs } from "../icons/svgs";
import SearchImgPopup from "./SearchImgPopup";
import { getAllProducts, getAllProductsLight } from "@/services/product";
import { AllProductsDocs } from "@/types/product";
import { debounce, set } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
// import { clearFile, setFile } from "@/redux/mediaSlice";
import useClickOutside from "@/hooks/useClickOutside";
import {
  clearProducts,
  clearTotalDocs,
  clearTotalPages,
  setProducts,
  setTotalDocs,
  setTotalPages,
} from "@/redux/product";
import { getTempFile, setTempFile } from "@/utils/fileStorage";
import SearchHistory from "../search/SearchHistory";
import SideBar from "../home/SideBar";

const TopNavLeftSide = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [showSuggestionsPopup, setShowSuggestionsPopup] =
    useState<boolean>(false);
  const searchParams = useSearchParams();
  const searchTermParams = searchParams.get("term");
  const [searchTerm, setSearchTerm] = useState(searchTermParams || "");
  const [isImgDropdownOpen, setIsImgDropdownOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const file = getTempFile();

  const [isSideBarOpen, setIsSideBarOpen] = React.useState(false);
  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const suggestionsRef = useRef<HTMLDivElement>(null);
  useClickOutside(suggestionsRef, () => setShowSuggestionsPopup(false));

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file]);

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const [searchResults, setSearchResults] = useState<AllProductsDocs[]>([]);

  const fetchProductsLight = useCallback(
    debounce(async (query: string) => {
      if (!query) return;

      await getAllProductsLight({
        productName: query,
        page: 1,
        limit: 5,
        allowPagination: true,
        onSuccess: (data) => {
          setSearchResults(data.docs);
          setShowSuggestionsPopup(true);
        },
        onError: (err) => {
          setSearchResults([]);
        },
      });
    }, 500),
    [],
  );

  // call debounce function when search input change
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchProductsLight(value);
  };

  // navigate to search page after submit
  const handleSearchSubmit = async (searchTerm?: string, file?: File) => {
    if (!searchTerm && !file) return;

    router.push(
      `/search${searchTerm ? `?term=${encodeURIComponent(searchTerm)}` : ""}`,
    );
  };

  const handleClearSearch = () => {
    setTempFile(null);
    setSearchTerm("");
  };

  const handleFileUpload = async (file: File) => {
    if (file) {
      setTempFile(file);
      setIsImgDropdownOpen(false);
      router.push(`/search`);
      await getAllProducts({
        sort: "SIMILARITY",
        fromAdminPanel: false,
        page: 1,
        limit: 15,
        allowPagination: true,
        file,
        onSuccess: (data) => {
          dispatch(setProducts(data.docs));
          dispatch(setTotalPages(data.totalPages ?? 1));
          dispatch(setTotalDocs(data.totalDocs ?? 1));
        },
      });
    }
  };

  const handleSuggestionClick = (productName: string, file?: File) => {
    if (productName) {
      setSearchTerm(productName);
      handleSearchSubmit(productName, file);
      setShowSuggestionsPopup(false);
    }
  };

  const sampleHistory = [
    {
      productName: "Sporty Wireless Headphone",
    },
    {
      productName: "Sporty Wireless Headphone",
    },
  ];

  const pathname = usePathname();
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current === "/search/") {
      setSearchTerm("");
      dispatch(clearProducts());
      dispatch(clearTotalPages());
      dispatch(clearTotalDocs());
    }
    prevPath.current = pathname;
  }, [pathname]);

  return (
    <div className="flex justify-center items-center gap-4 lg:gap-10">
      <button onClick={toggleSideBar} className="block md:hidden">
        {svgs.sideMenuIcon}
      </button>
      <ResponsiveLogo onClick={() => router.push(`/`)} />
      {/* search */}
      <div
        className={`w-[235px] sm:w-[60vw] md:w-[37vw] lg:w-[567px] flex items-center justify-between relative gap-[2px] md:gap-1 rounded-[50px]
          py-2 md:py-3 px-3 md:px-4 h-12 border
            ${showSuggestionsPopup ? "bg-white border-main" : "bg-bgSearch border-bgSearch"}`}
        onClick={() => {
          if (searchResults.length > 0 || sampleHistory.length > 0) {
            setShowSuggestionsPopup(true);
          }
        }}
      >
        <button
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center outline-none"
        >
          {file ? (
            <div className="flex items-center justify-center w-5 h-5 md:w-8 md:h-8 rounded-3xl overflow-hidden border border-main">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ) : (
            <span
              onClick={() => {
                if (searchTerm || file) {
                  handleSearchSubmit(searchTerm, file || undefined);
                  setShowSuggestionsPopup(false);
                }
              }}
            >
              <span className="hidden md:block">{svgs.searchIcon}</span>
              <span className="block md:hidden">{svgs.searchIconMobile}</span>
            </span>
          )}
        </button>
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchInputChange}
          onSubmit={() => handleSearchSubmit(searchTerm)}
          onKeyDown={(e) => {
            if (
              (e.key === "Enter" && searchTerm) ||
              (e.key === "Enter" && file)
            ) {
              handleSearchSubmit(searchTerm, file || undefined);
              setShowSuggestionsPopup(false);
            }
          }}
          placeholder="What are you looking for?"
          className="text-xs md:text-sm md:font-bold bg-transparent text-meduimBlack placeholder-searchPlaceholder 
              w-full h-full ml-1 outline-none"
        />
        {file && !searchTerm && (
          <button
            onClick={handleClearSearch}
            className="mr-2 md:mr-5 cursor-pointer"
          >
            {svgs.closeIconGray}
          </button>
        )}
        <button
          onClick={(e) => {
            setIsImgDropdownOpen(true);
            e.stopPropagation();
          }}
        >
          <span className="hidden md:block">{svgs.camera}</span>
          <span className="block md:hidden">{svgs.cameraMobile}</span>
        </button>

        <SearchImgPopup
          onClose={() => setIsImgDropdownOpen(false)}
          onSave={handleFileUpload}
          isOpen={isImgDropdownOpen}
        />
        {showSuggestionsPopup &&
          (searchResults?.length > 0 || sampleHistory.length > 0) && (
            <div
              ref={suggestionsRef}
              className="absolute -top-3 left-0 -z-10 max-h-[400px] w-full bg-white rounded-lg 
      overflow-hidden flex flex-col p-4 shadow-custom-1"
            >
              {/* static content above scroll */}
              <div className="h-10" />{" "}
              <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col px-1">
                  {searchResults.map((result) => {
                    const name = result.productName || "";
                    const matchIndex = name
                      .toLowerCase()
                      .indexOf(searchTerm.toLowerCase().trim());

                    const beforeMatch =
                      matchIndex >= 0 ? name.slice(0, matchIndex) : name;
                    const matchText =
                      matchIndex >= 0
                        ? name.slice(matchIndex, matchIndex + searchTerm.length)
                        : "";
                    const afterMatch =
                      matchIndex >= 0
                        ? name.slice(matchIndex + searchTerm.length)
                        : "";

                    return (
                      <div
                        className="flex items-center justify-between p-4 gap-3 cursor-pointer hover:bg-lightNavigationBg border-b border-[#DBDBDB]"
                        key={name}
                        onClick={() => handleSuggestionClick(name)}
                      >
                        <p className="text-sm font-normal flex gap-1 items-center">
                          <span>{svgs.searchIcon}</span>
                          <span className="line-clamp-1">
                            {beforeMatch}
                            {matchText && (
                              <span className="text-[#CACACA] font-medium">
                                {matchText}
                              </span>
                            )}
                            {afterMatch}
                          </span>
                        </p>
                        <span>{svgs.searchArrow}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Search history below result list */}
                <SearchHistory
                  data={sampleHistory}
                  //TODO: Replace with actual search history data and clear functionality
                  onClear={() => {
                    console.log("Clear history");
                  }}
                  onItemClick={(productName) => {
                    handleSearchSubmit(productName);
                    setShowSuggestionsPopup(false);
                  }}
                />
              </div>
            </div>
          )}
      </div>
      <SideBar isOpen={isSideBarOpen} onClose={toggleSideBar} />
    </div>
  );
};

export default TopNavLeftSide;
