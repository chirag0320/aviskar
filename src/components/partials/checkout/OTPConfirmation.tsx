import React, { useEffect } from "react"
import { Box, Button, Stack, TextField, Typography } from "@mui/material"

// Componenets
import StyledDialog from "@/components/common/StyledDialog"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { disableOTP, orderPlaceOTPVerify, removeOTPvalidationMessage } from "@/redux/reducers/checkoutReducer"
import { ENDPOINTS } from "@/utils/constants"
import Toaster from "@/components/common/Toaster"
import useShowToaster from "@/hooks/useShowToaster"

interface OTPConfirmation {
  open: boolean
  onClose: () => void
  message?: string | null | undefined
  placeOrderFun?: any 
}

function OTPConfirmation(props: OTPConfirmation) {
  const { showToaster } = useShowToaster();
  const { finalDataForTheCheckout } = useAppSelector((state) => state.checkoutPage)
  const dispatch = useAppDispatch();
  const { open, onClose, message, placeOrderFun } = props
  const { isOTPVerified, otpverfiedMessage } = useAppSelector((state) => state.checkoutPage)
  const [otp, setOTP] = React.useState('')

  useEffect(() => {
    if (isOTPVerified) {
      // call place order API
      placeOrderFun()
      dispatch(disableOTP());
      onClose()
    }
  }, [isOTPVerified])


  const otpSubmissionHandler = async () => {
    dispatch(orderPlaceOTPVerify({
      url: ENDPOINTS.KioskPlaceOrderVerifyOTP, body: {
        otp: otp, contactNo: finalDataForTheCheckout?.userAccount
          ?.phoneNumber
      }
    }));
  }
  useEffect(()=>{
    if(otpverfiedMessage){
      showToaster({ message: otpverfiedMessage, severity: isOTPVerified ? 'success' : 'error' })
      dispatch(removeOTPvalidationMessage())
    }
  },[otpverfiedMessage, isOTPVerified])

  return (
    <>
      <StyledDialog
        id="OTPConfirmation"
        dialogTitle={message ? 'Message' : "OTP Confirmation"}
        open={open}
        onClose={onClose}
      >
        {message ? <Box dangerouslySetInnerHTML={{
          __html: message
        }}></Box> : <TextField type="number" placeholder="Enter OTP" fullWidth value={otp} onChange={(e) => {
          setOTP(e.target.value)
        }} />}
        {!message && <Stack className="ActionWrapper">
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
          <Button variant="contained" onClick={otpSubmissionHandler}>
            Submit
          </Button>
        </Stack>}
      </StyledDialog>
    </>
  )
}

export default OTPConfirmation