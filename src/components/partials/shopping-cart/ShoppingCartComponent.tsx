import React, { useState } from 'react'
import CartDetails, { CartItemsWithLivePriceDetails } from './CartDetails'
import CartOrderSummary from './CartOrderSummary'
import { Box } from '@mui/material'
import { useAppSelector } from '@/hooks'
import Toaster from '@/components/common/Toaster'


const ShoppingCartComponent = () => {
    const openToaster = useAppSelector(state => state.homePage.openToaster)

    const [cartItemsWithLivePrice, setCartItemsWithLivePrice] = useState<CartItemsWithLivePriceDetails[]>([]);
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({})

    return (
        <>
            {openToaster && <Toaster />}
            <Box className="ShoppingCartContent">
                <CartDetails cartItemsWithLivePrice={cartItemsWithLivePrice} setCartItemsWithLivePrice={setCartItemsWithLivePrice} quantities={quantities} setQuantities={setQuantities} />
                <CartOrderSummary cartItemsWithLivePrice={cartItemsWithLivePrice} quantities={quantities} />
            </Box>
        </>
    )
}

export default React.memo(ShoppingCartComponent);