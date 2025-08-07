import React from "react";
import { Button, Stack } from "@mui/material";

const BUTTON_TEXTS = {
  FETCH: "Fetch data",
  RESET: "Reset",
};

interface ButtonLayoutProps {
  handleClick: () => Promise<void>;
  resetData: () => void;
}

const ButtonLayout: React.FC<ButtonLayoutProps> = ({
  handleClick,
  resetData,
}): React.ReactElement => {
  return (
    <Stack className="Layout" flexDirection={"column"} spacing={2}>
      <Button variant="contained" onClick={handleClick}>
        {BUTTON_TEXTS.FETCH}
      </Button>
      <Button
        variant="outlined"
        type="button"
        onClick={resetData}
        color="error"
        className="reset-button"
      >
        {BUTTON_TEXTS.RESET}
      </Button>
    </Stack>
  );
};

export default ButtonLayout;
