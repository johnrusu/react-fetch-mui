import React, { useId } from "react";

// components
import Image from "./Image";
import Search from "./Search";
import HighlightText from "./HighlightText";

// utils.ts
import { isArrayNotEmpty, isNilOrEmpty } from "./utils";

type TData = string[];
interface ContainerLayoutProps<TData> {
  searchQuery?: string;
  filteredData: TData;
  loading: boolean;
  className?: string;
  component?: React.ElementType;
  [key: string]: any; // Allow additional props
}

const DataLayout = (props: ContainerLayoutProps<TData>): React.ReactElement => {
  const { filteredData, loading, searchQuery, ...rest } = props;
  const uniqueId = useId();
  return (
    <div className={`ContainerLayout ${rest.className || ""}`} {...rest}>
      {filteredData.map((item, index) => {
        const urlSplits: string[] = item
          .split("/")
          .filter((q) => !isNilOrEmpty(q));
        let title: string = urlSplits[3] || "Image";
        title =
          title.charAt(0).toUpperCase() + title.slice(1).replace(/-/g, " ");
        return (
          <div
            key={`${uniqueId}-${index}`}
            className={`${loading ? "pointer-events-none opacity-50" : ""}`}
          >
            <Image
              src={item}
              alt={`Image ${item}-${index}`}
              className="image cursor-pointer"
            >
              <div className="text-center mt-2">
                <HighlightText text={title} highlight={searchQuery as string} />
              </div>
            </Image>
          </div>
        );
      })}
    </div>
  );
};

const ContainerLayout: React.FC<ContainerLayoutProps<TData>> = ({
  handleSearch,
  loading,
  filteredData,
  ...rest
}): React.ReactElement | null => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const handleSearchInContainer = (inputValue: string) => {
    handleSearch(inputValue);
    setSearchQuery(inputValue);
  };
  return (
    <>
      <Search
        onSearch={handleSearchInContainer}
        filteredData={filteredData}
        loading={loading}
        className="sticky top-[113px] z-10 bg-white py-4"
      />
      {isArrayNotEmpty(filteredData) ? (
        <DataLayout
          filteredData={filteredData}
          loading={loading}
          searchQuery={searchQuery}
          {...rest}
        />
      ) : null}
    </>
  );
};

export default ContainerLayout;
