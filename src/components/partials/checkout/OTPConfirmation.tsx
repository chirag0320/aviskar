import React from "react"
import { Button, Stack, TextField } from "@mui/material"

// Componenets
import StyledDialog from "@/components/common/StyledDialog"

interface OTPConfirmation {
  open: boolean
  onClose: () => void
}

function OTPConfirmation(props: OTPConfirmation) {
  const { open, onClose } = props

  return (
    <StyledDialog
      id="OTPConfirmation"
      dialogTitle="OTP Confirmation"
      open={open}
      onClose={onClose}
    >
      <TextField type="number" placeholder="Enter OTP" fullWidth />
      <Stack className="ActionWrapper">
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
        <Button variant="contained" onClick={onClose}>
          Submit
        </Button>
      </Stack>
    </StyledDialog>
  )
}

export default OTPConfirmation