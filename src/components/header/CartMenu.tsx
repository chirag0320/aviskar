import React from "react"
import { IconButton } from "@mui/material"
import classNames from "classnames"
import Badge from '@mui/material/Badge';

// Assets
import { CartIcon } from "../../assets/icons/index"
import { useAppSelector } from "@/hooks";

interface CartMenuProps {
  onClick?: () => void
}

function CartMenu(props: CartMenuProps) {
  const { cartItems } = useAppSelector((state) => state.shoppingCart)
  const { onClick } = props
  return (
    <>
      <Badge badgeContent={cartItems?.length?.toString()} color="primary">
        <IconButton color="secondary" aria-label='cartIcon' className={classNames("MenuButton", { "Active": false })} onClick={onClick}><CartIcon /></IconButton>
      </Badge>
    </>
  )
}

export default React.memo(CartMenu)