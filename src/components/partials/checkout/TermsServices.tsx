import React from "react"
import { Typography, Button, FormControlLabel, Checkbox, Container, Box } from "@mui/material"

// Componenets
import StepWrapper from "./StepWrapper"
import StyledDialog from "@/components/common/StyledDialog"

// Hooks
import { useAppSelector, useToggle } from "@/hooks"

// Data
import { userData } from "@/utils/data"

function TermsServices() {
  const { checkoutPageData } = useAppSelector((state) => state.checkoutPage)
  console.log("🚀 ~ Checkout ~ checkoutPageData:", checkoutPageData)
  const [openTermsServices, toggleTermsServices] = useToggle(false)
  return (
    <>
      <StepWrapper title="Terms of service" className="TermsService">
        <Typography className="Condition">
          <span className="TermsService_html" dangerouslySetInnerHTML={{
            __html: checkoutPageData?.termsConditions?.value?.slice(0, 202) + '...'
          }} />
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
        <Container dangerouslySetInnerHTML={{
          __html: checkoutPageData?.termsConditions?.value
        }}>

        </Container>
      </StyledDialog>
    </>
  )
}

export default TermsServices