import { Box, IconButton, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { MinusIcon, PlusIcon } from '@/assets/icons'

interface QuantityInputsProps {
    quantityLabel: string
    onQuantityChange: (quantity: number) => void
    qty: number
    maxQty: number
}

export default function QuantityInputs(props: QuantityInputsProps) {
    const { quantityLabel, onQuantityChange, qty, maxQty } = props
    console.log("🚀 ~ QuantityInputs ~ maxQty:", maxQty)
    const [quantity, setQuantity] = useState<number>(qty)

    const increaseQuantity = () => {
        const newQuantity = quantity + 1 > maxQty ? quantity : quantity + 1
        setQuantity(newQuantity)
        onQuantityChange(newQuantity)
    }

    const decrementQuantity = () => {
        const newQuantity = quantity > 1 ? quantity - 1 : 1
        setQuantity(newQuantity)
        onQuantityChange(newQuantity)
    }
    return (
        <Box className="QuantityInputs">
            <Typography variant="body2" className='QuantityLabel'>{quantityLabel}</Typography>
            <Stack className="Quantity">
                <IconButton className="Minus" onClick={decrementQuantity}><MinusIcon /></IconButton>
                <TextField value={quantity} disabled />
                <IconButton className="Plus" onClick={increaseQuantity}><PlusIcon /></IconButton>
            </Stack>
        </Box>
    )
}

