import React, { useEffect, useState } from "react"
import { Box, FormControlLabel, IconButton, Radio, RadioGroup, Stack, Typography } from "@mui/material"

// Componenets
import StepWrapper from "./StepWrapper"
import { HoverTooltip } from "@/components/common/CustomTooltip"

// Assets
import { InfoIcon, BankIcon, CashIcon, CardIcon } from "@/assets/icons"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { updateFinalDataForTheCheckout } from "@/redux/reducers/checkoutReducer"

function Step3() {
  const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
  console.log("🚀 ~ Step3 ~ configDetailsState:", configDetailsState)
  const dispatch = useAppDispatch()
  const [paymentType, setPaymentType] = useState('BankTransfer')
  const { checkoutPageData } = useAppSelector((state) => state.checkoutPage)
  useEffect(() => {
    dispatch(updateFinalDataForTheCheckout({ paymentType }))
  }, [paymentType])
  const renderRadioLabelWithIcon = (label: string, icon: React.ReactElement, price?: string, helperText?: string) => {
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
              {helperText}
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
        <RadioGroup name="payment-method" defaultValue="BankTransfer" row value={paymentType} onChange={(e) => {
          setPaymentType(e.target.value)
        }}>
          {checkoutPageData?.storeDetail?.isBankTransfer && <FormControlLabel value="BankTransfer" control={<Radio />} label={renderRadioLabelWithIcon("Bank Transfer", <BankIcon />, undefined, configDetailsState?.["checkout.payment.banktransferinfotext"]?.value)} />}
          {checkoutPageData?.storeDetail?.isCash && <FormControlLabel value="Cash" control={<Radio />} label={renderRadioLabelWithIcon("Cash", <CashIcon />, undefined, configDetailsState?.["checkout.payment.cashinfotext"]?.value)} />}
          {checkoutPageData?.storeDetail?.isCreditCard && <FormControlLabel value="CreditCard" control={<Radio />} label={renderRadioLabelWithIcon("Credit Card", <CardIcon />, checkoutPageData?.storeDetail?.creadatcardTax?.toString(), configDetailsState?.["checkout.payment.creditcardinfotext"]?.value)} />}
        </RadioGroup>
      </Stack>
    </StepWrapper>
  )
}

export default Step3