import { Box, Button, Card, Divider, Stack, Typography } from '@mui/material'
import React from 'react'

function OrderDetailsCard() {
    return (
        <>
            <Card className="OrderDetailsCard">
                <Stack className="TopWrapper">
                    <Typography className='OrderNumber' variant="subtitle2" component="h3">873430878</Typography>
                    <Button variant='contained' color='info'>Details</Button>
                </Stack>
                <Divider />
                <Box className="OderDateInfoWrapper">
                    <Typography className='' variant="body1">Order Date</Typography>
                    <Typography className='' variant="body1">11/27/2023 10:14:51 PM</Typography>
                </Box>
                <Stack className='OrderTotalButtonsWrapper'>
                    <Box className='OrderTotalWrapper'>
                        <Typography className='' variant="body1">Order Total</Typography>
                        <Typography className='' variant="body1">452.4</Typography>
                    </Box>
                    <Stack className='OrderButtonsWrapper'>
                        <Button variant="contained" size="small" color="error">Cancelled</Button>
                        <Button variant="contained" size="small" color="success">Approved Cancellation</Button>
                    </Stack>
                </Stack>
            </Card>
        </>
    )
}

export default OrderDetailsCard