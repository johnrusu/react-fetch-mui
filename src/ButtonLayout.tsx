import React from "react";
import { Button, Stack } from "@mui/material";

const BUTTON_TEXTS = {
  FETCH: "Fetch data",
  RESET: "Reset",
};

interface ButtonLayoutProps {
  handleClick: () => Promise<void>;
  resetData: () => void;
  [key: string]: any; // Allow additional props
}

const ButtonLayout: React.FC<ButtonLayoutProps> = ({
  handleClick,
  resetData,
  ...props
}): React.ReactElement => {
  const isDisabled = props.loading; // Disable buttons if loading
  return (
    <Stack className="Layout" flexDirection={"column"} spacing={2}>
      <Button
        variant="contained"
        onClick={handleClick}
        {...props}
        className={isDisabled ? "disabled" : ""}
      >
        {BUTTON_TEXTS.FETCH}
      </Button>
      <Button
        variant="outlined"
        type="button"
        onClick={resetData}
        color="error"
        className={`reset-button ${isDisabled ? "disabled" : ""}`}
      >
        {BUTTON_TEXTS.RESET}
      </Button>
    </Stack>
  );
};

export default ButtonLayout;
