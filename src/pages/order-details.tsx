import React from 'react'
import Seo from "../components/common/Seo"
import Layout from "@/components/common/Layout";
import { Box, Link, Container, Typography, Button, Stack, Icon } from "@mui/material"
import { AddToCartIcon, PdfIcon } from '@/assets/icons';



function orderDetails() {
    return (
        <Layout>
            <>
                <Seo
                    keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
                    title="Home"
                    lang="en"
                />
                <Box id="OrderDetailsPage" className='OrderDetailsPage' component="section">
                    <Container>
                        <Box className="OrderDetailsContent">
                            <Box className="OrderDetailsWrapper">
                                <Box sx={{ textAlign: "right" }}>
                                    <Button sx={{ gap: "12px" }} className='PDF invoiceBtn' size='large' variant="contained"><Icon className='PdfIcon'><PdfIcon /></Icon>PDF invoice</Button>
                                </Box>
                                <Typography variant="subtitle2" className="OrderID">Order : SEP-0026112024</Typography>
                                <Stack className="OrderDetails">
                                    <Box className="OrderDateWrapper">
                                        <Typography variant="body1" className="">Order Date</Typography>
                                        <Typography variant="subtitle1" className="Font16">Tuesday, September 26, 2023</Typography>
                                    </Box>
                                    <Box className="OrderTimeWrapper">
                                        <Typography variant="body1" className="">Order Time</Typography>
                                        <Typography variant="subtitle1" className="Font16">10:46 AM</Typography>
                                    </Box>
                                    <Box className="OrderNumberWrapper">
                                        <Typography variant="body1" className="">Order Number</Typography>
                                        <Typography variant="subtitle1" className="Font16">273323931</Typography>
                                    </Box>
                                    <Box className="OrderStatusWrapper">
                                        <Typography variant="body1" className="">Order Status</Typography>
                                        <Stack sx={{ gap: "10px" }}>
                                            <Button variant="contained" size="small" className="RedButton">Cancelled</Button>
                                            <Button variant="contained" size="small" className="RedButton">Approved Cancellation</Button>
                                        </Stack>

                                    </Box>
                                    <Box className="PaymentWrapper">
                                        <Typography variant="body1" className="">Payment</Typography>
                                        <Typography variant="subtitle1" className="Font16">Bank Transfer</Typography>
                                    </Box>
                                    <Box className="DeliveryWrapper">
                                        <Typography variant="body1" className="">Delivery</Typography>
                                        <Typography variant="subtitle1" className="Font16">Secure Shipping</Typography>
                                    </Box>
                                </Stack>
                            </Box>

                            <Box className="AddressWrapper">
                                <Box className="BillingWrapper">
                                    <Typography variant="subtitle1" className="AddressTitle">Billing Address</Typography>
                                    <Typography variant="subtitle1" className="CommonBottomMargin Font16">Steve</Typography>
                                    <Stack sx={{ gap: "10px", alignItems: "center" }} className="CommonBottomMargin">
                                        <Typography variant="body1">Email: </Typography><Typography variant="subtitle1" className='Font16'>steve@123.com</Typography>
                                    </Stack>
                                    <Stack sx={{ gap: "10px", alignItems: "center" }} className="CommonBottomMargin">
                                        <Typography variant="body1">Phone </Typography><Typography variant="subtitle1" className='Font16'> : 917228040585</Typography>
                                    </Stack>
                                    <Typography variant="body1" className="CommonBottomMargin">65, McMullen Road Sunshine Coast, Queensland <br /> 4069, Australia</Typography>
                                    <Stack sx={{ gap: "10px", alignItems: "center" }} className="">
                                        <Typography variant="body1" className="">Account Type: </Typography><Typography variant="subtitle1" className='Font16'>Individual</Typography>
                                    </Stack>
                                </Box>
                                <Box className="ShippingWrapper">
                                    <Typography variant="subtitle1" className="AddressTitle">Shipping Address</Typography>
                                    <Typography variant="subtitle1" className="CommonBottomMargin Font16">AIS developer</Typography>
                                    <Stack sx={{ gap: "10px", alignItems: "center" }} className="CommonBottomMargin">
                                        <Typography variant="body1">Email: </Typography><Typography variant="subtitle1" className='Font16'>steve@123.com</Typography>
                                    </Stack>
                                    <Stack sx={{ gap: "10px", alignItems: "center" }} className="CommonBottomMargin">
                                        <Typography variant="body1">Phone </Typography><Typography variant="subtitle1" className='Font16'> : 917228040585</Typography>
                                    </Stack>
                                    <Typography variant="body1" className="CommonBottomMargin">1638 Steve Sunshine Coast, Queensland <br />4519, Australia</Typography>
                                    <Typography variant="subtitle1" className='Font16'>Address Verified</Typography>
                                </Box>
                            </Box>

                            <Box className="OrderDetailTable">
                            </Box>

                            <Stack className='TotalShippingDetailsWrapper'>
                                <Stack className='SubtotalShippingWrapper'>
                                    <Box className="Subtotal">
                                        <Typography variant="body1" sx={{ marginBottom: "2px" }}>Subtotal</Typography>
                                        <Typography variant="subtitle1" className="">$ 8933.13</Typography>
                                    </Box>
                                    <Box className="SecureShipping">
                                        <Typography variant="body1" sx={{ marginBottom: "2px" }}>Secure Shipping</Typography>
                                        <Typography variant="subtitle1" className="">$ 120.22</Typography>
                                    </Box>
                                </Stack>
                                <Box className="TotalWrapper">
                                    <Typography variant="body1" className="">Total</Typography>
                                    <Typography variant="subtitle2" className="TotalValue">$ 9240.35</Typography>
                                    <Stack sx={{ gap: "12px" }}>
                                        <Typography variant="overline" className="">GST Included:</Typography>
                                        <Typography variant="overline" className="">$ 819.30</Typography>
                                    </Stack>
                                </Box>
                            </Stack>
                            <Typography variant="body1" className="KeyPoints">Congratulations on your decision to buy precious metals and thank you for choosing Queensland Mint. As a reminder here are some key points to note: 1) You have made a purchase based on live prices that update every €0 seconds. 2) Your order has been locked and price fixed at a specific time stamp. 3) Your order constitutes a legally binding contract. 4) You cannot change or cancel an order, 5) Payment must be made within 24 hours (weekends and public holidays excluded). 6) Failure to pay is a breach of contract. 7) Our remedies include repricing, liquidation of your metal, administration fees, market loss assignment and legal cost recovery. For the full terms and conditions to which you have agreed please refer to https://brisbanebullion.com.au/terms-of-service. 8) Any payment made in respect of this invoice must be made by the person(s) and/or entity to whom it is addressed. Please refer to https://brisbanebullion.com.au/payment to learn more. Once again, thank you for choosing Queensland Mint.</Typography>
                            <Box className="CardsWrapper">
                                <Box className="Card SecureShippingCard">
                                    <Stack className='IconTitleWrapper'>
                                        <Icon className=""><AddToCartIcon /></Icon>
                                        <Typography variant="subtitle2" className="">Secure shipping</Typography>
                                    </Stack>
                                    <Typography variant="overline" className="lineHeight25" sx={{ fontWeight: "400" }}>Details including carrier, tracking code and ETA will be sent via separate email once payment has cleared. Follow the progress of your shipment in real time by clicking on the link in the email.</Typography>
                                    <Link variant="overline" className="lineHeight25">https://queenslandmint.com/secure-shipping</Link>
                                </Box>
                                <Box className="Card PaymentCard">
                                    <Stack className='IconTitleWrapper'>
                                        <Icon><AddToCartIcon /></Icon>
                                        <Typography variant="subtitle2" className="">Secure shipping</Typography>
                                    </Stack>
                                    <Typography variant="overline" className="lineHeight25" sx={{ fontWeight: "400" }}>Bank transfer payments are free and required <br />within 24 hours of order Commonwealth Bank <br />
                                        Account Name: <Typography
                                            variant="overline" className="lineHeight25">Queenslandmint</Typography><br />
                                        BSB: <Typography
                                            variant="overline" className="lineHeight25">000-000</Typography><br />
                                        Account: <Typography
                                            variant="overline" className="lineHeight25">12345 67890 123456
                                        </Typography></Typography>
                                    <Link variant="overline" className="lineHeight25">https://queenslandmint.com/payment</Link>
                                </Box>
                                <Box className="Card SellingCard">
                                    <Stack className='IconTitleWrapper'>
                                        <Icon><AddToCartIcon /></Icon>
                                        <Typography variant="subtitle2" className="">Secure shipping</Typography>
                                    </Stack>
                                    <Typography variant="overline" className="lineHeight25" sx={{ fontWeight: "400" }}>Details including carrier, tracking code and
                                        ETA will be sent via separate email once payment has cleared. Follow the progress of your shipment in real time by clicking on the link in the email.</Typography>
                                    <Link variant="overline" className="lineHeight25">https://queenslandmint.com/secure-shipping</Link>
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </>
        </Layout>
    )
}

export default orderDetails