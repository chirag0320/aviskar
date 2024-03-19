import React from "react"
import { Box, FormControlLabel, IconButton, Radio, RadioGroup, Stack, Typography } from "@mui/material"

// Componenets
import StepWrapper from "./StepWrapper"
import { HoverTooltip } from "@/components/common/CustomTooltip"

// Assets
import { InfoIcon, BankIcon, CashIcon, CardIcon } from "@/assets/icons"

function Step3() {

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
        <RadioGroup name="payment-method" defaultValue="BankTransfer" row>
          <FormControlLabel value="BankTransfer" control={<Radio />} label={renderRadioLabelWithIcon("Bank Transfer", <BankIcon />)} />
          <FormControlLabel value="Cash" control={<Radio />} label={renderRadioLabelWithIcon("Cash", <CashIcon />)} />
          <FormControlLabel value="CreditCard" control={<Radio />} label={renderRadioLabelWithIcon("Credit Card", <CardIcon />, "$81.47")} />
        </RadioGroup>
      </Stack>
    </StepWrapper>
  )
}

export default Step3