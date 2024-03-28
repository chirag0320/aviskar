import React, { useEffect, useLayoutEffect, useState } from "react"
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
import { navigate } from "gatsby"
import Toaster from "@/components/common/Toaster"

function Checkout() {
  const openToaster = useAppSelector(state => state.homePage.openToaster)
  const [state, setState] = useState({ service: getCheckoutPageData, endPoint: ENDPOINTS.checkoutDetails })
  const isLoggedIn = useAppSelector(state => state.homePage.isLoggedIn)

  if (!isLoggedIn) {
    navigate('/login', { replace: true })
    return;
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isInstantBuy = urlParams.get('isInstantBuy')
    setState((prev: any) => ({ ...prev, params: { isInstantBuy: isInstantBuy ?? false } }))
  }, [window.location.search])
  useAPIoneTime(state)
  return (
    <Layout>
      <Seo
        keywords={[`QMint categories`]}
        title="Category"
        lang="en"
      />
      {openToaster && <Toaster />}
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