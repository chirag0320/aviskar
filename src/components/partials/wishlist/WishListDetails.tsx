import React, { Fragment, useEffect, useState } from 'react'
import { Button, Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import useApiRequest from '@/hooks/useAPIRequest'
import { CartItemsWithLivePriceDetails } from '../shopping-cart/CartDetails'
import { ENDPOINTS } from '@/utils/constants'
import { CartItem } from '@/types/shoppingCart'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { MinusIcon, PlusIcon } from '@/assets/icons'
import { updateShoppingCartData } from '@/redux/reducers/shoppingCartReducer'
import { deleteWishListData } from '@/redux/reducers/wishListReducer'

const WishListDetails = ({ toggleEmailFriend }: { toggleEmailFriend: () => any }) => {
    const wishListstate = useAppSelector(state => state.wishList)
    const dispatch = useAppDispatch();

    const [productIds, setProductIds] = useState({})
    const { data: priceData, loading: priceLoading } = useApiRequest(ENDPOINTS.productPrices, 'post', productIds, 60);
    const [wishListItemsWithLivePrice, setWishListItemsWithLivePrice] = useState<CartItemsWithLivePriceDetails[]>([]);
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({})
    const [selectedItems, setSelectedItems] = useState<{ [key: number]: boolean }>([])
    console.log("🚀 ~ WishListDetails ~ selectedItems:", selectedItems)

    useEffect(() => {
        if (priceData?.data?.length > 0) {
            const idwithpriceObj: any = {}
            priceData?.data?.forEach((product: any) => idwithpriceObj[product?.productId] = product)

            const wishListItemsWithLivePrice = wishListstate.wishListItems.map((item: CartItem) => {
                return {
                    ...item,
                    LivePriceDetails: idwithpriceObj[item.productId]
                }
            })

            setWishListItemsWithLivePrice(wishListItemsWithLivePrice)
        }
    }, [priceData])

    useEffect(() => {
        if (wishListstate.wishListItems.length > 0) {
            const productIds = wishListstate.wishListItems.map((item: CartItem) => item.productId);
            setProductIds({ productIds })
        }

        let quantities: any = {}
        let checkedItems: any = {}
        wishListstate.wishListItems.forEach((item: CartItem) => {
            checkedItems[item.id] = false
            quantities[item.id] = item.quantity
        })

        setSelectedItems(checkedItems)
        setQuantities(quantities)
    }, [wishListstate.wishListItems])

    const increaseQuantity = (id: number) => {
        setQuantities({ ...quantities, [id]: quantities[id] + 1 })
    }

    const decreaseQuantity = (id: number) => {
        if (quantities[id] !== 1) {
            setQuantities({ ...quantities, [id]: quantities[id] - 1 })
        }
    }

    const updateWishListHandler = async () => {
        const itemsWithQuantity = Object.keys(quantities).map((item: any) => {
            return {
                id: item,
                quantity: quantities[item]
            }
        })

        await dispatch(updateShoppingCartData({ url: ENDPOINTS.updateShoppingCartData, body: itemsWithQuantity }) as any);
    }

    const removeSelectedItemsHandler = async() => {
        dispatch(deleteWishListData({ url: ENDPOINTS.deleteWishListData, body: [...Object.keys(selectedItems)] }) as any)
    }

    const addSelectedItemsHandler = () => {
        // await dispatch(deleteWishListData())
    }

    const handleCheckboxChange = (id: number) => {
        setSelectedItems({ ...selectedItems, [id]: !selectedItems[id] })
    }

    return (
        <Fragment>
            <TableContainer>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox"></TableCell>
                            <TableCell colSpan={2}>Products</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Qty.</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {wishListItemsWithLivePrice.map((item) => (
                            <TableRow key={item.productId}>
                                <TableCell padding="checkbox">
                                    <Checkbox checked={selectedItems[item.id]} onChange={() => handleCheckboxChange(item.id)} />
                                </TableCell>
                                <TableCell align="left"><img src={item.imageUrl} width={100} height={100} /></TableCell>
                                <TableCell><Button href="#" color="secondary">{item.productName}</Button></TableCell>
                                <TableCell>{item.LivePriceDetails.price}</TableCell>
                                <TableCell>
                                    <Stack className="Quantity">
                                        <IconButton className="Minus" onClick={() => decreaseQuantity(item.id)} disabled={quantities[item.id] === 1}><MinusIcon /></IconButton>
                                        <TextField type="number" name="Qty" value={quantities[item.id]} disabled />
                                        <IconButton className="Plus" onClick={() => increaseQuantity(item.id)}><PlusIcon /></IconButton>
                                    </Stack>
                                </TableCell>
                                {/* round to 2 */}
                                <TableCell>{(quantities[item.id] * item.LivePriceDetails.price).toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack className="ActionWrapper">
                <Stack className="Left">
                    <Button color="primary" variant="contained" onClick={updateWishListHandler}>Update Wishlist</Button>
                    <Button color="primary" variant="outlined" onClick={toggleEmailFriend}>Email a friend</Button>
                </Stack>
                <Stack className="Right">
                    <Button color="primary" variant="outlined" onClick={removeSelectedItemsHandler}>Remove</Button>
                    <Button color="primary" variant="contained" onClick={addSelectedItemsHandler}>Add to cart</Button>
                </Stack>
            </Stack>
        </Fragment>
    )
}

export default WishListDetails