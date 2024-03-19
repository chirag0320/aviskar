import React from "react"
import { Typography, Button, Divider, Stack, Box } from "@mui/material"

// Componenets
import StepWrapper from "./StepWrapper"

// Data
import { productImages } from "@/utils/data"
import { CartCardAbstract } from "@/components/common/Card"
import { OutlinedCheckIcon } from "@/assets/icons"

function OrderSummary() {
  const renderPricingItem = (title: string, value: string) => {
    return (
      <Stack className="PricingItem">
        <Typography variant="titleLarge">{title}</Typography>
        <Typography>{value}</Typography>
      </Stack>
    )
  }
  return (
    <StepWrapper title="Order Summary" className="OrderSummary">
      <Box className="ProductList">
        {productImages.map((product) => {
          return (
            <CartCardAbstract data={product} />
          )
        })}
      </Box>
      <Box className="PricingDetails">
        {renderPricingItem("Subtotal", "$8933.13")}
        <Divider />
        {renderPricingItem("Secure Shipping", "$120.22")}
        {renderPricingItem("Vault storage", "$90.22")}
        <Divider />
        {renderPricingItem("Credit Card Fees", "$81.27")}
        <Divider />
        {renderPricingItem("GST Included", "$819.30")}
        <Stack className="PricingItem TotalItem">
          <Typography variant="subtitle1">Total</Typography>
          <Typography variant="subtitle1">$9240.35</Typography>
        </Stack>
        <Stack className="PaymentMethod">
          <OutlinedCheckIcon />
          <Typography className="Message" variant="titleLarge" component="p">Payment Method: <Typography variant="inherit" component="span">Credit Card</Typography></Typography>
        </Stack>
        <Divider className="ActionDivider" />
        <Stack className="ActionWrapper">
          <Button color="secondary">Continue Shopping</Button>
          <Button variant="contained">Confirm Order</Button>
        </Stack>
      </Box>
    </StepWrapper>
  )
}

export default OrderSummary