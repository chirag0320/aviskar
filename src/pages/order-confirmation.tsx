import React, { Fragment, useEffect } from "react"
import Seo from "../components/common/Seo"
import Layout from "@/components/common/Layout";
import { Box, Stack, Container, Typography, Icon, Button, TableContainer, Table, TableHead, TableCell, TableRow, TableBody } from "@mui/material"
import GreenConfirmationIcon from "@/assets/icons/GreenConfirmationIcon";
import LogoGoldCoin from "@/assets/logos/LogoGoldCoin.png";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { getOrderConfirmationDetails } from "@/redux/reducers/orderConfirmationDetails";
import { ENDPOINTS } from "@/utils/constants";
import { useAppSelector } from "@/hooks";
import { rows } from "./order-details";
import { navigate } from "gatsby";
import Loader from "@/components/common/Loader";

function OrderConfirmation(props: any) {
    const checkLoadingStatus = useAppSelector(state => state.orderConfirmationDetails.loading);
    // const orderId = props.location?.search?.split('=')[1];
    const orderConfirmationDetails = useAppSelector(state => state.orderConfirmationDetails);
    useAPIoneTime({
        service: getOrderConfirmationDetails,
        endPoint: ENDPOINTS.orderConfimationDetails + new URLSearchParams(location.search).get("id")
    })
    return (
        <Layout>
            <>
                <Loader open={checkLoadingStatus} />
                <Seo
                    keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
                    title="Home"
                    lang="en"
                />
                <Box id="OrderConfirmation" className="OrderConfirmationPage" component="section">
                    <Container>
                        <Stack className="OrderReceivedMessageWrapper">
                            <Icon className='GreenConfirmationIcon'><GreenConfirmationIcon /></Icon>
                            <Typography variant="subtitle2" className="OrderReceivedMessage">Your order has been received.</Typography>
                        </Stack>
                        <Box className="DetailsWrapper">
                            <Box className="ThankyouWrapper">
                                <Typography className="ThankyouText">Thank you for choosing Queensland Mint</Typography>
                                <Typography variant="subtitle2" className="OrderID">Your order id is: {orderConfirmationDetails.orderNumber}</Typography>
                                <Typography variant="body1">You will receive an order confirmation email with details of your order and a link to track its progress.</Typography>
                            </Box>
                            <Box className="OrderDetailsWrapper">
                                <Stack className="TitleValueWrapper">
                                    <Typography variant="body1" className="Title">Order No.</Typography>
                                    <Button variant="text" onClick={() => navigate(`/order-details/?orderNo=${orderConfirmationDetails?.orderNumber}`)}>{orderConfirmationDetails?.orderNumber}</Button>
                                </Stack>
                                <Stack className="TitleValueWrapper">
                                    <Typography variant="body1" className="Title">Transaction Date and Time</Typography>
                                    <Typography variant="subtitle1">{orderConfirmationDetails.orderTime}, {orderConfirmationDetails.orderDate}</Typography>
                                </Stack>
                                <Box className="TitleValueWrapper Orders">
                                    <Typography variant="body1" className="Title">Orders:-</Typography>
                                    {/* <Stack className="LogoWrapper">
                                        <img src={LogoGoldCoin} alt="Logo" />
                                        <Box sx={{ padding: "6px 0" }}>
                                            <Typography variant="subtitle1">2024 1oz Lunar Series III</Typography>
                                            <Typography>$204.22</Typography>
                                        </Box>
                                    </Stack> */}
                                    <TableContainer
                                        className="OrderDetailTableWrapper"
                                        sx={{}}
                                    // component={Paper}
                                    >
                                        <Table className="OrderDetailTable" sx={{ minWidth: 650 }} aria-label="Orders details table">
                                            <TableHead>
                                                <TableRow className="OrderDetailsHeadRow">
                                                    <TableCell sx={{ minWidth: "600px" }}>Name</TableCell>
                                                    <TableCell sx={{ minWidth: "200px" }}>Price</TableCell>
                                                    <TableCell sx={{ minWidth: "150px" }}>Quantity</TableCell>
                                                    <TableCell sx={{ minWidth: "200px" }}>Total</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {orderConfirmationDetails?.orderItems?.map((row) => (
                                                    <TableRow
                                                        key={row.productId}
                                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            <img className="ProductImage"
                                                                src={row.imageUrl} alt="Product image" loading="lazy"></img>
                                                            {row.productName}
                                                        </TableCell>
                                                        <TableCell>{row.unitPrice}</TableCell>
                                                        <TableCell>{row.quantity}</TableCell>
                                                        <TableCell>{row.subTotal}</TableCell>
                                                    </TableRow>

                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                                <Stack className="TitleValueWrapper PaymentAmountWrapper">
                                    <Typography variant="body1" className="Title">Payment Amount</Typography>
                                    <Typography variant="subtitle1">${orderConfirmationDetails.totalPaymentAmount}</Typography>
                                </Stack>
                            </Box>
                            <Box className="BottomContentWrapper">
                                <Typography variant="body1">An email has been sent with your order details and payment instructions.You can also download or view on the following links: <Button variant="text">
                                    Download (download pdf)</Button></Typography>
                                <Typography variant="body1"><Button variant="text">View Online</Button> Copies of historical orders can also be viewed and downloaded from your <Button variant="text">Account History</Button></Typography>
                            </Box>
                        </Box>
                        <Button className='ContinueBtn' size='large' variant="contained" onClick={() => {
                            navigate("/");
                        }}>Continue</Button>
                    </Container>
                </Box>
            </>
        </Layout>
    )
}

export default OrderConfirmation