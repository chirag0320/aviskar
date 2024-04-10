import React, { Suspense, lazy, useCallback, useState } from "react"
import { useMediaQuery, useScrollTrigger, AppBar, Box, Divider, Skeleton } from "@mui/material"

// Components
const FrontPricing = lazy(() => import('./FrontPricing'))
const FrontMain = lazy(() => import('./FrontMain'))
import { PageLoader } from './Loader'
import { useAppSelector } from "@/hooks"
const MobileMenu = lazy(() => import('./MobileMenu'))

const FrontHeader = () => {
    const loading = useAppSelector((state) => state.homePage.loading)
    const [isFrontPage] = useState(true)
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
        <Box id="HeaderWrapper" className="FrontHeader">
            {!isMobile && <>
                <Suspense fallback={<Skeleton style={{ minHeight: '60px' }} />}>
                    <FrontPricing />
                </Suspense>
                <Divider sx={{ borderBottom: '1px solid #FFFFFF33' }} />
            </>}
            <AppBar position={trigger ? "fixed" : "static"}>
                {loading && <PageLoader />}
                <Suspense fallback={<Skeleton style={{ minHeight: '80px' }} />}>
                    <FrontMain toggleMobileMenu={toggleMobileMenu} openMobileMenu={openMobileMenu} />
                </Suspense>
            </AppBar>
            <Suspense fallback={<></>}>
                {isMobile && openMobileMenu && <MobileMenu open={isMobile && openMobileMenu} trigger={trigger} toggleMobileMenu={toggleMobileMenu} isFrontPage={isFrontPage} />}
            </Suspense >
        </Box >
    )
}

export default FrontHeader