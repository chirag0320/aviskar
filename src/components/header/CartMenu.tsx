import React from "react"
import { IconButton } from "@mui/material"
import classNames from "classnames"
import Badge from '@mui/material/Badge';

// Assets
import { CartIcon } from "../../assets/icons/index"

interface CartMenuProps {
  onClick?: () => void
}

function CartMenu(props: CartMenuProps) {
  const { onClick } = props
  return (
    <>
      <Badge badgeContent={1} color="primary" max={99}>
        <IconButton color="secondary" aria-label='cartIcon' className={classNames("MenuButton", { "Active": false })} onClick={onClick}><CartIcon /></IconButton>
      </Badge>
    </>
  )
}

export default React.memo(CartMenu)