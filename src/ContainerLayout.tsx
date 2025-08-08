import React, { useId } from "react";
import { Stack, Alert, Button } from "@mui/material";

// components
import Image from "./Image";
import Search from "./Search";

// utils.ts
import { isArrayNotEmpty, isNilOrEmpty } from "./utils";
import { BUTTON_TEXTS } from "./constants";

type TData = string[];
interface ContainerLayoutProps<TData> {
  filteredData: TData;
  loading: boolean;
  className?: string;
  component?: React.ElementType;
  [key: string]: any; // Allow additional props
}

const DataLayout = (props: ContainerLayoutProps<TData>): React.ReactElement => {
  const { filteredData, loading, ...rest } = props;
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
                <h2 className="text-lg font-semibold">{title}</h2>
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
}): React.ReactElement => {
  return isArrayNotEmpty(filteredData) ? (
    <>
      <Search
        onSearch={handleSearch}
        filteredData={filteredData}
        loading={loading}
        className="sticky top-[113px] z-10 bg-white py-4"
      />
      <DataLayout filteredData={filteredData} loading={loading} {...rest} />
    </>
  ) : (
    <Stack flexDirection="column" spacing={1} className="my-4">
      <Alert variant="filled" severity="warning">
        No data available.
      </Alert>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleSearch("")}
      >
        {BUTTON_TEXTS.REFRESH}
      </Button>
    </Stack>
  );
};

export default ContainerLayout;
