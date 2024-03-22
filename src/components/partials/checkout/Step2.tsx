import React, { useEffect, useState } from "react"
import { Box, Checkbox, FormControlLabel, IconButton, MenuItem, Select, Stack, Typography } from "@mui/material"

// Type
import type { SelectChangeEvent } from "@mui/material"

// Componenets
import StepWrapper from "./StepWrapper"
import { CartCard } from "@/components/common/Card"
import { InfoIcon, SelectDropdown } from "@/assets/icons"
import { HoverTooltip } from "@/components/common/CustomTooltip"
import { productImages } from "@/utils/data"
import { useAppDispatch, useAppSelector, useToggle } from "@/hooks"
import { resetSubTotalCheckoutPage, shopingCartItem, updateFinalDataForTheCheckout, updateSubTotalCheckoutPage } from "@/redux/reducers/checkoutReducer"
import { ENDPOINTS } from "@/utils/constants"
import useApiRequest from "@/hooks/useAPIRequest"
import { CartItemsWithLivePriceDetails } from "../shopping-cart/CartDetails"
import useDebounce from "@/hooks/useDebounce"

function Step2() {
  const dispatch = useAppDispatch()
  const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
  const { checkoutPageData, finalDataForTheCheckout } = useAppSelector((state) => state.checkoutPage)
  const [deliveryMethod, setDeliveryMethod] = useState<'LocalShipping' | 'VaultStorage' | 'SecureShipping'>('LocalShipping')
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})
  const [deliveryMethods, setDeliveryMethods] = useState<{ [key: number]: string }>({})
  const [productIds, setProductIds] = useState({})
  const { data: priceData, loading: priceLoading } = useApiRequest(ENDPOINTS.productPrices, 'post', productIds, 60);
  const [cartItemsWithLivePrice, setCartItemsWithLivePrice] = useState<CartItemsWithLivePriceDetails[]>([]);
  const changeInQuantities = useDebounce(quantities, 500)
  const [changeDiffrenceDeliveryMethods, toggleChangeDiffrenceDeliveryMethods] = useToggle(false)


  useEffect(() => {
    if (priceData?.data?.length > 0) {
      const idwithpriceObj: any = {}
      priceData?.data?.forEach((product: any) => idwithpriceObj[product?.productId] = product)

      let subTotal = 0;
      const cartItemsWithLivePrice = checkoutPageData?.shoppingCartItems.map((item: shopingCartItem) => {
        subTotal += (idwithpriceObj?.[item.productId]?.price * item.quantity)
        return {
          ...item,
          LivePriceDetails: idwithpriceObj[item.productId]
        }
      })
      dispatch(resetSubTotalCheckoutPage())
      dispatch(updateSubTotalCheckoutPage(subTotal))

      // const subTotal = cartItemsWithLivePrice.reduce((acc: number, item: CartItemsWithLivePriceDetails) => {
      //     return acc + (item.LivePriceDetails.price * item.quantity)
      // }, 0)

      setCartItemsWithLivePrice(cartItemsWithLivePrice!)
    }
  }, [priceData, checkoutPageData?.shoppingCartItems])
  useEffect(() => {
    if (priceData?.data?.length > 0 && cartItemsWithLivePrice?.length > 0) {
      const idwithpriceObj: any = {}
      priceData?.data?.forEach((product: any) => idwithpriceObj[product?.productId] = product)

      let subTotal = 0;
      cartItemsWithLivePrice?.map((item: shopingCartItem) => {
        subTotal += (idwithpriceObj?.[item.productId]?.price * quantities[item.productId])
      })
      dispatch(resetSubTotalCheckoutPage())
      dispatch(updateSubTotalCheckoutPage(subTotal))
    }
  }, [priceData, changeInQuantities, cartItemsWithLivePrice, checkoutPageData?.shoppingCartItems])

  useEffect(() => {
    if (checkoutPageData?.shoppingCartItems?.length! > 0) {
      const productIds = checkoutPageData?.shoppingCartItems.map((item: shopingCartItem) => item.productId);
      setProductIds({ productIds })
    }

    let quantities: any = {}
    let deliveryMethods: any = {}
    checkoutPageData?.shoppingCartItems?.forEach((item: shopingCartItem) => {
      quantities[item.productId] = item.quantity
      deliveryMethods[item.productId] = deliveryMethod
    })
    setQuantities(quantities)
    setDeliveryMethods(deliveryMethods)
    dispatch(updateFinalDataForTheCheckout({ quantitiesWithProductId: quantities, deliveryMethodsWithProductId: deliveryMethods }))
  }, [checkoutPageData?.shoppingCartItems, changeDiffrenceDeliveryMethods, deliveryMethod])

  useEffect(() => {
    dispatch(updateFinalDataForTheCheckout({ cartItemsWithLivePrice }))
  }, [cartItemsWithLivePrice])

  const handleDeliveryMethod = (event: SelectChangeEvent) => {
    setDeliveryMethod(event.target.value as any);
    const makeObject: any = { parentDeliveryMethod: event.target.value }
    let deliveryMethods: any = {}
    // if (changeDiffrenceDeliveryMethods) {
    checkoutPageData?.shoppingCartItems?.forEach((item: shopingCartItem) => {
      deliveryMethods[item.productId] = event.target.value
    })
    makeObject['deliveryMethodsWithProductId'] = deliveryMethods
    // } 
    // else {
    //   checkoutPageData?.shoppingCartItems?.forEach((item: shopingCartItem) => {
    //     deliveryMethods[item.productId] = 'SecureShipping'
    //   })
    //   makeObject['deliveryMethodsWithProductId'] = deliveryMethods
    // }
    dispatch(updateFinalDataForTheCheckout(makeObject))
  }

  const increaseQuantity = (productId: number) => {
    const productIdOfId = cartItemsWithLivePrice.find((item) => item.id === productId)
    const updatedQuantities = { ...quantities, [productIdOfId?.productId ?? productId]: quantities[productIdOfId?.productId ?? productId] + 1 }
    setQuantities(updatedQuantities)
    dispatch(updateFinalDataForTheCheckout({ quantitiesWithProductId: updatedQuantities }))
  }

  const decreaseQuantity = (productId: number) => {
    const productIdOfId = cartItemsWithLivePrice.find((item) => item.id === productId)

    if (quantities[productId] === 1) {
      // setCartItemsWithLivePrice(cartItemsWithLivePrice.filter((item: CartItemsWithLivePriceDetails) => item.productId !== productId));
    }
    else {
      const updatedQuantities = { ...quantities, [productIdOfId?.productId ?? productId]: quantities[productIdOfId?.productId ?? productId] - 1 }
      setQuantities(updatedQuantities)
      dispatch(updateFinalDataForTheCheckout({ quantitiesWithProductId: updatedQuantities }))
    }
  }

  const removeItemFromCart = (productId: number) => {
    const updatedCartItem = cartItemsWithLivePrice.filter((item: CartItemsWithLivePriceDetails) => item.productId !== productId)
    setCartItemsWithLivePrice(updatedCartItem);
    dispatch(updateFinalDataForTheCheckout({ cartItemsWithLivePrice: updatedCartItem }))
  }

  const changeDeliveryMethodOfProduct = (productId: number, method: any) => {
    const updatedDeliverymethod = { ...deliveryMethods, [productId]: method }
    setDeliveryMethods(updatedDeliverymethod)
    dispatch(updateFinalDataForTheCheckout({ deliveryMethodsWithProductId: updatedDeliverymethod }))
  }

  return (
    <StepWrapper title="Step 2" className="Step2">
      <Box className="StepHeader">
        <Stack className="HeaderWrapper">
          <Typography className="Title" variant="subtitle1">
            Delivery Method
            <HoverTooltip
              placement="right"
              renderComponent={<IconButton className="InfoButton"><InfoIcon /></IconButton>}
              infoTooltip
              arrow
            >
              This is a helper text to justify pricing discount.
            </HoverTooltip>
          </Typography>
          <Select
            color="secondary"
            className="DeliveryMethodSelect"
            value={deliveryMethod}
            onChange={handleDeliveryMethod}
            IconComponent={SelectDropdown}
          >
            {configDetailsState?.localpickupenable?.value && <MenuItem value="LocalShipping">Local Shipping</MenuItem>}
            {configDetailsState?.secureShippingenable?.value && <MenuItem value="SecureShipping">Secure Shipping</MenuItem>}
            {configDetailsState?.vaultstorageenable?.value && <MenuItem value="VaultStorage">Vault Storage</MenuItem>}
          </Select>
        </Stack>
        <FormControlLabel
          className="DeliveryCheckbox"
          control={<Checkbox checked={changeDiffrenceDeliveryMethods} onClick={() => {
            toggleChangeDiffrenceDeliveryMethods()
          }} />}
          label="Select different delivery method for products"
        />
      </Box>
      <Stack className="ProductList">
        {cartItemsWithLivePrice?.length > 0 && cartItemsWithLivePrice?.map((cartItem) => {
          return (
            <CartCard changeDeliveryMethodOfProduct={changeDeliveryMethodOfProduct} isDifferentMethod={changeDiffrenceDeliveryMethods} deliveryMethodOfParent={deliveryMethod} key={cartItem.productId} cartItem={cartItem} hideDeliveryMethod={false} hideRightSide={true} quantity={quantities[cartItem.productId]} deliverMethod={deliveryMethods[cartItem.productId]} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeItem={removeItemFromCart} />
          )
        })}
      </Stack>
      <Typography className="StepNote"><Typography variant="titleLarge">Note:</Typography> Prices are live prices and will be locked on confirm order. </Typography>
    </StepWrapper>
  )
}

export default Step2