import { LeftArrow } from '@/assets/icons'
import { CartCard } from '@/components/common/Card'
import { useAppDispatch, useAppSelector } from '@/hooks'
import useApiRequest from '@/hooks/useAPIRequest'
import { CartItem } from '@/types/shoppingCart'
import { ENDPOINTS } from '@/utils/constants'
import { Box, Button, Stack, Typography } from '@mui/material'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IproductPrice } from '../home/FeaturedProducts'
import { deleteShoppingCartData, resetSubTotal, updateShoppingCartData, updateSubTotal } from '@/redux/reducers/shoppingCartReducer'
import { set } from 'react-hook-form'
import { navigate } from 'gatsby'

export type CartItemsWithLivePriceDetails = CartItem & {
    LivePriceDetails: IproductPrice
}

// const CartDetails = ({ setSubTotal }: { setSubTotal: Dispatch<SetStateAction<number>> }) => {
const CartDetails = () => {
    const loading = useAppSelector(state => state.shoppingCart.loading);
    const cartItems = useAppSelector(state => state.shoppingCart.cartItems);
    const [productIds, setProductIds] = useState({})
    const dispatch = useAppDispatch();
    const { data: priceData, loading: priceLoading } = useApiRequest(ENDPOINTS.productPrices, 'post', productIds, 60);
    const [cartItemsWithLivePrice, setCartItemsWithLivePrice] = useState<CartItemsWithLivePriceDetails[]>([]);
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({})

    useEffect(() => {
        if (priceData?.data?.length > 0) {
            const idwithpriceObj: any = {}
            priceData?.data?.forEach((product: any) => idwithpriceObj[product?.productId] = product)

            let subTotal = 0;
            const cartItemsWithLivePrice = cartItems.map((item: CartItem) => {
                subTotal += (idwithpriceObj[item.productId].price * item.quantity)
                return {
                    ...item,
                    LivePriceDetails: idwithpriceObj[item.productId]
                }
            })

            dispatch(updateSubTotal(subTotal))

            setCartItemsWithLivePrice(cartItemsWithLivePrice)
        }
    }, [priceData])

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
        setQuantities({ ...quantities, [id]: quantities[id] + 1 })
    }

    const decreaseQuantity = (id: number) => {
        if (quantities[id] === 1) {
            removeItemFromCart(id);
        }
        else {
            setQuantities({ ...quantities, [id]: quantities[id] - 1 })
        }
    }

    const removeItemFromCart = async (id: number) => {
        // setCartItemsWithLivePrice(cartItemsWithLivePrice.filter((item: CartItemsWithLivePriceDetails) => item.id !== id));        
        await dispatch(deleteShoppingCartData({ url: ENDPOINTS.deleteShoppingCartData, body: [id] }) as any);
    }

    const updateCartHandler = async () => {
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
        await dispatch(updateShoppingCartData({ url: ENDPOINTS.updateShoppingCartData, body: itemsWithQuantity }) as any);
    }

    const clearCartHandler = async () => {
        const ids: number[] = [];
        for (const id in quantities) {
            ids.push(Number(id));
        }

        // console.log(ids);


        await dispatch(deleteShoppingCartData({ url: ENDPOINTS.deleteShoppingCartData, body: ids }) as any)
        dispatch(resetSubTotal());
    }

    return (
        <Box className="ShoppingCartDetails">
            <Box className="ShoppingProductsDetailsWrapper">
                {cartItemsWithLivePrice.map((cartItem) => {
                    return (
                        <CartCard key={cartItem.productId} cartItem={cartItem} hideDeliveryMethod={true} hideRightSide={true} quantity={quantities[cartItem.id]} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeItem={removeItemFromCart} />
                    )
                })}
                <Typography variant="body1"><Typography component="span" className="Note">Note:</Typography> Prices are live prices and will be locked on confirm order. </Typography>
            </Box>
            <Stack className="BottomCartActionsWrapper">
                <Button className='LeftArrow' startIcon={<LeftArrow />} color='secondary' onClick={() => navigate("/shop")}> Continue Shopping</Button>
                <Stack className='ClearUpdateCartWrapper'>
                    <Button className="ClearShoppingCart" color='secondary' onClick={clearCartHandler} disabled={loading}>Clear Shopping Cart</Button>
                    <Button className='UpdateCartBtn' size='large' variant="contained" onClick={updateCartHandler} disabled={loading}>Update Shopping Cart</Button>
                </Stack>
            </Stack>
        </Box>
    )
}

export default CartDetails