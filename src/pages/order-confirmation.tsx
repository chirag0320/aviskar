import React, { Fragment, useEffect } from "react"
import Seo from "../components/common/Seo"
import Layout from "@/components/common/Layout";
import { Box, Stack, Container, Typography, Icon, Button } from "@mui/material"
import GreenConfirmationIcon from "@/assets/icons/GreenConfirmationIcon";
import LogoGoldCoin from "@/assets/logos/LogoGoldCoin.png";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { OrderItem, getOrderConfirmationDetails } from "@/redux/reducers/orderConfirmationDetails";
import { ENDPOINTS } from "@/utils/constants";
import { useAppSelector } from "@/hooks";

function OrderConfirmation(props: any) {
    const orderId = props.location?.search?.split('=')[1];
    const orderConfirmationDetails = useAppSelector(state => state.orderConfirmationDetails);
    useAPIoneTime({
        service: getOrderConfirmationDetails,
        endPoint: ENDPOINTS.orderConfimationDetails + orderId
    })
    return (
        <Layout>
            <>
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
                                <Typography variant="subtitle2" className="OrderID">Your order id is: {orderConfirmationDetails.orderId}</Typography>
                                <Typography variant="body1">You will receive an order confirmation email with details of your order and a link to track its progress.</Typography>
                            </Box>
                            <Box className="OrderDetailsWrapper">
                                <Stack className="TitleValueWrapper">
                                    <Typography variant="body1" className="Title">Order No.</Typography>
                                    <Typography variant="subtitle1">{orderConfirmationDetails.orderNumber}</Typography>
                                </Stack>
                                <Stack className="TitleValueWrapper">
                                    <Typography variant="body1" className="Title">Transaction Date and Time</Typography>
                                    <Typography variant="subtitle1">{orderConfirmationDetails.orderTime}, {orderConfirmationDetails.orderDate}</Typography>
                                </Stack>
                                <Stack className="TitleValueWrapper Orders">
                                    <Typography variant="body1" className="Title">Orders</Typography>
                                    <Stack className="LogoWrapper">

                                        {orderConfirmationDetails.orderItems.map((item: OrderItem, index: number) => (
                                            <Fragment key={item.productId}>
                                                <img src={item.imageUrl} alt="Logo" />
                                                <Box className="OrderItem">
                                                    <Typography variant="subtitle1">{item.productName}</Typography>
                                                    <Typography variant="subtitle1">{item.orderTotal}</Typography>
                                                </Box>
                                            </Fragment>
                                        ))}
                                    </Stack>
                                </Stack>
                                <Stack className="TitleValueWrapper">
                                    <Typography variant="body1" className="Title">Quantity</Typography>
                                    <Typography variant="subtitle1">1</Typography>
                                </Stack>
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
                        <Button className='ContinueBtn' size='large' variant="contained">Continue</Button>
                    </Container>
                </Box>
            </>
        </Layout>
    )
}

export default OrderConfirmation