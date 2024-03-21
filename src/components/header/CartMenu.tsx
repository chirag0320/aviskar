import React from "react"
import { IconButton } from "@mui/material"
import classNames from "classnames"

// Assets
import { CartIcon } from "../../assets/icons/index"

function CartMenu() {
  return (
    <>
      <IconButton aria-label='cartIcon' className={classNames("MenuButton", { "Active": false })}><CartIcon /></IconButton>
    </>
  )
}

export default React.memo(CartMenu)