import React from 'react'
import Seo from "../components/common/Seo"
import Layout from "@/components/common/Layout";
import { Box, Container, Typography, Stack, Button, Icon } from "@mui/material"
import LogoGoldCoin from "@/assets/logos/LogoGoldCoin.png";
import { DeleteIcon, RightArrow, LeftArrow, TimerIcon } from '@/assets/icons';



// Utils
import { PageTitle } from "@/components/common/Utils"

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
                                    {/* <Stack className='def'> */}
                                    <Stack className='ProductInfo'>
                                        <Stack className='ProductDetailsWrapper'>
                                            <img src={LogoGoldCoin} alt="Logo" />
                                            <Box>
                                                <Typography variant="subtitle1"  >2024 1oz Lunar Series III Year of the Dragon Silver Coin </Typography>
                                                <Typography variant="body2" className="ShippindDate">Ships by 04 Jan 2024 or collect immediately </Typography>
                                                <Stack className='UpdateWrapper'>
                                                    <Icon className='UpdatesIcon'><TimerIcon /></Icon>
                                                    <Typography variant="subtitle1" className="UpdateTime">Updates in 45 Sec </Typography>
                                                </Stack>
                                            </Box>
                                        </Stack>
                                        <Stack className='PriceQuentityWrapper'>
                                            <Box className='PriceWrapper'>
                                                <Typography variant="body2">Live Price </Typography>
                                                <Typography variant="subtitle1">$3557.70 </Typography>
                                            </Box>
                                            <Box className='QuentityWrapper'>
                                                <Typography variant="body2">Qty.</Typography>
                                            </Box>
                                            <Icon className='DeleteIcon'><DeleteIcon /></Icon>
                                        </Stack>
                                    </Stack>
                                    <Stack className='ProductInfo'>
                                        <Stack className='ProductDetailsWrapper'>
                                            <img src={LogoGoldCoin} alt="Logo" />
                                            <Box>
                                                <Typography variant="subtitle1"  >2024 1oz Lunar Series III Year of the Dragon Silver Coin </Typography>
                                                <Typography variant="body2" className="ShippindDate">Ships by 04 Jan 2024 or collect immediately </Typography>
                                                <Stack className='UpdateWrapper'>
                                                    <Icon className='UpdatesIcon'><TimerIcon /></Icon>
                                                    <Typography variant="subtitle1" className="UpdateTime">Updates in 45 Sec </Typography>
                                                </Stack>
                                            </Box>
                                        </Stack>
                                        <Stack className='PriceQuentityWrapper'>
                                            <Box className='PriceWrapper'>
                                                <Typography variant="body2">Live Price </Typography>
                                                <Typography variant="subtitle1">$3557.70 </Typography>
                                            </Box>
                                            <Box className='QuentityWrapper'>
                                                <Typography variant="body2">Qty.</Typography>
                                            </Box>
                                            <Icon className='DeleteIcon'><DeleteIcon /></Icon>
                                        </Stack>
                                    </Stack>
                                    <Stack className='ProductInfo'>
                                        <Stack className='ProductDetailsWrapper'>
                                            <img src={LogoGoldCoin} alt="Logo" />
                                            <Box>
                                                <Typography variant="subtitle1"  >2024 1oz Lunar Series III Year of the Dragon Silver Coin </Typography>
                                                <Typography variant="body2" className="ShippindDate">Ships by 04 Jan 2024 or collect immediately </Typography>
                                                <Stack className='UpdateWrapper'>
                                                    <Icon className='UpdatesIcon'><TimerIcon /></Icon>
                                                    <Typography variant="subtitle1" className="UpdateTime">Updates in 45 Sec </Typography>
                                                </Stack>
                                            </Box>
                                        </Stack>
                                        <Stack className='PriceQuentityWrapper'>
                                            <Box className='PriceWrapper'>
                                                <Typography variant="body2">Live Price </Typography>
                                                <Typography variant="subtitle1">$3557.70 </Typography>
                                            </Box>
                                            <Box className='QuentityWrapper'>
                                                <Typography variant="body2">Qty.</Typography>
                                            </Box>
                                            <Icon className='DeleteIcon'><DeleteIcon /></Icon>
                                        </Stack>
                                    </Stack>
                                    <Stack className='ProductInfo'>
                                        <Stack className='ProductDetailsWrapper'>
                                            <img src={LogoGoldCoin} alt="Logo" />
                                            <Box>
                                                <Typography variant="subtitle1"  >2024 1oz Lunar Series III Year of the Dragon Silver Coin </Typography>
                                                <Typography variant="body2" className="ShippindDate">Ships by 04 Jan 2024 or collect immediately </Typography>
                                                <Stack className='UpdateWrapper'>
                                                    <Icon className='UpdatesIcon'><TimerIcon /></Icon>
                                                    <Typography variant="subtitle1" className="UpdateTime">Updates in 45 Sec </Typography>
                                                </Stack>
                                            </Box>
                                        </Stack>
                                        <Stack className='PriceQuentityWrapper'>
                                            <Box className='PriceWrapper'>
                                                <Typography variant="body2">Live Price </Typography>
                                                <Typography variant="subtitle1">$3557.70 </Typography>
                                            </Box>
                                            <Box className='QuentityWrapper'>
                                                <Typography variant="body2">Qty.</Typography>
                                            </Box>
                                            <Icon className='DeleteIcon'><DeleteIcon /></Icon>
                                        </Stack>
                                    </Stack>
                                    {/* </Stack> */}
                                    <Typography variant="body1"><Typography component="span" className="Note">Note:</Typography> Prices are live prices and will be locked on confirm order. </Typography>
                                </Box>
                                <Stack className="BottomCartActionsWrapper">
                                    <Stack>
                                        <Icon className='LeftArrow'><LeftArrow /></Icon><Typography variant="subtitle1">Continue Shopping </Typography>
                                    </Stack>
                                    <Stack className='ClearUpdateCartWrapper'>
                                        <Typography className="ClearShoppingCart">Clear Shopping Cart </Typography>
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
                                        <Typography variant="subtitle1">Add coupon or gift card </Typography> <Icon className='RightArrow'><RightArrow /></Icon>
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