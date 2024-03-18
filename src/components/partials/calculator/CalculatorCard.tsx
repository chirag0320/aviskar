import React from 'react'
import { Typography, Card, CardContent, Stack, Box, IconButton, Icon, } from "@mui/material"

// Assets
import { CrossIconWithOutlineCircle, GoldBarIcon, VaultIcon } from "../../../assets/icons/index"
import { useAppDispatch } from '@/hooks'
import { removeCalculator } from '@/redux/reducers/calculatorsReducer'
import SilverCoinIcon from '@/assets/icons/SilverCoinIcon'
import PlatinumBarIcon from '@/assets/icons/PlatinumBarIcon'
import CopperBarIcon from '@/assets/icons/CopperBarIcon'
import GoldCoinIcon from '@/assets/icons/GoldCoinIcon'
import SilverBarIcon from '@/assets/icons/SilverBarIcon'
import PlatinumCoinIcon from '@/assets/icons/PlatinumCoinIcon'
import PalladiumBarIcon from '@/assets/icons/PalladiumBarIcon'
import TruckIcon from '@/assets/icons/TruckIcon'

interface CalculatorCardProps {
    title: string,
    weight?: string,
    weightType?: string,
    index?: number,
    image?: string,
    metal?: number,
    metalType?: number,
    calculatorType?: number
}

function CalculatorCard({ title, weight, weightType, metal, metalType, index, calculatorType }: CalculatorCardProps) {
    const dispatch = useAppDispatch()

    let icon = <GoldBarIcon />
    if (metal == 1 && metalType == 0) {
        icon = <GoldBarIcon />
    }
    else if (metal == 1 && metalType == 1) {
        icon = <GoldCoinIcon />
    }
    else if (metal == 2 && metalType == 0) {
        icon = <SilverBarIcon />
    }
    else if (metal == 2 && metalType == 1) {
        icon = <SilverCoinIcon />
    }
    else if (metal == 3 && metalType == 0) {
        icon = <PlatinumBarIcon />
    }
    else if (metal == 3 && metalType == 1) {
        icon = <PlatinumCoinIcon />
    }
    else if (metal == 4) {
        icon = <PalladiumBarIcon />
    }
    else if (metal == 11) {
        icon = <CopperBarIcon />
    }
    else if (calculatorType == 1) {
        icon = <div className="IconCalculatorsPage"><VaultIcon /></div>
    }
    else if (calculatorType == 0) {
        icon = <div className="IconCalculatorsPage"><TruckIcon /></div>
    }

    return (
        <Card className="ShippingCard">
            <Box className="ShippingCardDetails">
                <Stack>
                    <Box className="IconWrapper">
                        <Icon className='GoldBarIcon'>{icon}</Icon>
                    </Box>
                    {weight ? (<Typography variant="subtitle2" className="MetalName">{`${title} ${metalType == 0 ? "Bars" : "Coins"}`}</Typography>) : (
                        <Typography variant="subtitle2" className="MetalName">{title}</Typography>
                    )}
                </Stack>
                {weight && <Typography variant="subtitle1" className="MetalWeight">{`${weight} ${weightType}`}</Typography>}
            </Box>
            {weight && <IconButton className="CrossIconWithOutlineCircle" onClick={() => {
                dispatch(removeCalculator(index))
            }}><CrossIconWithOutlineCircle /></IconButton>}
        </Card>
    )
}

export default CalculatorCard