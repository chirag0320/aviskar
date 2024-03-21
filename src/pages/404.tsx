import Box from "@mui/material/Box"
import React, { Suspense, lazy } from "react"

// Components
// import Layout from "../components/common/Layout"
// import Seo from "../components/common/Seo"
const Layout = lazy(() => import("../components/common/Layout"))
const Seo = lazy(() => import("../components/common/Seo"))

function FourZeroFour() {
  return (
    <Suspense fallback={<Box sx={{ height: '100vh', width: '100%' }}></Box>}>
      <Layout>
        <Seo
          title="404"
        />
        404
      </Layout>
    </Suspense>
  )
}

export default React.memo(FourZeroFour)