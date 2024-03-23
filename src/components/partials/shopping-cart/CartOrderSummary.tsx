import React from 'react'
import { Box, Typography, Stack, Button } from "@mui/material"
import { RightArrow } from '@/assets/icons'
import { useAppSelector } from '@/hooks'
import { navigate } from 'gatsby'

// const CartOrderSummary = ({ isShoppingCartUpdated }: { isShoppingCartUpdated: boolean }) => {
const CartOrderSummary = () => {
    const subTotal = useAppSelector(state => state.shoppingCart.subTotal);

    return (
        <Box className="OrderSummaryDetailsWrapper">
            <Box className="OrderSummaryContent">
                <Typography variant="subtitle2" className='OrderSummaryTitle'>Order Summary </Typography>
                <Stack className='SubtotalWrapper'>
                    <Typography variant="subtitle1">Subtotal </Typography>
                    <Typography variant="body1" className='SubtotalValue'>${subTotal}</Typography>
                </Stack>
                <Stack className='DeliveryWrapper'>
                    <Typography variant="subtitle1">Delivery </Typography>
                    <Typography variant="body1" className='DeliveryValue'>Calculated during checkout </Typography>
                </Stack>
                <Box className="AddCouponWrapper">
                    <Button className='RightArrow' endIcon={<RightArrow />}> Add coupon or gift card</Button>
                </Box>
                <Stack className='TotalWrapper'>
                    <Typography variant="subtitle1">Total </Typography>
                    <Typography variant="subtitle1">Calculated during checkout </Typography>
                </Stack>
            </Box>
            <Button className='ProceedtoCheckoutBtn' size='large' variant="contained" onClick={() => {
                navigate('/checkout')
            }} >Proceed to Checkout</Button>
            {/* {isShoppingCartUpdated && <Typography variant="body2" className='CartUpdatedMessage'>Cart updated</Typography>}
            <Button className='ProceedtoCheckoutBtn' size='large' variant="contained" onClick={() => {
                navigate('/checkout')
            }} disabled={isShoppingCartUpdated}>Proceed to Checkout</Button> */}
        </Box>
    )
}

export default CartOrderSummary