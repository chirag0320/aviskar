import React from "react"
import { Box } from "@mui/material"
import classNames from "classnames"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
  className?: string
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index, className, ...other } = props

  return (
    <Box
      className={classNames("TabPanel", { "Active": value === index }, className)}
      role="tabpanel"
      hidden={value !== index}
      id={`Tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      {...other}
    >
      {value === index && children}
    </Box>
  )
}

export default TabPanel
