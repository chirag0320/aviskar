import React from "react"
import Seo from "../components/common/Seo"
import Layout from "@/components/common/Layout";
import { Box, Stack, Container, Typography, Icon, Button, TableContainer, Table, TableHead, TableCell, TableRow, TableBody } from "@mui/material"
import GreenConfirmationIcon from "@/assets/icons/GreenConfirmationIcon";
import LogoGoldCoin from "@/assets/logos/LogoGoldCoin.png";
import { rows } from "./order-details";

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
                                                    <TableCell sx={{ minWidth: "60%" }}>Name</TableCell>
                                                    <TableCell sx={{ minWidth: "15%" }}>Price</TableCell>
                                                    <TableCell sx={{ minWidth: "10%" }}>Quantity</TableCell>
                                                    <TableCell sx={{ minWidth: "15%" }}>Total</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow
                                                        key={row.Name}
                                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            <img className="ProductImage" src="https://qmintstoremedia.blob.core.windows.net/pictures/products/1-2oz-dmcc-burj-khalifa-gold-coin_120320242303442.png?sv=2018-03-28&amp;sr=b&amp;sig=mW5OHZRZxVHSN%2BZjg50NIiiVpK25r%2BX9g31A1ti5oaE%3D&amp;st=2024-03-11T13%3A48%3A44Z&amp;se=3024-03-12T13%3A48%3A44Z&amp;sp=r&amp;c=638458481243003453" alt="Product image" loading="lazy"></img>
                                                            {row.Name}
                                                        </TableCell>
                                                        <TableCell>{row.Price}</TableCell>
                                                        <TableCell>{row.Quantity}</TableCell>
                                                        <TableCell>{row.Total}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
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