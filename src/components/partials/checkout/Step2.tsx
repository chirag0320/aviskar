import React, { useEffect, useState } from "react"
import { useMediaQuery, Box, Checkbox, FormControlLabel, IconButton, MenuItem, Select, Stack, Typography } from "@mui/material"

// Type
import type { SelectChangeEvent, Theme } from "@mui/material"

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
import { deleteShoppingCartData, getShoppingCartData } from "@/redux/reducers/shoppingCartReducer"
import { bodyForGetShoppingCartData, hasFulfilled } from "@/utils/common"
import useShowToaster from "@/hooks/useShowToaster"

function Step2() {
  const dispatch = useAppDispatch()
  const isSmallScreen: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
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
  const { showToaster } = useShowToaster();


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
    } else if (cartItemsWithLivePrice?.length === 0) {
      let subTotal = 0;
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
    dispatch(updateFinalDataForTheCheckout({ quantitiesWithProductId: quantities, deliveryMethodsWithProductId: deliveryMethods, IsDifferentShippingMethod: changeDiffrenceDeliveryMethods }))
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
    dispatch(updateFinalDataForTheCheckout({ ...makeObject, parentDeliveryMethod: event.target.value }))
  }

  const increaseQuantity = (productId: number) => {
    const productIdOfId = cartItemsWithLivePrice.find((item) => item.id === productId)
    const updatedQuantities = { ...quantities, [productIdOfId?.productId ?? productId]: quantities[productIdOfId?.productId ?? productId] + 1 }
    setQuantities(updatedQuantities)
    dispatch(updateFinalDataForTheCheckout({ quantitiesWithProductId: updatedQuantities }))
  }

  const decreaseQuantity = (productId: number) => {
    const productIdOfId = cartItemsWithLivePrice.find((item) => item.id === productId)


    const updatedQuantities = { ...quantities, [productIdOfId?.productId ?? productId]: quantities[productIdOfId?.productId ?? productId] - 1 }
    setQuantities(updatedQuantities)
    dispatch(updateFinalDataForTheCheckout({ quantitiesWithProductId: updatedQuantities }))
  }

  const removeItemFromCart = async (productId: number) => {
    let ids: any[] = [];
    const updatedCartItem = cartItemsWithLivePrice.filter((item: CartItemsWithLivePriceDetails) => {
      if (item.id == productId) {
        ids.push(productId)
      }
      return (item.id !== productId)
    })
    let response;
    if (ids.length) {
      response = await dispatch(deleteShoppingCartData({ url: ENDPOINTS.deleteShoppingCartData, body: ids }) as any);
    }
    if (hasFulfilled(response.type)) {
      dispatch(getShoppingCartData({ url: ENDPOINTS.getShoppingCartData, body: bodyForGetShoppingCartData }))
      setCartItemsWithLivePrice(updatedCartItem);
      dispatch(updateFinalDataForTheCheckout({ cartItemsWithLivePrice: updatedCartItem }))
      showToaster({ message: response?.payload?.data?.message, severity: 'success' })
    } else {
      showToaster({ message: "Remove item failed", severity: 'error' })
    }
  }

  const changeDeliveryMethodOfProduct = (productId: number, method: any) => {
    const updatedDeliverymethod = { ...deliveryMethods, [productId]: method }
    setDeliveryMethods(updatedDeliverymethod)
    dispatch(updateFinalDataForTheCheckout({ deliveryMethodsWithProductId: updatedDeliverymethod }))
  }

  return (
    <StepWrapper title="Step 2" className="Step2">
      <Box className="StepHeader">
        <Stack
          className="HeaderWrapper"
          sx={cartItemsWithLivePrice?.length > 1 ? {} : { mb: 1 }}
        >
          <Typography className="Title" variant="subtitle1">
            Delivery Method
            <HoverTooltip
              placement={isSmallScreen ? "top" : "right"}
              renderComponent={<IconButton className="InfoButton"><InfoIcon /></IconButton>}
              infoTooltip
              arrow
            >
              {configDetailsState?.["checkout.deliveryinfotext"]?.value}
            </HoverTooltip>
          </Typography>
          <Select
            color="secondary"
            className="DeliveryMethodSelect"
            value={deliveryMethod}
            onChange={handleDeliveryMethod}
            IconComponent={SelectDropdown}
          >
            {configDetailsState?.localpickupenable?.value && <MenuItem value="LocalShipping">Local PickUp</MenuItem>}
            {configDetailsState?.secureShippingenable?.value && <MenuItem value="SecureShipping">Secure Shipping</MenuItem>}
            {configDetailsState?.vaultstorageenable?.value && <MenuItem value="VaultStorage">Vault Storage</MenuItem>}
          </Select>
        </Stack>
        {cartItemsWithLivePrice?.length > 1 && <FormControlLabel
          className="DeliveryCheckbox"
          control={<Checkbox checked={changeDiffrenceDeliveryMethods} onClick={() => {
            toggleChangeDiffrenceDeliveryMethods()
          }} />}
          label="Select different delivery method for products"
        />}
      </Box>
      <Stack className="ProductList">
        {cartItemsWithLivePrice?.length > 0 && cartItemsWithLivePrice?.map((cartItem) => {
          return (
            <CartCard changeDeliveryMethodOfProduct={changeDeliveryMethodOfProduct} isDifferentMethod={changeDiffrenceDeliveryMethods} deliveryMethodOfParent={deliveryMethod} key={cartItem.productId} cartItem={cartItem} hideDeliveryMethod={false} quantity={quantities[cartItem.productId]} deliverMethod={deliveryMethods[cartItem.productId]} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeItem={removeItemFromCart} />
          )
        })}
      </Stack>
      <Typography className="StepNote">
        {/* <Typography variant="titleLarge">Note:</Typography> */}
        {configDetailsState?.["checkout.pricelockedtext"]?.value}</Typography>
    </StepWrapper>
  )
}

export default Step2