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
import { useAppDispatch, useAppSelector } from "@/hooks"
import { shopingCartItem, updateFinalDataForTheCheckout, updateSubTotalCheckoutPage } from "@/redux/reducers/checkoutReducer"
import { ENDPOINTS } from "@/utils/constants"
import useApiRequest from "@/hooks/useAPIRequest"
import { CartItemsWithLivePriceDetails } from "../shopping-cart/CartDetails"

function Step2() {
  const dispatch = useAppDispatch()
  const { checkoutPageData } = useAppSelector((state) => state.checkoutPage)
  const [deliveryMethod, setDeliveryMethod] = useState<'DifferentMethod' | 'VaultStorage' | 'SecureShipping'>('DifferentMethod')
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})
  const [deliveryMethods, setDeliveryMethods] = useState<{ [key: number]: string }>({})
  const [productIds, setProductIds] = useState({})
  const { data: priceData, loading: priceLoading } = useApiRequest(ENDPOINTS.productPrices, 'post', productIds, 60);
  const [cartItemsWithLivePrice, setCartItemsWithLivePrice] = useState<CartItemsWithLivePriceDetails[]>([]);

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

      dispatch(updateSubTotalCheckoutPage(subTotal))

      // const subTotal = cartItemsWithLivePrice.reduce((acc: number, item: CartItemsWithLivePriceDetails) => {
      //     return acc + (item.LivePriceDetails.price * item.quantity)
      // }, 0)

      setCartItemsWithLivePrice(cartItemsWithLivePrice!)
    }
  }, [priceData, checkoutPageData?.shoppingCartItems])

  useEffect(() => {
    if (checkoutPageData?.shoppingCartItems?.length! > 0) {
      const productIds = checkoutPageData?.shoppingCartItems.map((item: shopingCartItem) => item.productId);
      setProductIds({ productIds })
    }

    let quantities: any = {}
    let deliveryMethods: any = {}
    checkoutPageData?.shoppingCartItems?.forEach((item: shopingCartItem) => {
      quantities[item.productId] = item.quantity
      deliveryMethods[item.productId] = 'SecureShipping'
    })
    setQuantities(quantities)
    setDeliveryMethods(deliveryMethods)
    dispatch(updateFinalDataForTheCheckout({ quantitiesWithProductId: quantities, deliveryMethodsWithProductId: deliveryMethod }))
  }, [checkoutPageData?.shoppingCartItems])
  useEffect(() => {
    dispatch(updateFinalDataForTheCheckout({ cartItemsWithLivePrice }))
  }, [cartItemsWithLivePrice])

  const handleDeliveryMethod = (event: SelectChangeEvent) => {
    setDeliveryMethod(event.target.value as string);
    dispatch(updateFinalDataForTheCheckout({ parentDeliveryMethod: event.target.value }))
  }

  const increaseQuantity = (productId: number) => {
    const updatedQuantities = { ...quantities, [productId]: quantities[productId] + 1 }
    setQuantities(updatedQuantities)
    dispatch(updateFinalDataForTheCheckout({ quantitiesWithProductId: updatedQuantities }))
  }

  const decreaseQuantity = (productId: number) => {
    if (quantities[productId] === 1) {
      // setCartItemsWithLivePrice(cartItemsWithLivePrice.filter((item: CartItemsWithLivePriceDetails) => item.productId !== productId));
    }
    else {
      const updatedQuantities = { ...quantities, [productId]: quantities[productId] - 1 }
      setQuantities(updatedQuantities)
      dispatch(updateFinalDataForTheCheckout({ quantitiesWithProductId: updatedQuantities }))
    }
  }

  const removeItemFromCart = (productId: number) => {
    const updatedCartItem = cartItemsWithLivePrice.filter((item: CartItemsWithLivePriceDetails) => item.productId !== productId)
    setCartItemsWithLivePrice(updatedCartItem);
    dispatch(updateFinalDataForTheCheckout({ deliveryMethodsWithProductId: updatedCartItem }))
  }

  const changeDeliveryMethodOfProduct = (productId: number, method: any) => {
    const updatedDeliverymethod = { ...deliveryMethods, [productId]: method }
    setQuantities(updatedDeliverymethod)
    dispatch(updateFinalDataForTheCheckout({ quantitiesWithProductId: updatedDeliverymethod }))
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
            <MenuItem value="DifferentMethod">Different Method</MenuItem>
            <MenuItem value="SecureShipping">Secure Shipping</MenuItem>
            <MenuItem value="VaultStorage">Vault Storage</MenuItem>
          </Select>
        </Stack>
        <FormControlLabel
          className="DeliveryCheckbox"
          control={<Checkbox />}
          label="Select different delivery method for products"
        />
      </Box>
      <Stack className="ProductList">
        {cartItemsWithLivePrice?.length > 0 && cartItemsWithLivePrice?.map((cartItem) => {
          return (
            <CartCard changeDeliveryMethodOfProduct={changeDeliveryMethodOfProduct} isDifferentMethod={deliveryMethod === 'DifferentMethod'} deliveryMethodOfParent={deliveryMethod} key={cartItem.productId} cartItem={cartItem} hideDeliveryMethod={false} hideRightSide={true} quantity={quantities[cartItem.productId]} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeItem={removeItemFromCart} />
          )
        })}
      </Stack>
      <Typography className="StepNote"><Typography variant="titleLarge">Note:</Typography> Prices are live prices and will be locked on confirm order. </Typography>
    </StepWrapper>
  )
}

export default Step2