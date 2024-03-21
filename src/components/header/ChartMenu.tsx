import React from "react"
import { IconButton } from "@mui/material"
import classNames from "classnames"

// Assets
import { ActivityIcon } from "../../assets/icons/index"

function ChartMenu() {
  return (
    <>
      <IconButton aria-label='chartIcon' className={classNames("MenuButton", { "Active": false })}><ActivityIcon /></IconButton>
    </>
  )
}

export default React.memo(ChartMenu)