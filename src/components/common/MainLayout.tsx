import { Stack } from '@mui/material'
import React, { Suspense, lazy } from 'react'
// import FrontHeader from '../header/FrontHeader';
// import LazyFrontHeader from 
const LazyFrontHeader = lazy(() => import("../header/FrontHeader"));
const LazyFrontFooter = lazy(() => import('../footer/FrontFooter'));

const MainLayout = ({ children }: { children: any }) => {
    return (
        <Stack id="PageLayout">
            <Suspense fallback={<></>}>
                <LazyFrontHeader />
            </Suspense>
            <main>
                {children}
            </main>
            {<Suspense fallback={
                <></>
            }>
                <LazyFrontFooter />
            </Suspense>}
        </Stack>
    )
}

export default MainLayout