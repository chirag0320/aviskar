import React from 'react'
import { Link, Typography, Card, CardContent, CardActions, Button, Stack, Box, } from "@mui/material"
import { useAppDispatch, useAppSelector } from '@/hooks';
import { capitalizeFirstChar } from '@/utils/common';
import ConfigServices from '@/apis/services/ConfigServices';

interface MembershipCardProps {
  bgcolor: string,
  details: any,
  cardtitle: string,
  handleUpgradPlan: (title:any)=>void
}

function MembershipCard({ bgcolor, cardtitle, details, handleUpgradPlan }: MembershipCardProps) {
  const { mebershipPlanDetailsData } = useAppSelector((state) => state.homePage)
  const isCurrentPlan = cardtitle?.toLocaleLowerCase() === mebershipPlanDetailsData?.currentMemberShip?.toLocaleLowerCase()
  const opacityColor = `${bgcolor}80`;
  return (
    <>
      <Card
        className={`MembershipCard ${isCurrentPlan ? ' ActiveCard' : ''}`}
        sx={{
          border: `1px solid ${opacityColor}`,
          '&.ActiveCard': {
            border: `1px solid ${bgcolor}`,
          },
          '&:hover': {
            border: `1px solid ${bgcolor}bf`,
            '.CardTitle': {
              backgroundColor: `${bgcolor}bf`,
            },
          },
        }}
      >
        <CardContent>
          <Typography className="CardTitle" variant='h4' sx={{ background: opacityColor }} component="h3">{capitalizeFirstChar(cardtitle)}</Typography>
          <Box className="Details" dangerouslySetInnerHTML={{ __html: details }}>
            {/* <Stack className="ContentWrapper">
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
            </Stack> */}
          </Box>
        </CardContent>
        <CardActions className="UpgradPlanButtonWrapper">
          <Button name='upgradePlan' aria-label='upgradePlan' variant="outlined" size='large' className="UpgradPlanButton" fullWidth onClick={()=>{handleUpgradPlan(cardtitle.toLocaleLowerCase())}}>{isCurrentPlan ? 'Current Plan' : 'Upgrade Plan'}</Button>
        </CardActions>
      </Card >
    </>
  )
}

export default MembershipCard