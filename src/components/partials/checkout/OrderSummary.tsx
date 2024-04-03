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
import { hasFulfilled, roundOfThePrice, shipmentTypeToEnum } from "@/utils/common"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { checkValidationOnConfirmOrder, disableOTP, getCraditCardCharges, getInsuranceAndTaxDetailsCalculation, placeOrder, setCheckoutItemWarning } from "@/redux/reducers/checkoutReducer"
import { ENDPOINTS } from "@/utils/constants"
import useDeviceDetails from "@/hooks/useDeviceDetails"
import { navigate } from "gatsby"
import { setCartItemWarning, updateShoppingCartData } from "@/redux/reducers/shoppingCartReducer"
import useShowToaster from "@/hooks/useShowToaster"

export interface PlaceOrderBody {
  OrderCustomerID: number;
  BillingAddressId: number;
  ShippingAddressId: number;
  OrderItems: OrderItem[];
  PaymentMethod: number;
  ShippingMethod: number;
  IsDifferentShippingMethod: boolean;
  IsUsedRewardPoints: boolean;
  AgentId: string;
  Location: string;
  Device: string;
  Browser: string;
  IsInstantBuy: boolean;
}

interface OrderItem {
  ShoppingCartId: number;
  ProductId: number;
  ParentProductId: number;
  Quantity: number;
  ShippingMethod: number;
}


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
  const { showToaster } = useShowToaster();
  const { deviceInfo, locationInfo }: any = useDeviceDetails()
  const { finalDataForTheCheckout, subTotal, insuranceAndTaxCalculation, craditCardCharges, isOTPEnabled, loading, orderId } = useAppSelector((state) => state.checkoutPage)
  const [body, setBody] = useState<Body | null>(null)
  const [totalValueNeedToPayFromCraditCart, setTotalValueNeedToPayFromCraditCart] = useState<any>({ OrderTotal: 0 })
  const [openOTPConfirmation, toggleOTPConfirmation] = useToggle(false)

  useAPIoneTime({ service: getInsuranceAndTaxDetailsCalculation, endPoint: ENDPOINTS.calculateInsuranceAndTaxDetails, body })
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
  useEffect(() => {
    if (finalDataForTheCheckout?.paymentType === "CreditCard") {
      dispatch(getCraditCardCharges({
        url: ENDPOINTS.calculateCraditCardCharges, body: {
          "OrderTotal": Number(insuranceAndTaxCalculation?.secureShippingFeeIncludingTax) + Number(insuranceAndTaxCalculation?.vaultStorageFee) + Number(subTotal)
        }
      }))
    }
  }, [subTotal, finalDataForTheCheckout, insuranceAndTaxCalculation])
  useEffect(() => {
    if (isOTPEnabled) {
      toggleOTPConfirmation()
    }
    else if (isOTPEnabled === false) {
      const placeOrderFun = async () => {
        // call place order API
        const prepareBodyData: PlaceOrderBody = {
          "OrderCustomerID": finalDataForTheCheckout?.userAccount?.customerId,
          "BillingAddressId": finalDataForTheCheckout?.billingAddress?.addressId,
          "ShippingAddressId": finalDataForTheCheckout?.shippingAddress?.addressId,
          "OrderItems": finalDataForTheCheckout?.cartItemsWithLivePrice?.map((item: any) => {
            return ({
              "ShoppingCartId": item.id,
              "ProductId": item.productId,
              "ParentProductId": item?.parentProductId,
              "Quantity": finalDataForTheCheckout?.quantitiesWithProductId[item.productId],
              "ShippingMethod": shipmentTypeToEnum[finalDataForTheCheckout?.deliveryMethodsWithProductId[item.productId]]
            })
          }),
          "PaymentMethod": paymentMethodEnum[finalDataForTheCheckout?.paymentType],
          "ShippingMethod": shipmentTypeToEnum[finalDataForTheCheckout?.parentDeliveryMethod || 'LocalShipping'],
          "IsDifferentShippingMethod": finalDataForTheCheckout?.IsDifferentShippingMethod,
          "IsUsedRewardPoints": false,
          "AgentId": "",
          "Location": 'lat' + locationInfo?.latitude + ',' + 'long' + locationInfo?.longitude,
          "Device": deviceInfo?.platform!,
          "Browser": deviceInfo?.userAgent,
          "IsInstantBuy": false
        }
        const data = await dispatch(placeOrder({ url: ENDPOINTS.placeOrder, body: prepareBodyData }) as any);
        if (hasFulfilled(data?.type)) {
          const id = data?.payload?.data?.data
          navigate(`/order-confirmation/?id=${id}`)
        }
      }
      placeOrderFun();
      dispatch(disableOTP())
    }
  }, [isOTPEnabled])
  const renderPricingItem = (title: string, value: string) => {
    return (
      <Stack className="PricingItem">
        <Typography variant="titleLarge">{title}</Typography>
        <Typography>{value}</Typography>
      </Stack>
    )
  }

  const onConfirmOrderHandler = async () => {
    const itemsWithQuantity = finalDataForTheCheckout?.cartItemsWithLivePrice?.map((item: any) => {
      return ({
        id: item.id,
        quantity: finalDataForTheCheckout?.quantitiesWithProductId[item.productId]
      })
    })

    const response = await dispatch(updateShoppingCartData({ url: ENDPOINTS.updateShoppingCartData, body: itemsWithQuantity }) as any);

    if (hasFulfilled(response.type)) {
      if (!response?.payload?.data?.data || response?.payload?.data?.data?.length === 0) {
        // showToaster({ message: "Cart updated", severity: 'success' })
        await dispatch(checkValidationOnConfirmOrder({
          url: ENDPOINTS.checkValidationOnConfirmOrder, body: {
            PaymentMethodEnum: paymentMethodEnum[finalDataForTheCheckout?.paymentType],
            OrderTotal: Number(insuranceAndTaxCalculation?.secureShippingFeeIncludingTax) + Number(subTotal) + Number(insuranceAndTaxCalculation?.vaultStorageFeeIncludingTax),
            // static todo
            IsRewardPointUsed: false,
            UsedRewardPoints: 0,
            UsedRewardPointAmount: 0.00
          }
        }))
      }
      else {
        dispatch(setCheckoutItemWarning({ warnings: response?.payload?.data?.data, quantities: finalDataForTheCheckout?.quantitiesWithProductId }));
        showToaster({ message: "Cannot Place order as Some items have warnings", severity: 'warning' })
      }
    }
    else {
      showToaster({ message: "Update cart failed", severity: 'error' })
    }
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
        {renderPricingItem("Secure Shipping", `$${roundOfThePrice(Number(insuranceAndTaxCalculation?.secureShippingFeeIncludingTax))}`)}
        {renderPricingItem("Vault storage", `$${roundOfThePrice(Number(insuranceAndTaxCalculation?.vaultStorageFeeIncludingTax))}`)}
        <Divider />
        {finalDataForTheCheckout?.paymentType === 'CreditCard' && renderPricingItem("Credit Card Fees", roundOfThePrice(Number(craditCardCharges?.creditCardFeeIncludingTax)))}
        {finalDataForTheCheckout?.paymentType === 'CreditCard' && < Divider />}
        {renderPricingItem("GST Included", `$${roundOfThePrice(Number(insuranceAndTaxCalculation?.secureShippingTax) + Number(insuranceAndTaxCalculation?.vaultStorageTax) + Number(finalDataForTheCheckout?.cartItemsWithLivePrice?.length > 0 ? finalDataForTheCheckout?.cartItemsWithLivePrice?.reduce((total: number, product: {
          LivePriceDetails: { taxPrice: number }
        }) => total + product?.LivePriceDetails?.taxPrice, 0) : 0))}`)}
        <Stack className="PricingItem TotalItem">
          <Typography variant="subtitle1">Total</Typography>
          <Typography variant="subtitle1">${roundOfThePrice(Number(insuranceAndTaxCalculation?.secureShippingFeeIncludingTax) + Number(subTotal) + Number(insuranceAndTaxCalculation?.vaultStorageFeeIncludingTax))}</Typography>
        </Stack>
        <Stack className="PaymentMethod">
          <OutlinedCheckIcon />
          <Typography className="Message" variant="titleLarge" component="p">Payment Method: <Typography variant="inherit" component="span">{finalDataForTheCheckout?.paymentType}</Typography></Typography>
        </Stack>
        <Divider className="ActionDivider" />
        <Stack className="ActionWrapper">
          <Button color="secondary" onClick={() => navigate("/")}>Continue Shopping</Button>
          {/* <Button variant="contained" onClick={toggleOTPConfirmation} disabled={!finalDataForTheCheckout?.termAndServiceIsRead}>Confirm Order</Button> */}
          <Button variant="contained" onClick={onConfirmOrderHandler} disabled={!finalDataForTheCheckout?.termAndServiceIsRead || loading || finalDataForTheCheckout?.cartItemsWithLivePrice?.length < 1}>Confirm Order</Button>
        </Stack>
      </Box>
      <OTPConfirmation open={openOTPConfirmation} onClose={toggleOTPConfirmation} />
    </StepWrapper>
  )
}

export default OrderSummary