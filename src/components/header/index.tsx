import React, { Suspense, lazy, useCallback, useMemo, useState } from "react"
import { useMediaQuery, useScrollTrigger, AppBar, Box, Divider, Skeleton } from "@mui/material"

// Components
const Pricing = lazy(() => import('./Pricing'))
// import Pricing from './Pricing'
// import Main from './Main'
const Main = lazy(() => import('./Main'))
import { PageLoader } from './Loader'
const Navigation = lazy(() => import('./Navigation'))
import { useAppSelector } from "@/hooks"
// import MobileMenu from './MobileMenu'
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
      <Suspense fallback={<Skeleton style={{ minHeight: '60px' }} />}>
        <Pricing />
      </Suspense>
      <Divider />
      <AppBar position={trigger ? "fixed" : "static"}>
        {loading && <PageLoader />}
        <Suspense fallback={<Skeleton style={{ minHeight: '90px', transform: "none" }} />}>
          <Main toggleMobileMenu={toggleMobileMenu} />
        </Suspense>
        <Divider />
        <Suspense fallback={<Skeleton style={{ minHeight: '60px' }} />}>
          <Navigation />
        </Suspense>
      </AppBar>
      <Suspense fallback={<></>}>
        {isMobile && openMobileMenu && <MobileMenu open={isMobile && openMobileMenu} trigger={trigger} toggleMobileMenu={toggleMobileMenu} />}
      </Suspense >
    </Box >
  )
}

export default React.memo(Index)