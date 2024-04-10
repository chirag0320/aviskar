import { Box, IconButton, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { MinusIcon, PlusIcon } from '@/assets/icons'

interface QuantityInputsProps {
    quantityLabel: string
}

export default function QuantityInputs(props: QuantityInputsProps) {
    const { quantityLabel } = props

    return (
        <>
            <Box className="QuantityInputs">
                <Typography variant="body2" className='QuantityLabel'>{quantityLabel}</Typography>
                <Stack className="Quantity">
                    <IconButton className="Minus"><MinusIcon /></IconButton>
                    <TextField value='1' disabled />
                    <IconButton className="Plus"><PlusIcon /></IconButton>
                </Stack>
            </Box>
        </>
    )
}

