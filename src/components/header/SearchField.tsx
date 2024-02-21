import React from "react"
import { TextField, InputAdornment } from "@mui/material"

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
          <InputAdornment position="end"><Search /></InputAdornment>
        ),
      }}
    />
  )
}

export default SearchField