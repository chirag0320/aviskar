import React from "react"
import { IconButton } from "@mui/material"
import classNames from "classnames"
import Badge from '@mui/material/Badge';

// Assets
import { CartIcon } from "../../assets/icons/index"



function CartMenu() {
  return (
    <>
      <Badge badgeContent={1} color="primary" max={99}>
        <IconButton aria-label='cartIcon' className={classNames("MenuButton", { "Active": false })}><CartIcon /></IconButton>
      </Badge>
    </>
  )
}

export default React.memo(CartMenu)