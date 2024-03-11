import React from "react"
import Seo from "../components/common/Seo"
import Layout from "@/components/common/Layout";
import { Box, Stack, Container, Typography, Icon, Button } from "@mui/material"
import GreenConfirmationIcon from "@/assets/icons/GreenConfirmationIcon";
import LogoGoldCoin from "@/assets/logos/LogoGoldCoin.png";

function OrderConfirmation() {
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
                                <Typography variant="subtitle2" className="OrderID">Your order # is: 872608526</Typography>
                                <Typography variant="body1">You will receive an order confirmation email with details of your order and a link to track its progress.</Typography>
                            </Box>
                            <Box className="OrderDetailsWrapper">
                                <Stack className="TitleValueWrapper">
                                    <Typography variant="body1" className="Title">Order No.</Typography>
                                    <Typography variant="subtitle1">872608526</Typography>
                                </Stack>
                                <Stack className="TitleValueWrapper">
                                    <Typography variant="body1" className="Title">Transaction Date and Time</Typography>
                                    <Typography variant="subtitle1">872608526</Typography>
                                </Stack>
                                <Stack className="TitleValueWrapper Orders">
                                    <Typography variant="body1" className="Title">Orders</Typography>
                                    <Stack className="LogoWrapper">
                                        <img src={LogoGoldCoin} alt="Logo" />
                                        <Box sx={{ padding: "6px 0" }}>
                                            <Typography variant="subtitle1">2024 1oz Lunar Series III</Typography>
                                            <Typography>$204.22</Typography>
                                        </Box>
                                    </Stack>
                                </Stack>
                                <Stack className="TitleValueWrapper">
                                    <Typography variant="body1" className="Title">Quantity</Typography>
                                    <Typography variant="subtitle1">1</Typography>
                                </Stack>
                                <Stack className="TitleValueWrapper PaymentAmountWrapper">
                                    <Typography variant="body1" className="Title">Payment Amount</Typography>
                                    <Typography variant="subtitle1">$321.00</Typography>
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