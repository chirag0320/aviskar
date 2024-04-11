
import React from "react"
import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material"
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Componenets
import StyledDialog from "@/components/common/StyledDialog"
import RenderFields from '@/components/common/RenderFields';
import QuantityInputs from '@/components/partials/my-vault/QuantityInputs';

interface SellToUs {
    open: boolean
    onClose: () => void
}

interface Inputs {
    // SoldTo: string,
}

const schema = yup.object().shape({
    // SoldTo: yup.string(),
});

function SellToUs(props: SellToUs) {
    const { open, onClose } = props

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data: any) => {
        onClose()
    }

    return (
        <StyledDialog
            id="SellToUs"
            open={open}
            dialogTitle="test holding product"
            onClose={onClose}
            maxWidth="sm"
            className="PrivateHoldingCommonPopup"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack className="AllFields">
                    <img src="https://qmintstoremedia.blob.core.windows.net/pictures/products/2023-1oz-lunar-series-year-of-the-rabbit-platinum-coin_120320242303026.png?sv=2018-03-28&sr=b&sig=5tD7n%2Bvm4%2BK%2BKE5ZHQfCaSdQBforI3BPxO1kNTNTOzI%3D&st=2024-03-11T13%3A50%3A02Z&se=3024-03-12T13%3A50%3A02Z&sp=r&c=638458482026612121" alt="Product image" />
                    <QuantityInputs quantityLabel="$0.00" />
                </Stack>
                <Stack className="ActionWrapper">
                    <Button size="medium" variant="outlined" onClick={onClose}>Cancel</Button>
                    <Button type="submit" size="medium" variant="contained">Request Formal Quote</Button>
                </Stack>
            </form>
        </StyledDialog>
    )
}

export default SellToUs