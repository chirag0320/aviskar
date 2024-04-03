import React, { Suspense, lazy } from "react"
import { Box, Container, Typography, Button } from "@mui/material/"

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
        <Box className="ErrorPage">
          <Container>
            <Box className="ErrorPageWrapper">
              <Typography className="ErrorTitle" component="h2">404</Typography>
              <Typography className="ErrorDescription" component="p" variant="subtitle1">Oops! The page you are looking for does not exist. It might have been removed or deteled.</Typography>
              <Button variant="contained">Back to Home</Button>
            </Box>
          </Container>
        </Box>
        {/* Related products */}
        <Box sx={{ mt: 1 }}>

        </Box>
      </Layout>
    </Suspense>
  )
}

export default React.memo(FourZeroFour)