import React, { useState } from 'react'
import Seo from "../components/common/Seo"
import Layout from "@/components/common/Layout";
import { Box, Container, Typography, Stack, Button, Icon } from "@mui/material"
import LogoGoldCoin from "@/assets/logos/LogoGoldCoin.png";
import { DeleteIcon, RightArrow, LeftArrow, TimerIcon } from '@/assets/icons';



// Utils
import { PageTitle, ProductUpdateCountdown } from "@/components/common/Utils"
import { CartCard } from "@/components/common/Card"
import { productImages } from '@/utils/data';

function ShoppingCart() {

    return (
        <Layout>
            <>
                <Seo
                    keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
                    title="Home"
                    lang="en"
                />
                <Box id="ShoppingCart" component="section" className='ShoppingCartPage'>
                    <Box className="TitleWrapper">
                        <PageTitle title="Shopping cart" />
                    </Box>
                    <Container>
                        <Box className="ShoppingCartContent">
                            <Box className="ShoppingCartDetails">
                                <Box className="ShoppingProductsDetailsWrapper">
                                    {productImages.map((product) => {
                                        return (
                                            <CartCard data={product} hideDeliveryMethod={true} hideRightSide={true} />
                                        )
                                    })}
                                    <Typography variant="body1"><Typography component="span" className="Note">Note:</Typography> Prices are live prices and will be locked on confirm order. </Typography>
                                </Box>
                                <Stack className="BottomCartActionsWrapper">
                                    <Button className='LeftArrow' startIcon={<LeftArrow />} color='secondary'> Continue Shopping</Button>
                                    <Stack className='ClearUpdateCartWrapper'>
                                        <Button className="ClearShoppingCart" color='secondary'>Clear Shopping Cart</Button>
                                        <Button className='UpdateCartBtn' size='large' variant="contained">Update Shopping Cart</Button>
                                    </Stack>
                                </Stack>
                            </Box>
                            <Box className="OrderSummaryDetailsWrapper">
                                <Box className="OrderSummaryContent">
                                    <Typography variant="subtitle2" className='OrderSummaryTitle'>Order Summary </Typography>
                                    <Stack className='SubtotalWrapper'>
                                        <Typography variant="subtitle1">Subtotal </Typography>
                                        <Typography variant="body1" className='SubtotalValue'>$8933.13 </Typography>
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
                                <Button className='ProceedtoCheckoutBtn' size='large' variant="contained">Proceed to Checkout</Button>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </>
        </Layout>
    )
}

export default ShoppingCart
