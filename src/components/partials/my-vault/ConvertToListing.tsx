
import React, { useState } from "react"
import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material"
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Componenets
import StyledDialog from "@/components/common/StyledDialog"
import RenderFields from '@/components/common/RenderFields';
import QuantityInputs from '@/components/partials/my-vault/QuantityInputs';
import { ConversionData } from "@/types/myVault";
import { convertToMarketPlace } from "@/redux/reducers/myVaultReducer";
import { useAppDispatch } from "@/hooks";

interface ConvertToListing {
    open: boolean
    onClose: () => void
    valueOfConvertToListing: any
    setValue: any
    maxQty: number
    unitPrice: number
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
    const dispatch = useAppDispatch()
    const { open, onClose, valueOfConvertToListing, setValue, maxQty, unitPrice } = props

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data: any) => {
        const body: ConversionData = {
            ConvertQuantity: valueOfConvertToListing?.quantity,
            StorePrice: data?.StorePrice ?? valueOfConvertToListing?.StorePrice,
            MinimumPrice: data?.MinimumPrice ?? valueOfConvertToListing?.MinimumPrice,
            HoldingId: valueOfConvertToListing?.holdingId,
        }
        dispatch(convertToMarketPlace(body))
        onClose()
    }
    const onQuantityChange = (qty: any) => {
        setValue('convertToListing', { ...valueOfConvertToListing, quantity: qty })
    }
    return (
        <StyledDialog
            id="ConvertToListing"
            open={open}
            dialogTitle="Convert To Listing title"
            onClose={() => {
                onClose()
            }}
            maxWidth="sm"
            className="PrivateHoldingCommonPopup"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack className="AllFields">
                    <QuantityInputs quantityLabel="Convert Quantity :" onQuantityChange={onQuantityChange} qty={valueOfConvertToListing?.quantity} maxQty={maxQty} />
                    <RenderFields
                        register={register}
                        error={errors.StorePrice}
                        name="StorePrice"
                        label="Store Price :"
                        control={control}
                        variant='outlined'
                        margin='none'
                        fullWidth
                        type="number"
                        disabled={true}
                        value={unitPrice as any}
                    // onChange={(e) => {
                    //     setValue('convertToListing', { ...valueOfConvertToListing, 'StorePrice': e.target.value })
                    // }}
                    // value={valueOfConvertToListing?.StorePrice ?? 0}
                    />
                    <RenderFields
                        register={register}
                        error={errors.MinimumPrice}
                        name="MinimumPrice"
                        label="Minimum Price :"
                        // onChange={(e) => {
                        //     setValue('convertToListing', { ...valueOfConvertToListing, 'MinimumPrice': e.target.value })
                        // }}
                        control={control}
                        variant='outlined'
                        margin='none'
                        fullWidth
                        type="number"
                    // value={valueOfConvertToListing?.MinimumPrice ?? 0}
                    />
                </Stack>
                <Stack className="ActionWrapper">
                    <Button size="medium" variant="outlined" onClick={() => {
                        onClose()
                    }}>Cancel</Button>
                    <Button type="submit" size="medium" variant="contained">Save</Button>
                </Stack>
            </form>
        </StyledDialog>
    )
}

export default React.memo(ConvertToListing)