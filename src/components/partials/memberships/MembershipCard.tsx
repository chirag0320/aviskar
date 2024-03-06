import React from 'react'
import { Link, Typography, Card, CardContent, CardActions, Button, Stack, Box, } from "@mui/material"

interface MembershipCardProps {
    BgColor: string,
    CardTitle: string,
  }

function MembershipCard({BgColor,CardTitle }:MembershipCardProps) {
    const opacityColor = `${BgColor}33`; // '33' represents 20% opacity
    // const opacityColor = `${BgColor}80`; // '33' represents 20% opacity
  return (
   <>
        <Card className="MembershipCard"sx={{
    border: `1px solid ${opacityColor}`,
    '&:hover': {
      border: `1px solid ${BgColor}`,
      '.CardTitle': {
        backgroundColor: BgColor, 
      },
    },
  }}>
            <CardContent>
                <Typography className="CardTitle" variant='h4'sx={{background:opacityColor}} component="h3">{CardTitle}</Typography>
                <Box className="Details">
                    <Stack className="ContentWrapper">
                    <Typography variant="body1" className="ContentTitle">Trade instantly:</Typography>
                    <Typography variant="subtitle1" className="ContentValue">Yes</Typography>
                    </Stack>
                    <Stack className="ContentWrapper">
                    <Typography variant="body1" className="ContentTitle">Limit per trade:</Typography>
                    <Typography variant="subtitle1" className="ContentValue">4999</Typography>
                    </Stack>
                    <Stack className="ContentWrapper">
                    <Typography variant="body1" className="ContentTitle">Lifetime limit:</Typography>
                    <Typography variant="subtitle1" className="ContentValue">9999</Typography>
                    </Stack>
                    <Stack className="ContentWrapper">
                    <Typography variant="body1" className="ContentTitle">Credit card limit:</Typography>
                    <Typography variant="subtitle1" className="ContentValue">500</Typography>
                    </Stack>
                    <Stack className="ContentWrapper">
                    <Typography variant="body1" className="ContentTitle">Bank transfer:</Typography>
                    <Typography variant="subtitle1" className="ContentValue">Yes</Typography>
                    </Stack>
                    <Stack className="ContentWrapper">
                    <Typography variant="body1" className="ContentTitle">Cash per day:</Typography>
                    <Typography variant="subtitle1" className="ContentValue">4999</Typography>
                    </Stack>
                </Box>
            </CardContent>
            <CardActions>
                <Button name='upgradePlan' aria-label='upgradePlan' href="#" variant="outlined" size='large' className="UpgradPlanButton" fullWidth>Upgrade Plan</Button>
            </CardActions>
        </Card>
    </>
  )
}

export default MembershipCard