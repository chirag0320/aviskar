import React from "react"
import { TextField, InputAdornment, IconButton } from "@mui/material"

// Assets
import { Search } from "../../assets/icons/index"

function SearchField() {
  return (
    <TextField
      type="search"
      variant="filled"
      placeholder="Search Product"
      className="SearchField"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton><Search /></IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

export default SearchField