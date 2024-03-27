import { LeftArrow } from '@/assets/icons'
import { CartCard } from '@/components/common/Card'
import { useAppDispatch, useAppSelector } from '@/hooks'
import useApiRequest from '@/hooks/useAPIRequest'
import { CartItem } from '@/types/shoppingCart'
import { ENDPOINTS } from '@/utils/constants'
import { Box, Button, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IproductPrice } from '../home/FeaturedProducts'
import { clearShoppingCart, deleteShoppingCartData, resetSubTotal, updateShoppingCartData, updateSubTotal } from '@/redux/reducers/shoppingCartReducer'
import { navigate } from 'gatsby'
import useDebounce from '@/hooks/useDebounce'
import { hasFulfilled } from '@/utils/common'
import { setToasterState } from "@/redux/reducers/homepageReducer";


export type CartItemsWithLivePriceDetails = CartItem & {
    LivePriceDetails: IproductPrice
}

// const CartDetails = ({ setSubTotal }: { setSubTotal: Dispatch<SetStateAction<number>> }) => {
const CartDetails = () => {

    // const CartDetails = ({ isShoppingCartUpdated, setIsShoppingCartUpdated }: { isShoppingCartUpdated: boolean, setIsShoppingCartUpdated: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const loading = useAppSelector(state => state.shoppingCart.loading);
    const cartItems = useAppSelector(state => state.shoppingCart.cartItems);
    const [productIds, setProductIds] = useState({})
    const dispatch = useAppDispatch();
    const { data: priceData, loading: priceLoading } = useApiRequest(ENDPOINTS.productPrices, 'post', productIds, 60);
    const [cartItemsWithLivePrice, setCartItemsWithLivePrice] = useState<CartItemsWithLivePriceDetails[]>([]);
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({})
    const changeInQuantities = useDebounce(quantities, 500)
    useEffect(() => {
        updateCartHandler(false)
    }, [changeInQuantities, cartItemsWithLivePrice])
    useEffect(() => {
        if (priceData?.data?.length > 0) {
            const idwithpriceObj: any = {}
            priceData?.data?.forEach((product: any) => idwithpriceObj[product?.productId] = product)

            let subTotal = 0;
            const cartItemsWithLivePrice = cartItems.map((item: CartItem) => {
                subTotal += (idwithpriceObj?.[item.productId]?.price * item.quantity)
                return {
                    ...item,
                    LivePriceDetails: idwithpriceObj[item.productId]
                }
            })

            dispatch(updateSubTotal(subTotal))

            setCartItemsWithLivePrice(cartItemsWithLivePrice)
        }
    }, [priceData, cartItems])

    useEffect(() => {
        if (cartItems.length > 0) {
            const productIds = cartItems.map((item: CartItem) => item.productId);
            setProductIds({ productIds })
        }

        let quantities: any = {}
        cartItems.forEach((item: CartItem) => {
            quantities[item.id] = item.quantity
        })
        setQuantities(quantities)
    }, [cartItems])

    const increaseQuantity = (id: number) => {
        setQuantities(prevQuantities => ({ ...prevQuantities, [id]: prevQuantities[id] + 1 }));
        // setIsShoppingCartUpdated(true);
    }

    const decreaseQuantity = (id: number) => {
        setQuantities(prevQuantities => ({ ...prevQuantities, [id]: prevQuantities[id] - 1 }));
        // setIsShoppingCartUpdated(true);
    }

    const removeItemFromCart = async (id: number) => {
        // optimistic update needs(currentlt not)
        const response = await dispatch(deleteShoppingCartData({ url: ENDPOINTS.deleteShoppingCartData, body: [id] }) as any);

        if (hasFulfilled(response.type)) {
            setCartItemsWithLivePrice(() => cartItemsWithLivePrice.filter((item: CartItemsWithLivePriceDetails) => item.id !== id));
            // console.log("🚀 ~ removeItemFromCart ~ response?.payload?.data?.message:", response?.payload?.data?.message)
            dispatch(setToasterState({
                openToaster: true,
                toasterMessage: response?.payload?.data?.message
            }))
        }
        else {
            dispatch(setToasterState({
                openToaster: true,
                toasterMessage: "Removing item from Shopping Cart failed. Please try again.",
            }))
        }
    }

    const updateCartHandler = async (isapiCallNeeded?: boolean) => {
        let subTotal = 0;
        const itemsWithQuantity = cartItemsWithLivePrice.map((item: CartItemsWithLivePriceDetails) => {
            subTotal += (item.LivePriceDetails.price * quantities[item.id]);
            return {
                id: item.id,
                quantity: quantities[item.id]
            }
        })
        dispatch(resetSubTotal());
        dispatch(updateSubTotal(subTotal))

        if (isapiCallNeeded) {
            // setIsShoppingCartUpdated(false)
            await dispatch(updateShoppingCartData({ url: ENDPOINTS.updateShoppingCartData, body: itemsWithQuantity }) as any);
        }
    }

    const clearCartHandler = async () => {
        const ids: number[] = [];
        for (const id in quantities) {
            ids.push(Number(id));
        }
        dispatch(clearShoppingCart());
        await dispatch(deleteShoppingCartData({ url: ENDPOINTS.deleteShoppingCartData, body: ids }) as any)
    }

    return (
        <Box className="ShoppingCartDetails">
            <Box className="ShoppingProductsDetailsWrapper">
                {cartItemsWithLivePrice && cartItemsWithLivePrice.length === 0 && <Typography variant="body1" style={{ textAlign: "center" }}>No items in the cart</Typography>}
                {cartItemsWithLivePrice?.length > 0 && cartItemsWithLivePrice?.map((cartItem) => {
                    return (
                        <CartCard key={cartItem.productId} cartItem={cartItem} hideDeliveryMethod={true} hideRightSide={true} quantity={quantities[cartItem.id]} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeItem={removeItemFromCart} />
                    )
                })}
                {cartItemsWithLivePrice?.length > 0 && <Typography variant="body1"><Typography component="span" className="Note">Note:</Typography> Prices are live prices and will be locked on confirm order. </Typography>}
            </Box>
            <Stack className="BottomCartActionsWrapper">
                <Button className='LeftArrow' startIcon={<LeftArrow />} color='secondary' onClick={() => navigate("/shop")} disabled={loading}> Continue Shopping</Button>
                <Stack className='ClearUpdateCartWrapper'>
                    <Button className="ClearShoppingCart" color='secondary' onClick={clearCartHandler} disabled={loading || cartItemsWithLivePrice.length === 0}>Clear Shopping Cart</Button>
                    <Button className='UpdateCartBtn' size='large' variant="contained" onClick={() => updateCartHandler(true)} disabled={loading || cartItemsWithLivePrice.length === 0}>Update Shopping Cart</Button>
                </Stack>
            </Stack>
        </Box>
    )
}

export default CartDetails