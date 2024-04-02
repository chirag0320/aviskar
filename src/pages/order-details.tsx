import * as React from "react";
import Seo from "../components/common/Seo"
import Layout from "@/components/common/Layout";
import {
    Box, Link, Container, Typography, Button, Stack, Icon, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
} from "@mui/material"
import { AddToCartIcon, PdfIcon } from '@/assets/icons';
import StatusImage from '../assets/images/StatusImage.png';
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { ENDPOINTS } from "@/utils/constants";
import { getOrderHistoryDetailData } from "@/redux/reducers/orderDetailsReducer";
import { useAppSelector } from "@/hooks";

export function createData(
    Name: string,
    Price: string,
    Quantity: string,
    Total: string,
) {
    return { Name, Price, Quantity, Total };
}

export const rows = [
    createData(
        "Test Accounting Product",
        "$38.39",
        "1",
        "$38.39",
    ),
    createData(
        "2024 1oz Lunar Series III Year of the Dragon Silver Coin",
        "$38.39",
        "1",
        "$38.39",
    ),
    createData(
        "100g Queensland Mint Kangaroo Gold Cast Bar",
        "$38.39",
        "1",
        "$38.39",
    ),
    createData(
        "2024 1oz Lunar Series III Year of the Dragon Silver Coin",
        "$38.39",
        "1",
        "$38.39",
    ),
    createData(
        "100g Queensland Mint Kangaroo Gold Cast Bar",
        "$38.39",
        "1",
        "$38.39",
    ),
];

function orderDetails() {
    useAPIoneTime({ service: getOrderHistoryDetailData, endPoint: ENDPOINTS.getOrderHistoryDetail })
    const orderHistoryDetailData = useAppSelector(state => state.orderDetails.orderHistoryDetailData)
    console.log("🚀 ~ orderHistoryDetail:", orderHistoryDetailData)

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
                            <img src={StatusImage} className="StatusImage" alt="StatusImage" />
                            <Box className="OrderDetailsWrapper">
                                <Box className='PDFBtnWrapper'>
                                    <Button sx={{ gap: "12px" }} className='PDFInvoiceBtn' size='large' variant="contained"><Icon className='PdfIcon'><PdfIcon /></Icon>PDF invoice</Button>
                                </Box>
                                <Typography variant="subtitle2" className="OrderID">Order : {orderHistoryDetailData?.orderId}</Typography>
                                <Stack className="OrderDetails">
                                    <Box className="OrderDateWrapper">
                                        <Typography variant="body1">Order Date</Typography>
                                        <Typography variant="subtitle1" className="Font16">{orderHistoryDetailData?.orderDate}</Typography>
                                    </Box>
                                    <Box className="OrderTimeWrapper">
                                        <Typography variant="body1">Order Time</Typography>
                                        <Typography variant="subtitle1" className="Font16">{orderHistoryDetailData?.orderTime}</Typography>
                                    </Box>
                                    <Box className="OrderNumberWrapper">
                                        <Typography variant="body1">Order Number</Typography>
                                        <Typography variant="subtitle1" className="Font16">{orderHistoryDetailData?.customOrderNumber}</Typography>
                                    </Box>
                                    <Box className="OrderStatusWrapper">
                                        <Typography variant="body1">Order Status</Typography>
                                        <Stack sx={{ gap: "10px" }} className="ButtonsWrapper">
                                            <Button variant="contained" size="small" className="RedButton">{orderHistoryDetailData?.orderStatus}</Button>
                                            {/* <Button variant="contained" size="small" className="RedButton">Approved Cancellation</Button> */}
                                        </Stack>

                                    </Box>
                                    <Box className="PaymentWrapper">
                                        <Typography variant="body1">Payment</Typography>
                                        <Typography variant="subtitle1" className="Font16">{orderHistoryDetailData?.paymentMethod}</Typography>
                                    </Box>
                                    <Box className="DeliveryWrapper">
                                        <Typography variant="body1">Delivery</Typography>
                                        <Typography variant="subtitle1" className="Font16">{orderHistoryDetailData?.shippingMethod}</Typography>
                                    </Box>
                                </Stack>
                            </Box>

                            <Box className="AddressWrapper">
                                <Box className="BillingWrapper">
                                    <Typography variant="subtitle1" className="AddressTitle">Billing Address</Typography>
                                    {orderHistoryDetailData?.addresses[0]?.firstName && <Typography variant="subtitle1" className="CommonBottomMargin Font16">{orderHistoryDetailData?.addresses[0]?.firstName + orderHistoryDetailData?.addresses[0]?.lastName}</Typography>}
                                    <Stack sx={{ gap: "10px", alignItems: "center" }} className="CommonBottomMargin">
                                        <Typography variant="body1">Email: </Typography><Typography variant="subtitle1" className='Font16'>{orderHistoryDetailData?.addresses[0]?.email}</Typography>
                                    </Stack>
                                    <Stack sx={{ gap: "10px", alignItems: "center" }} className="CommonBottomMargin">
                                        <Typography variant="body1">Phone </Typography><Typography variant="subtitle1" className='Font16'> : {orderHistoryDetailData?.addresses[0]?.phoneNumber}</Typography>
                                    </Stack>
                                    <Typography variant="body1" className="CommonBottomMargin">{orderHistoryDetailData?.addresses[0]?.addressLine1 + "," + orderHistoryDetailData?.addresses[0]?.addressLine2 + "," + orderHistoryDetailData?.addresses[0]?.city + "," + orderHistoryDetailData?.addresses[0]?.postcode + "," + orderHistoryDetailData?.addresses[0]?.stateName + "," + orderHistoryDetailData?.addresses[0]?.countryName}</Typography>
                                    {/* <Stack sx={{ gap: "10px", alignItems: "center" }}   >
                                        <Typography variant="body1">Account Type: </Typography><Typography variant="subtitle1" className='Font16'>Individual</Typography>
                                    </Stack> */}
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

                            {/* <Box className="OrderDetailTableWrapper"> */}
                            <TableContainer
                                className="OrderDetailTableWrapper"
                                sx={{}}
                            // component={Paper}
                            >
                                <Table className="OrderDetailTable" sx={{ minWidth: 650 }} aria-label="Orders details table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ minWidth: "600px" }}>Name</TableCell>
                                            <TableCell sx={{ minWidth: "200px" }}>Price</TableCell>
                                            <TableCell sx={{ minWidth: "156px" }}>Quantity</TableCell>
                                            <TableCell sx={{ minWidth: "200px" }}>Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orderHistoryDetailData?.orderItems?.map((row) => (
                                            <TableRow
                                                key={row.productId}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.productName}
                                                </TableCell>
                                                <TableCell>{row.productPrice}</TableCell>
                                                <TableCell>{row.quantity}</TableCell>
                                                <TableCell>{row.total}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {/* </Box> */}

                            <Stack className='TotalShippingDetailsWrapper'>
                                <Stack className='SubtotalShippingWrapper'>
                                    <Box className="Subtotal">
                                        <Typography variant="body1" sx={{ marginBottom: "2px" }}>Subtotal</Typography>
                                        <Typography variant="subtitle1"   >${orderHistoryDetailData?.orderShippingInclTax}</Typography>
                                    </Box>
                                    <Box className="SecureShipping">
                                        <Typography variant="body1" sx={{ marginBottom: "2px" }}>Secure Shipping</Typography>
                                        <Typography variant="subtitle1"   >${orderHistoryDetailData?.orderShippingInclTax}</Typography>
                                    </Box>
                                </Stack>
                                <Box className="TotalWrapper">
                                    <Typography variant="body1">Total</Typography>
                                    <Typography variant="subtitle2" className="TotalValue">${orderHistoryDetailData?.orderTotal}</Typography>
                                    <Stack sx={{ gap: "12px" }}>
                                        <Typography variant="overline">GST Included:</Typography>
                                        <Typography variant="overline">$ 819.30</Typography>
                                    </Stack>
                                </Box>
                            </Stack>
                            <Box component="div" dangerouslySetInnerHTML={{
                                __html: orderHistoryDetailData?.evaInvoiceManagerValues["evainvoicemanagersettings.CongratulationMessage"] || ""
                            }} className="keyPoints">
                                {/* <Typography variant = "body1" className = "KeyPoints">Congratulations on your decision to buy precious metals and thank you for choosing Queensland Mint.As a reminder here are some key points to note: 1) You have made a purchase based on live prices that update every €0 seconds. 2) Your order has been locked and price fixed at a specific time stamp. 3) Your order constitutes a legally binding contract. 4) You cannot change or cancel an order, 5) Payment must be made within 24 hours (weekends and public holidays excluded). 6) Failure to pay is a breach of contract. 7) Our remedies include repricing, liquidation of your metal, administration fees, market loss assignment and legal cost recovery. For the full terms and conditions to which you have agreed please refer to https://brisbanebullion.com.au/terms-of-service. 8) Any payment made in respect of this invoice must be made by the person(s) and/or entity to whom it is addressed. Please refer to https://brisbanebullion.com.au/payment to learn more. Once again, thank you for choosing Queensland Mint.</Typography> */}
                            </Box>
                            <Box className="CardsWrapper">
                                <Box className="Card SecureShippingCard">
                                    <Stack className='IconTitleWrapper'>
                                        <Icon className="AddToCartIcon"><AddToCartIcon /></Icon>
                                        <Typography variant="subtitle2">Secure shipping</Typography>
                                    </Stack>
                                    <Typography variant="overline" className="lineHeight25" sx={{ fontWeight: "400" }}>Details including carrier, tracking code and ETA will be sent via separate email once payment has cleared. Follow the progress of your shipment in real time by clicking on the link in the email.</Typography>
                                    <Link variant="overline" className="lineHeight25">https://queenslandmint.com/secure-shipping</Link>
                                </Box>
                                <Box className="Card PaymentCard">
                                    <Stack className='IconTitleWrapper'>
                                        <Icon><AddToCartIcon /></Icon>
                                        <Typography variant="subtitle2">Secure shipping</Typography>
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
                                        <Typography variant="subtitle2">Secure shipping</Typography>
                                    </Stack>
                                    <Typography variant="overline" className="lineHeight25" sx={{ fontWeight: "400" }}>Details including carrier, tracking code and
                                        ETA will be sent via separate email once payment has cleared. Follow the progress of your shipment in real time by clicking on the link in the email.</Typography>
                                    <Link variant="overline" className="lineHeight25">https://queenslandmint.com/secure-shipping</Link>
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </Box >
            </>
        </Layout >
    )
}

export default orderDetails