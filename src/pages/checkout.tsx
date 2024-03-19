import React from "react"
import { Box, Container, Stack } from "@mui/material"

// Componenets
import Layout from "@/components/common/Layout"
import Seo from "@/components/common/Seo"
import { PageTitle } from "@/components/common/Utils"

// Data
import TermsServices from "@/components/partials/checkout/TermsServices"
import Step1 from "@/components/partials/checkout/Step1"
import Step2 from "@/components/partials/checkout/Step2"
import Step3 from "@/components/partials/checkout/Step3"
import OrderSummary from "@/components/partials/checkout/OrderSummary"

function Checkout() {
  return (
    <Layout>
      <Seo
        keywords={[`QMint categories`]}
        title="Category"
        lang="en"
      />
      <PageTitle title="Checkout" />
      <Container id="PageCheckout">
        <Stack className="AllSteps">
          <Step1 />
          <Step2 />
          <Step3 />
          <TermsServices />
        </Stack>
        <OrderSummary />
      </Container>
    </Layout>
  )
}

export default Checkout