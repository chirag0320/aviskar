import React, { Suspense, lazy, useCallback, useState } from "react"
import { useMediaQuery, useScrollTrigger, AppBar, Box, Divider, Skeleton } from "@mui/material"
const MobileSecondaryMenu = lazy(() => import('./MobileSecondaryMenu'));


// Components
const Pricing = lazy(() => import('./Pricing'))
const Main = lazy(() => import('./Main'))
import { PageLoader } from './Loader'
const Navigation = lazy(() => import('./Navigation'))
import { useAppSelector } from "@/hooks"
const MobileMenu = lazy(() => import('./MobileMenu'))

const Index = () => {
  const loading = useAppSelector((state) => state.homePage.loading)
  const [openMobileMenu, setOpenMobileMenu] = useState(false)
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'))
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: isMobile ? 68 : 50,
  })
  const toggleMobileMenu = useCallback(() => {
    setOpenMobileMenu(!openMobileMenu)
  }, [openMobileMenu])

  return (
    <Box id="HeaderWrapper">
      {!isMobile && <>
        <Suspense fallback={<Skeleton style={{ minHeight: '60px' }} />}>
          <Pricing />
        </Suspense>
        <Divider />
      </>}
      <AppBar position={trigger ? "fixed" : "static"}>
        {loading && <PageLoader />}
        <Suspense fallback={<Skeleton style={{ minHeight: '80px' }} />}>
          <Main toggleMobileMenu={toggleMobileMenu} openMobileMenu={openMobileMenu} />
        </Suspense>
        <Divider />
        <Suspense fallback={<Skeleton style={{ minHeight: '53px' }} />}>
          <Navigation />
        </Suspense>
      </AppBar>
      <Suspense fallback={<></>}>
        {isMobile && openMobileMenu && <MobileMenu open={isMobile && openMobileMenu} trigger={trigger} toggleMobileMenu={toggleMobileMenu} />}
      </Suspense >
      {isMobile && <Suspense fallback={<></>}> <MobileSecondaryMenu /></Suspense>}
    </Box >
  )
}

export default Index