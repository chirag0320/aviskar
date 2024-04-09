import React, { Suspense, lazy, useEffect, useState } from "react"
import { Skeleton } from "@mui/material";
import Seo from "../components/common/Seo"
import Banner from '../components/partials/frontPage/Banner'
const MobileSecondaryMenu = lazy(() => import('../components/header/MobileSecondaryMenu'));
const LookingFor = lazy(() => import("../components/partials/home/LookingFor"))
const PopularProducts = lazy(() => import("../components/partials/home/PopularProducts"))
const DiscoverTreasure = lazy(() => import("../components/partials/home/DiscoverTreasure"))
import LazyHeader from "../components/header/FrontHeader"
const CloserLook = lazy(() => import("../components/partials/home/CloserLook"))
const TheJournal = lazy(() => import("../components/partials/frontPage/TheJournal"))
const Locations = lazy(() => import("../components/partials/frontPage/Locations"))
const Adventure = lazy(() => import("../components/partials/frontPage/Adventure"))
const Experience = lazy(() => import("../components/partials/frontPage/Experience"))
const KnowMore = lazy(() => import("../components/partials/frontPage/KnowMore"))
const LatestStories = lazy(() => import("../components/partials/frontPage/LatestStories"))
const Gallery = lazy(() => import("../components/partials/frontPage/Gallery"))
const LazyFooter = lazy(() => import('../components/footer/FrontFooter'));
import FeaturedProducts from "../components/partials/home/FeaturedProducts"
import { ENDPOINTS } from "@/utils/constants"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { CategoriesListDetails, HomePageSectionDetails, configDetails, serProgressLoaderStatus, setScrollPosition } from "@/redux/reducers/homepageReducer"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { Box, useMediaQuery } from "@mui/material";
import Layout from "@/components/common/Layout";
import useUserDetailsFromToken from "@/hooks/useUserDetailsFromToken";
import Toaster from "@/components/common/Toaster";
import Loader from "@/components/common/Loader";

function MainHomePage() {
    const dispatch = useAppDispatch()
    const { configDetails: configDetailsState, openToaster, scrollPosition, loading } = useAppSelector((state) => state.homePage)
    const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

    const [body] = useState({
        "search": "",
        "pageNo": 0,
        "pageSize": -1,
        "sortBy": "",
        "sortOrder": "",
        "filters": {
            "includeInTopMenu": true
        }
    })

    useEffect(() => {
        return () => {
            dispatch(setScrollPosition(window.scrollY));
        }
    }, [])

    useAPIoneTime({ service: HomePageSectionDetails, endPoint: ENDPOINTS.homePageSection })
    // useAPIoneTime({ service: CategoriesListDetails, endPoint: ENDPOINTS.topCategoriesListWithSubCategories, body })
    useUserDetailsFromToken()
    const [wait1, setWait1] = useState(false)
    const [wait2, setWait2] = useState(false)
    const [wait3, setWait3] = useState(false)
    useEffect(() => {
        dispatch(serProgressLoaderStatus(true))
        const timeout1 = setTimeout(() => {
            setWait1(true);
        }, 400); // Wait for 300ms before rendering the first component
        const timeout2 = setTimeout(() => {
            setWait2(true);
        }, 900);
        const timeout3 = setTimeout(() => {
            setWait3(true)
        }, 1100);
        return () => {
            dispatch(serProgressLoaderStatus(false))
            clearTimeout(timeout1)
            clearTimeout(timeout2)
            clearTimeout(timeout3)
        }
    }, [])

    return (
        <div className="flex flex-col min-h-screen">
            {/* <Suspense fallback={<Box id="HeaderWrapper"></Box>}> */}
            <LazyHeader />
            <>
                {/* <Loader open={loading} /> */}
                {openToaster && <Toaster />}
                <Seo
                    keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
                    title="Home"
                    lang="en"
                />
                {/* {isMobile && <Suspense fallback={<></>}> <MobileSecondaryMenu /></Suspense>} */}
                <Box className="FrontPage">
                    {configDetailsState?.sliderenableinhome?.value === false ? null : <Banner />}
                    <Suspense fallback={<></>}><Locations /></Suspense>
                    <Suspense fallback={<></>}><Adventure /></Suspense>
                    <Suspense fallback={<></>}><Experience /></Suspense>
                    <Suspense fallback={<></>}><KnowMore /></Suspense>
                    <Suspense fallback={<></>}><LatestStories /></Suspense>
                    <Suspense fallback={<></>}><Gallery /></Suspense>
                    <Suspense fallback={<></>}><CloserLook /></Suspense>
                    <Suspense fallback={<></>}><TheJournal /></Suspense>
                </Box>
            </>
            {<Suspense fallback={<Skeleton height='30vh'></Skeleton>}>
                <LazyFooter />
            </Suspense>}
        </div>
    )
}

export default MainHomePage
