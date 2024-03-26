import React, { useEffect } from "react"
import { Button, Stack, TextField } from "@mui/material"

// Componenets
import StyledDialog from "@/components/common/StyledDialog"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { disableOTP, orderPlaceOTPVerify } from "@/redux/reducers/checkoutReducer"
import { ENDPOINTS } from "@/utils/constants"

interface OTPConfirmation {
  open: boolean
  onClose: () => void
}

function OTPConfirmation(props: OTPConfirmation) {
  const dispatch = useAppDispatch();
  const { open, onClose } = props
  const { isOTPVerified } = useAppSelector((state) => state.checkoutPage)
  const [otp, setOTP] = React.useState('')

  useEffect(() => {
    if (isOTPVerified) {
      // call place order API
      dispatch(disableOTP());
      onClose()

    }
  }, [isOTPVerified])


  const otpSubmissionHandler = async () => {
    // console.log('OTP Submitted', otp)
    dispatch(orderPlaceOTPVerify({ url: ENDPOINTS.KioskPlaceOrderVerifyOTP, body: { otp: otp } }));
  }

  return (
    <StyledDialog
      id="OTPConfirmation"
      dialogTitle="OTP Confirmation"
      open={open}
      onClose={onClose}
    >
      <TextField type="number" placeholder="Enter OTP" fullWidth value={otp} onChange={(e) => {
        setOTP(e.target.value)
      }} />
      <Stack className="ActionWrapper">
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
        <Button variant="contained" onClick={otpSubmissionHandler}>
          Submit
        </Button>
      </Stack>
    </StyledDialog>
  )
}

export default OTPConfirmation