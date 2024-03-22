import React, { useEffect, useState } from "react"
import { Typography, Button, Divider, Stack, Box } from "@mui/material"

// Hooks
import { useAppDispatch, useAppSelector, useToggle } from "@/hooks"

// Componenets
import StepWrapper from "./StepWrapper"

// Data
import { productImages } from "@/utils/data"
import { CartCardAbstract } from "@/components/common/Card"
import { OutlinedCheckIcon } from "@/assets/icons"
import OTPConfirmation from "./OTPConfirmation"
import { roundOfThePrice, shipmentTypeToEnum } from "@/utils/common"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { checkValidationOnConfirmOrder, getCraditCardCharges, getInsuranceAndTaxDetailsCalculation } from "@/redux/reducers/checkoutReducer"
import { ENDPOINTS } from "@/utils/constants"
interface Product {
  productId: number;
  qty: number;
  price: number;
  shippingMethod: number;
  LivePriceDetails?: any;
}

// enum PaymentMethod{
//   CreditCard = 3,
//   BankTransfer = 2,
//   Cash = 1
// }

const paymentMethodEnum: { [key: string]: number } = {
  "CreditCard": 3,
  "BankTransfer": 2,
  "Cash": 1
}

interface Body {
  products: Product[];
  Postcode: string;
  CountryId: number;
}

function OrderSummary() {
  const dispatch = useAppDispatch()
  const { finalDataForTheCheckout, subTotal, insuranceAndTaxCalculation, craditCardCharges } = useAppSelector((state) => state.checkoutPage)
  console.log("🚀 ~ OrderSummary ~ finalDataForTheCheckout:", finalDataForTheCheckout)
  const [body, setBody] = useState<Body | null>(null)
  const [totalValueNeedToPayFromCraditCart, setTotalValueNeedToPayFromCraditCart] = useState<any>({ OrderTotal: 0 })
  useEffect(() => {
    setBody({
      Postcode: finalDataForTheCheckout?.shippingAddress?.postcode?.toString(),
      CountryId: finalDataForTheCheckout?.shippingAddress?.country,
      products: finalDataForTheCheckout?.cartItemsWithLivePrice?.map((item: Product) => {
        return ({
          productId: item.productId,
          qty: finalDataForTheCheckout?.quantitiesWithProductId?.[item?.productId],
          price: item?.LivePriceDetails?.price,
          shippingMethod: shipmentTypeToEnum[finalDataForTheCheckout?.deliveryMethodsWithProductId?.[item?.productId]]
        })
      })
    })
  }, [finalDataForTheCheckout])
  useAPIoneTime({ service: getInsuranceAndTaxDetailsCalculation, endPoint: ENDPOINTS.calculateInsuranceAndTaxDetails, body })
  useEffect(() => {
    if (finalDataForTheCheckout?.paymentType === "CreditCard") {
      dispatch(getCraditCardCharges({
        url: ENDPOINTS.calculateCraditCardCharges, body: {
          "OrderTotal": Number(insuranceAndTaxCalculation?.secureShippingFeeIncludingTax) + Number(insuranceAndTaxCalculation?.vaultStorageFee) + Number(subTotal)
        }
      }))
    }
  }, [subTotal, finalDataForTheCheckout, insuranceAndTaxCalculation])
  const [openOTPConfirmation, toggleOTPConfirmation] = useToggle(false)
  const renderPricingItem = (title: string, value: string) => {
    return (
      <Stack className="PricingItem">
        <Typography variant="titleLarge">{title}</Typography>
        <Typography>{value}</Typography>
      </Stack>
    )
  }

  const onConfirmOrderHandler = () => {
    dispatch(checkValidationOnConfirmOrder({
      url: ENDPOINTS.checkValidationOnConfirmOrder, body: {
        PaymentMethodEnum: paymentMethodEnum[finalDataForTheCheckout?.paymentType],
        OrderTotal: Number(insuranceAndTaxCalculation?.secureShippingFeeIncludingTax) + Number(subTotal) + Number(insuranceAndTaxCalculation?.vaultStorageFeeIncludingTax),
        // static
        IsRewardPointUsed: false,
        UsedRewardPoints: 0,
        UsedRewardPointAmount: 0.00
      }
    }))
  }

  return (
    <StepWrapper title="Order Summary" className="OrderSummary">
      <Box className="ProductList">
        {finalDataForTheCheckout?.cartItemsWithLivePrice?.length > 0 && finalDataForTheCheckout?.cartItemsWithLivePrice?.map((product: any) => {
          return (
            <CartCardAbstract product={product} quantity={finalDataForTheCheckout?.quantitiesWithProductId?.[product?.productId]} deliveryMethod={finalDataForTheCheckout?.deliveryMethodsWithProductId?.[product?.productId]} />
          )
        })}
      </Box>
      <Box className="PricingDetails">
        {renderPricingItem("Subtotal", '$' + roundOfThePrice(subTotal as any) as any)}
        <Divider />
        {renderPricingItem("Secure Shipping", `$${insuranceAndTaxCalculation?.secureShippingFeeIncludingTax}`)}
        {renderPricingItem("Vault storage", `$${insuranceAndTaxCalculation?.vaultStorageFeeIncludingTax}`)}
        <Divider />
        {finalDataForTheCheckout?.paymentType === 'CreditCard' && renderPricingItem("Credit Card Fees", craditCardCharges?.creditCardFeeIncludingTax)}
        {finalDataForTheCheckout?.paymentType === 'CreditCard' && < Divider />}
        {renderPricingItem("GST Included", `$${roundOfThePrice(Number(insuranceAndTaxCalculation?.secureShippingTax) + Number(insuranceAndTaxCalculation?.vaultStorageTax) + Number(finalDataForTheCheckout?.cartItemsWithLivePrice?.reduce((total: number, product: {
          LivePriceDetails: { taxPrice: number }
        }) => total + product.LivePriceDetails.taxPrice, 0)))}`)}
        <Stack className="PricingItem TotalItem">
          <Typography variant="subtitle1">Total</Typography>
          <Typography variant="subtitle1">${Number(insuranceAndTaxCalculation?.secureShippingFeeIncludingTax) + Number(subTotal) + Number(insuranceAndTaxCalculation?.vaultStorageFeeIncludingTax)}</Typography>
        </Stack>
        <Stack className="PaymentMethod">
          <OutlinedCheckIcon />
          <Typography className="Message" variant="titleLarge" component="p">Payment Method: <Typography variant="inherit" component="span">{finalDataForTheCheckout?.paymentType}</Typography></Typography>
        </Stack>
        <Divider className="ActionDivider" />
        <Stack className="ActionWrapper">
          <Button color="secondary">Continue Shopping</Button>
          {/* <Button variant="contained" onClick={toggleOTPConfirmation} disabled={!finalDataForTheCheckout?.termAndServiceIsRead}>Confirm Order</Button> */}
          <Button variant="contained" onClick={onConfirmOrderHandler} disabled={!finalDataForTheCheckout?.termAndServiceIsRead}>Confirm Order</Button>
        </Stack>
      </Box>
      <OTPConfirmation open={openOTPConfirmation} onClose={toggleOTPConfirmation} />
    </StepWrapper>
  )
}

export default OrderSummary