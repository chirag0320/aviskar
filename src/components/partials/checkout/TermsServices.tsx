import React from "react"
import { Typography, Button, FormControlLabel, Checkbox } from "@mui/material"

// Componenets
import StepWrapper from "./StepWrapper"
import StyledDialog from "@/components/common/StyledDialog"

// Hooks
import { useToggle } from "@/hooks"

// Data
import { userData } from "@/utils/data"

function TermsServices() {
  const [openTermsServices, toggleTermsServices] = useToggle(false)
  return (
    <>
      <StepWrapper title="Terms of service" className="TermsService">
        <Typography className="Condition">
          Your order is about to be locked at the agreed market price. Please review our terms of service before confirming your order. Should you require clarification or additional information please contact our support team on {userData.mobileNumber}. You will also have the opportunity to review this Agreement during initial registration.
          <Button className="ReadMore" onClick={toggleTermsServices}>Read More</Button>
        </Typography>
        <FormControlLabel
          className="Checkbox"
          control={<Checkbox />}
          label="I have read and agree to the terms of service."
        />
      </StepWrapper>
      <StyledDialog
        id="TermsServices"
        open={openTermsServices}
        dialogTitle="Terms of services"
        onClose={toggleTermsServices}
        primaryActionText="Agree"
        actions
      >
        <Typography variant="body2" gutterBottom>Your order is about to be locked at the agreed market price. Please review our terms of service before confirming your order. Should you require clarification or additional information please contact our support team on +61 7 3184 8300.</Typography>
        <Typography variant="body2" gutterBottom>You will also have the opportunity to review this Agreement during initial registration and before you confirm an order with Queensland Mint. The definitions of terms and phrases as well as general rules for interpreting this Agreement are contained at the end of this Agreement.</Typography>
        <Typography variant="body2">1. Agreement</Typography>
        <Typography variant="body2">1.1 This Agreement contains the terms of service that governs the relationship of Queensland Mint Pty Ltd ABN 57 164 269 210 (Queensland Mint) and the person or entity using Queensland Mint's services (you).</Typography>
        <Typography variant="body2">1.2 By using the Website or any other Services provided by Queensland Mint, including making purchases from Queensland Mint, making sales to Queensland Mint, placing orders with Queensland Mint, reading articles from Queensland Mint, watching videos from Queensland Mint, viewing pricing data or charts from Queensland Mint, you are agreeing to the terms and conditions set out in this Agreement. Before you may place orders to purchase and/or to sell with Queensland Mint you must read and accept all of the terms in the Agreement.</Typography>
        <Typography variant="body2">2. Warranties and acknowledgements</Typography>
      </StyledDialog>
    </>
  )
}

export default TermsServices