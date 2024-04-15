
import React from "react"
import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material"
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Componenets
import StyledDialog from "@/components/common/StyledDialog"
import RenderFields from '@/components/common/RenderFields';
import QuantityInputs from '@/components/partials/my-vault/QuantityInputs';

interface SellEntry {
    open: boolean
    onClose: () => void
}

interface Inputs {
    SoldTo: string,
}

const schema = yup.object().shape({
    SoldTo: yup.string(),
});

function SellEntry(props: SellEntry) {
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
    const onQuantityChange = () => {

    }
    return (
        <StyledDialog
            id="SellEntry"
            open={open}
            dialogTitle="SellEntry title"
            onClose={onClose}
            maxWidth="sm"
            className="PrivateHoldingCommonPopup"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack className="AllFields">
                    <QuantityInputs quantityLabel="Quantity sold :" onQuantityChange={onQuantityChange}/>
                    <RenderFields
                        register={register}
                        error={errors.SoldTo}
                        name="SoldTo"
                        label="Sold to :"
                        control={control}
                        variant='outlined'
                        margin='none'
                        fullWidth
                    />
                </Stack>
                <Stack className="ActionWrapper">
                    <Button size="medium" variant="outlined" onClick={onClose}>Cancel</Button>
                    <Button type="submit" size="medium" variant="contained">Save</Button>
                </Stack>
            </form>
        </StyledDialog>
    )
}

export default SellEntry