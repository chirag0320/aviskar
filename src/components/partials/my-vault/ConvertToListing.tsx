
import React from "react"
import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material"
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Componenets
import StyledDialog from "@/components/common/StyledDialog"
import RenderFields from '@/components/common/RenderFields';
import QuantityInputs from '@/components/partials/my-vault/QuantityInputs';

interface ConvertToListing {
    open: boolean
    onClose: () => void
}

interface Inputs {
    StorePrice: string,
    MinimumPrice: string,
}

const schema = yup.object().shape({
    StorePrice: yup.string(),
    MinimumPrice: yup.string(),
});

function ConvertToListing(props: ConvertToListing) {
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
            id="ConvertToListing"
            open={open}
            dialogTitle="Convert To Listing title"
            onClose={onClose}
            maxWidth="sm"
            className="PrivateHoldingCommonPopup"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack className="AllFields">
                    <QuantityInputs quantityLabel="Convert Quantity :" />
                    <RenderFields
                        register={register}
                        error={errors.StorePrice}
                        name="StorePrice"
                        label="Store Price :"
                        control={control}
                        variant='outlined'
                        margin='none'
                        fullWidth
                    />
                    <RenderFields
                        register={register}
                        error={errors.MinimumPrice}
                        name="MinimumPrice"
                        label="Minimum Price :"
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

export default ConvertToListing