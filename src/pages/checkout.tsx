import React, { useState } from "react"
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
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { getCheckoutPageData } from "@/redux/reducers/checkoutReducer"
import { ENDPOINTS } from "@/utils/constants"
import { useAppSelector } from "@/hooks"
import useDeviceDetails from "@/hooks/useDeviceDetails"

function Checkout() {
  const [state] = useState({service:getCheckoutPageData, endPoint:ENDPOINTS.checkoutDetails})
  useAPIoneTime(state)
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