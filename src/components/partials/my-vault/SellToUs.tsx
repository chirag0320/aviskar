
import React from "react"
import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material"
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Componenets
import StyledDialog from "@/components/common/StyledDialog"
import RenderFields from '@/components/common/RenderFields';
import QuantityInputs from '@/components/partials/my-vault/QuantityInputs';
import noImage from '../../../assets/images/noImage.png'
import { useAppDispatch } from "@/hooks";
import { sendForEnquiry } from "@/redux/reducers/myVaultReducer";
import { IEnquiryData } from "@/types/myVault";

interface SellToUs {
    open: boolean
    onClose: () => void
    valueOfTheSellToUs: any
    setValue: (key: any, value: any) => void
}

interface Inputs {
    // SoldTo: string,
}

const schema = yup.object().shape({
    // SoldTo: yup.string(),
});

function SellToUs(props: SellToUs) {
    const { open, onClose, valueOfTheSellToUs, setValue } = props
    const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data: any) => {
        const body: IEnquiryData = {
            HoldingId: valueOfTheSellToUs?.holdingId,
            Quantity: valueOfTheSellToUs?.quantity,
            ProductPrice: valueOfTheSellToUs?.price,
        }
        dispatch(sendForEnquiry(body))
        onClose()
    }
    const onQuantityChange = (qty: any) => {
        setValue('sellToUs', { ...valueOfTheSellToUs, quantity: qty })
    }
    return (
        <StyledDialog
            id="SellToUs"
            open={open}
            dialogTitle={valueOfTheSellToUs?.producName}
            onClose={() => { onClose() }}
            maxWidth="sm"
            className="PrivateHoldingCommonPopup"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box className="Imagewrapper">
                    <img src={valueOfTheSellToUs?.filepath ?? noImage} alt="Product image" />
                </Box>
                <Stack className="ActionWrapper">
                    <QuantityInputs quantityLabel={valueOfTheSellToUs?.price} onQuantityChange={onQuantityChange} qty={valueOfTheSellToUs?.quantity} />
                    <Stack className="ButtonsWrapper">
                        <Button size="medium" variant="outlined" onClick={() => {
                            onClose()
                        }}>Cancel</Button>
                        <Button type="submit" size="medium" variant="contained">Request Formal Quote</Button>
                    </Stack>
                </Stack>
            </form>
        </StyledDialog>
    )
}

export default React.memo(SellToUs)