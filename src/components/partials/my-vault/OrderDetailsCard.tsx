import { Box, Button, Card, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'


function OrderDetailsCard() {
    const orderHistoryDetails = useAppSelector((state) => state.myVault.orderHistory);
    console.log("orderHistoryDetails: ", orderHistoryDetails);

    return (
        <>
        {
            orderHistoryDetails?.items?.map(item => {
            return (
            <Card className="OrderDetailsCard" key={item.orderId} >
                <Stack className="TopWrapper">
                    <Typography className='OrderNumber' variant="subtitle2" component="h3">{item.customOrderNumber}</Typography>
                    <Button variant='contained' color='info'>Details</Button>
                </Stack>
                <Divider />
                <Box className="OderDateInfoWrapper">
                    <Typography className='' variant="body1">Order Date</Typography>
                    <Typography className='' variant="body1">{item.createdOnUtc}</Typography>
                </Box>
                <Stack className='OrderTotalButtonsWrapper'>
                    <Box className='OrderTotalWrapper'>
                        <Typography className='' variant="body1">Order Total</Typography>
                        <Typography className='' variant="body1">{item.orderId}</Typography>
                    </Box>
                    <Stack className='OrderButtonsWrapper'>
                        <Button variant="contained" size="small" color="error">Cancelled</Button>
                        <Button variant="contained" size="small" color="success">Approved Cancellation</Button>
                    </Stack>
                </Stack>
            </Card>
            )
            })
        }
        </>
    )
}

export default OrderDetailsCard