import React from "react";
import { Button, Stack } from "@mui/material";
import { BUTTON_TEXTS } from "./constants"; // Importing button texts from constants.ts

interface ButtonLayoutProps {
  handleClick: () => Promise<void>;
  handleHistoryClick: () => void;
  resetData: () => void;
  [key: string]: any; // Allow additional props
}

const ButtonLayout: React.FC<ButtonLayoutProps> = ({
  handleClick,
  resetData,
  handleHistoryClick,
  ...props
}): React.ReactElement => {
  const isDisabled = props.loading || false; // Disable buttons if loading
  const className = props.className || "";
  return (
    <Stack
      className={`Layout ${className}`}
      flexDirection={"column"}
      spacing={1}
    >
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClick}
        {...props}
        disabled={isDisabled}
      >
        {BUTTON_TEXTS.FETCH}
      </Button>
      <Button
        variant="contained"
        onClick={resetData}
        disabled={isDisabled}
        color="info"
      >
        {BUTTON_TEXTS.RESET}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleHistoryClick}
        {...props}
        disabled={isDisabled}
      >
        {BUTTON_TEXTS.HISTORY}
      </Button>
    </Stack>
  );
};

export default ButtonLayout;
