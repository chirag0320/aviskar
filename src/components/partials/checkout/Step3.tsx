import React, { useState } from "react"
import { Box, FormControlLabel, IconButton, Radio, RadioGroup, Stack, Typography } from "@mui/material"

// Componenets
import StepWrapper from "./StepWrapper"
import { HoverTooltip } from "@/components/common/CustomTooltip"

// Assets
import { InfoIcon, BankIcon, CashIcon, CardIcon } from "@/assets/icons"
import { useAppSelector } from "@/hooks"

function Step3() {
  const [paymentType, setPaymentType] = useState('BankTransfer')
  const { checkoutPageData } = useAppSelector((state) => state.checkoutPage)
  const renderRadioLabelWithIcon = (label: string, icon: React.ReactElement, price?: string) => {
    return (
      <Stack className="RadioLabelWithIcon">
        {icon}
        <Stack className="Wrapper">
          <Typography variant="body2" className="Label">
            {label}
            <HoverTooltip
              placement="top-end"
              renderComponent={<IconButton className="InfoButton"><InfoIcon /></IconButton>}
              infoTooltip
              arrow
            >
              This is a helper text about payment method. Lorem, ipsum dolor.
            </HoverTooltip>
          </Typography>
          <Typography variant="subtitle1">{price ? price : "Free"}</Typography>
        </Stack>
      </Stack>
    )
  }

  return (
    <StepWrapper title="Step 3" className="Step3">
      <Stack className="PaymentMethod">
        <Typography variant="subtitle1">Select your payment method</Typography>
        <RadioGroup name="payment-method" defaultValue="BankTransfer" row value={paymentType} onChange={(e)=>{
          setPaymentType(e.target.value)
        }}>
          {checkoutPageData?.storeDetail?.isBankTransfer && <FormControlLabel value="BankTransfer" control={<Radio />} label={renderRadioLabelWithIcon("Bank Transfer", <BankIcon />)} />}
          {checkoutPageData?.storeDetail?.isCash && <FormControlLabel value="Cash" control={<Radio />} label={renderRadioLabelWithIcon("Cash", <CashIcon />)} />}
          {checkoutPageData?.storeDetail?.isCreditCard && <FormControlLabel value="CreditCard" control={<Radio />} label={renderRadioLabelWithIcon("Credit Card", <CardIcon />, checkoutPageData?.storeDetail?.creadatcardTax?.toString())} />}
        </RadioGroup>
      </Stack>
    </StepWrapper>
  )
}

export default Step3