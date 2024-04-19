
import React from "react"
import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material"
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Componenets
import StyledDialog from "@/components/common/StyledDialog"
import RenderFields from '@/components/common/RenderFields';
import QuantityInputs from '@/components/partials/my-vault/QuantityInputs';
import { SellData } from "@/types/myVault";
import { sellQty } from "@/redux/reducers/myVaultReducer";
import { useAppDispatch } from "@/hooks";

interface SellEntry {
    open: boolean
    onClose: () => void
    valueOfSellEntry: any
    setValue: any
    maxQty: number
    unitPrice: number
}

interface Inputs {
    SoldTo: string,
}

const schema = yup.object().shape({
    SoldTo: yup.string(),
});

function SellEntry(props: SellEntry) {
    const dispatch = useAppDispatch()
    const { open, onClose, valueOfSellEntry, setValue, maxQty, unitPrice } = props

    const {
        register,
        getValues,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data: any) => {
        const body: SellData = {
            HoldingId: valueOfSellEntry?.holdingId,
            SoldQuantity: valueOfSellEntry?.quantity,
            SoldTo: data?.SoldTo ?? valueOfSellEntry?.SoldTo,
        }
        dispatch(sellQty(body))
        onClose()
    }
    const onQuantityChange = (qty: any) => {
        setValue('sellEntry', { ...valueOfSellEntry, quantity: qty })
    }
    return (
        <StyledDialog
            id="SellEntry"
            open={open}
            dialogTitle="SellEntry title"
            onClose={() => {
                onClose()
            }}
            maxWidth="sm"
            className="PrivateHoldingCommonPopup"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack className="AllFields">
                    <QuantityInputs quantityLabel="Quantity sold :" onQuantityChange={onQuantityChange} qty={valueOfSellEntry?.quantity} maxQty={maxQty} />
                    <RenderFields
                        register={register}
                        error={errors.SoldTo}
                        name="SoldTo"
                        label="Sold to :"
                        control={control}
                        variant='outlined'
                        margin='none'
                        fullWidth
                    // onChange={(e) => {
                    //     console.log(e.target.value,"e.target.value")
                    //     setValue('sellEntry', { ...valueOfSellEntry, 'SoldTo': e.target.value })
                    // }}
                    // value={valueOfSellEntry?.SoldTo}
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