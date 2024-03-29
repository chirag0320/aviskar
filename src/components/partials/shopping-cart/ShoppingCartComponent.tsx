import React, { useState } from 'react'
import CartDetails, { CartItemsWithLivePriceDetails } from './CartDetails'
import CartOrderSummary from './CartOrderSummary'
import { Box } from '@mui/material'

const ShoppingCartComponent = () => {
    const [cartItemsWithLivePrice, setCartItemsWithLivePrice] = useState<CartItemsWithLivePriceDetails[]>([]);
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({})

    return (
        <Box className="ShoppingCartContent">
            <CartDetails cartItemsWithLivePrice={cartItemsWithLivePrice} setCartItemsWithLivePrice={setCartItemsWithLivePrice} quantities={quantities} setQuantities={setQuantities} />
            <CartOrderSummary cartItemsWithLivePrice={cartItemsWithLivePrice} quantities={quantities} />
        </Box>
    )
}

export default ShoppingCartComponent