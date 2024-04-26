import React from "react"
import { Box, Typography } from "@mui/material"

interface RecordNotFound {
  message?: string,
  isTextAlignCenter?: boolean
}

function RecordNotFound(props: RecordNotFound) {
  const { message, isTextAlignCenter } = props
  return (
    <Box className="RecordNotFound">
      <Typography style={{ textAlign: isTextAlignCenter ? "center" : "initial" }}> {message ? message : "Record not found"}</Typography>
    </Box>
  )
}

export default RecordNotFound