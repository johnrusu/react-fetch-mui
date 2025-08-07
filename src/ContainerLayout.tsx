import React from "react";
import Alert from "@mui/material/Alert";

// components
import Image from "./Image";

// utils.ts
import { isArrayNotEmpty, isNilOrEmpty } from "./utils";

type TData = string[];
interface ContainerLayoutProps<TData> {
  data: TData;
  className?: string;
  component?: React.ElementType;
  [key: string]: any; // Allow additional props
}

const ContainerLayout: React.FC<ContainerLayoutProps<TData>> = ({
  data,
  ...rest
}): React.ReactElement => {
  return isArrayNotEmpty(data) ? (
    <div className={`ContainerLayout ${rest.className || ""}`} {...rest}>
      {data.map((item, index) => {
        const urlSplits: string[] = item
          .split("/")
          .filter((q) => !isNilOrEmpty(q));
        let title: string = urlSplits[3] || "Image";
        title =
          title.charAt(0).toUpperCase() + title.slice(1).replace(/-/g, " ");
        return (
          <div key={item}>
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
  ) : (
    <div>
      <Alert variant="filled" severity="error">
        No data available.
      </Alert>
    </div>
  );
};

export default ContainerLayout;
