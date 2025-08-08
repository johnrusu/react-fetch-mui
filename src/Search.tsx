import { useState } from "react";

// mui
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

// mui icons
import CloseIcon from "@mui/icons-material/Close";

// utils
import { isNilOrEmpty } from "./utils";

// interface
interface SearchProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

const Search: React.FC<SearchProps> = ({
  onSearch,
  loading,
}): React.ReactElement => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="search-container my-4">
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
    </div>
  );
};

export default Search;
