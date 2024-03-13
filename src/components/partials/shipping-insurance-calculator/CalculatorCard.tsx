import React from 'react'
import { Typography, Card, CardContent, Stack, Box, IconButton, Icon, } from "@mui/material"

// Assets
import { CrossIconWithOutlineCircle, GoldBarIcon } from "../../../assets/icons/index"

interface CalculatorCardProps {
    title: string,
    weight: string,
    weightType: string
}

function CalculatorCard({ title, weight, weightType}: CalculatorCardProps) {
    return (
        <>
            <Card className="ShippingCard">
                <Box className="ShippingCardDetails">
                    <Stack>
                        <Box className="IconWrapper">
                            <Icon className='GoldBarIcon'><GoldBarIcon /></Icon>
                        </Box>
                        <Typography variant="subtitle2" className="MetalName">{title}</Typography>
                    </Stack>
                    <Typography variant="subtitle1" className="MetalWeight">{`${weight} ${weightType}`}</Typography>
                </Box>
                <IconButton className="CrossIconWithOutlineCircle"><CrossIconWithOutlineCircle /></IconButton>
            </Card>
        </>
    )
}

export default CalculatorCard