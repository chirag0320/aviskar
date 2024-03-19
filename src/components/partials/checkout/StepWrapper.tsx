import React from "react"
import { Box, Typography } from "@mui/material"
import classNames from "classnames"

interface StepWrapper {
  title: string
  children: any
  className?: string
}

function StepWrapper(props: StepWrapper) {
  const { title, children, className } = props
  return (
    <Box className={classNames("StepWrapper", className)}>
      <Typography className="Title" variant="subtitle2">{title}</Typography>
      {children}
    </Box>
  )
}

export default StepWrapper