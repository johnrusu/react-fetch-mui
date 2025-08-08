import { useState } from "react";

// mui
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

// mui icons
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import CloseIcon from "@mui/icons-material/Close";

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
        label="Search"
        id="search-input"
        value={inputValue}
        disabled={loading}
        className="w-full"
        onChange={handleOnChange}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => onSearch(inputValue)} edge="end">
                  <ManageSearchIcon />
                </IconButton>
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
        }}
      />
    </div>
  );
};

export default Search;
