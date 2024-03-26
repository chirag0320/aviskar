import React from "react"
import { Box, Typography } from "@mui/material"

interface RecordNotFound {
  message?: string
}

function RecordNotFound(props: RecordNotFound) {
  const { message } = props
  return (
    <Box className="RecordNotFound">
      <Typography> {message ? message : "Record not found"}</Typography>
    </Box>
  )
}

export default RecordNotFound