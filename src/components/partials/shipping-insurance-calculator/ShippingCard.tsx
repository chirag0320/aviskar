import React from 'react'
import { Typography, Card, CardContent, Stack, Box, IconButton, } from "@mui/material"

// Assets
import { CrossIconWithOutlineCircle } from "../../../assets/icons/index"

interface ShippingCardProps {
    cardtitle: string,
}

function ShippingCard({ cardtitle }: ShippingCardProps) {
    return (
        <>
            <Card className="ShippingCard">
                <Box className="ShippingCardDetails">
                    <Stack>
                        <Box className="IconWrapper">
                            {/* <Icon className="MetalIcon"></Icon> */}
                        </Box>
                        <Typography variant="subtitle2" className="MetalName">{cardtitle}</Typography>
                    </Stack>
                    <Typography variant="subtitle1" className="MetalWeight">1010 grams</Typography>
                </Box>
                <IconButton className="CrossIconWithOutlineCircle"><CrossIconWithOutlineCircle /></IconButton>
            </Card>
        </>
    )
}

export default ShippingCard