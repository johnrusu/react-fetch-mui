import { useState } from "react";

// mui
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

// mui icons
import CloseIcon from "@mui/icons-material/Close";

// utils
import { isNilOrEmpty } from "./utils";

//constants
import { BUTTON_TEXTS } from "./constants";

// interface
interface SearchProps {
  onSearch: (query: string) => void;
  loading: boolean;
  filteredData: string[];
  [key: string]: any; // Allow additional props
}

const Search: React.FC<SearchProps> = ({
  onSearch,
  filteredData,
  loading,
  ...rest
}): React.ReactElement => {
  const [inputValue, setInputValue] = useState<string>("");
  const className = rest.className || "";

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className={`search-container my-4 ${className}`}>
      <>
        <div className="mb-4">
          <h6 className="text-lg font-semibold text-left">
            {BUTTON_TEXTS.RESULTS}{" "}
            {filteredData.length >= 0 ? `(${filteredData.length} results)` : ""}
          </h6>
        </div>

        <TextField
          label="Search..."
          id="search-input"
          value={inputValue}
          disabled={loading}
          className="w-full"
          onChange={handleOnChange}
          slotProps={
            !isNilOrEmpty(inputValue)
              ? {
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setInputValue("");
                            onSearch("");
                          }}
                          edge="end"
                        >
                          <CloseIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }
              : undefined
          }
        />
      </>
    </div>
  );
};

export default Search;
