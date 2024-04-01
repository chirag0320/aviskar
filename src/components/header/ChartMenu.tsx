import React from "react"
import { IconButton } from "@mui/material"
import classNames from "classnames"

// Assets
import { ActivityIcon } from "../../assets/icons/index"

interface ChartMenuProps {
  onClick?: () => void
}

function ChartMenu(props: ChartMenuProps) {
  const { onClick } = props
  return (
    <>
      <IconButton aria-label='chartIcon' className={classNames("MenuButton", { "Active": false })} onClick={onClick}><ActivityIcon /></IconButton>
    </>
  )
}

export default React.memo(ChartMenu)