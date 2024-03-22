import React from "react"
import { Typography, Button, Divider, Stack, Box } from "@mui/material"

// Hooks
import { useAppSelector, useToggle } from "@/hooks"

// Componenets
import StepWrapper from "./StepWrapper"

// Data
import { productImages } from "@/utils/data"
import { CartCardAbstract } from "@/components/common/Card"
import { OutlinedCheckIcon } from "@/assets/icons"
import OTPConfirmation from "./OTPConfirmation"
import { roundOfThePrice } from "@/utils/common"

function OrderSummary() {
  const { finalDataForTheCheckout,subTotal} = useAppSelector((state) => state.checkoutPage)
  console.log("🚀 ~ OrderSummary ~ finalDataForTheCheckout:", finalDataForTheCheckout)
  const [openOTPConfirmation, toggleOTPConfirmation] = useToggle(false)
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
        {finalDataForTheCheckout?.cartItemsWithLivePrice?.length > 0 && finalDataForTheCheckout?.cartItemsWithLivePrice?.map((product:any) => {
          return (
            <CartCardAbstract product={product} quantity={finalDataForTheCheckout?.quantitiesWithProductId?.[product?.productId]} deliveryMethod={finalDataForTheCheckout?.deliveryMethodsWithProductId?.[product?.productId]}/>
          )
        })}
      </Box>
      <Box className="PricingDetails">
        {renderPricingItem("Subtotal",roundOfThePrice(subTotal as any) as any )}
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
          <Typography className="Message" variant="titleLarge" component="p">Payment Method: <Typography variant="inherit" component="span">{finalDataForTheCheckout?.paymentType}</Typography></Typography>
        </Stack>
        <Divider className="ActionDivider" />
        <Stack className="ActionWrapper">
          <Button color="secondary">Continue Shopping</Button>
          <Button variant="contained" onClick={toggleOTPConfirmation} disabled={!finalDataForTheCheckout?.termAndServiceIsRead}>Confirm Order</Button>
        </Stack>
      </Box>
      <OTPConfirmation open={openOTPConfirmation} onClose={toggleOTPConfirmation} />
    </StepWrapper>
  )
}

export default OrderSummary