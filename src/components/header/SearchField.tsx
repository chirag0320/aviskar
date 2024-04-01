import React, { useEffect, useState } from "react";
import { Box, TextField, Autocomplete, IconButton, Stack } from "@mui/material";
import { Search } from "../../assets/icons/index"; // Assuming you have imported the Search icon

// Assuming you have appropriate custom hooks for API calls and debouncing
import useCallAPI from "@/hooks/useCallAPI";
import useDebounce from "@/hooks/useDebounce";
import { ENDPOINTS } from "@/utils/constants";
import { navigate } from "gatsby";

interface Option {
  name: string;
  friendlypagename: string;
}

function SearchField() {
  const { apiCallFunction } = useCallAPI();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  const debouncedInputValue = useDebounce(inputValue, 500);

  const fetchOptions = async () => {
    try {
      const response = await apiCallFunction(ENDPOINTS.autoSearch + debouncedInputValue, "POST");
      setOptions(response.data);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    if (debouncedInputValue) {
      fetchOptions();
    } else {
      setOptions([]); // Clear options when input value is empty
    }
  }, [debouncedInputValue]);

  useEffect(() => {
    return () => {
      setOptions([]);
    }
  }, []);

  const handleSearch = () => {
    navigate(`/search/?keyword=${inputValue}`);
  }

  return (
    <Autocomplete
      className="SearchField"
      options={options}
      color="primary"
      getOptionLabel={(option: Option) => option.name}
      renderOption={(props, option: Option) => (
        <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props} onClick={() => navigate(`/product-details/${option?.friendlypagename}`)}>
          {/* Uncomment below if you have an image associated with each option */}
          {/* <img
            loading="lazy"
            width="20"
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            alt=""
          /> */}
          {option?.name}
        </Box>
      )}
      renderInput={(params) => (
        <Stack className="Wrapper">
          <TextField
            {...params}
            variant="filled"
            placeholder="Search Product"
            defaultValue={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            inputProps={{
              ...params.inputProps,
            }}
          />
          <IconButton color="secondary" className="SearchButton" onClick={handleSearch}>
            <Search fontSize="small" />
          </IconButton>
        </Stack>
      )}
    />
  );
}

export default SearchField;
