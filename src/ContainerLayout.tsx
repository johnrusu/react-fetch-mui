import React from "react";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";

// components
import Image from "./Image";

// utils.ts
import { isArrayNotEmpty } from "./utils";

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
    <Paper className={`ContainerLayout ${rest.className || ""}`} {...rest}>
      {data.map((item) => (
        <div key={item}>
          <Image src={item} alt={`Image ${item}`} className="image" />
        </div>
      ))}
    </Paper>
  ) : (
    <Paper>
      <Alert variant="filled" severity="error">
        No data available.
      </Alert>
    </Paper>
  );
};

export default ContainerLayout;
