import React, { Suspense, lazy, useEffect, useState } from "react"
import { Skeleton } from "@mui/material";
import Seo from "../components/common/Seo"
import Banner from '../components/partials/frontPage/Banner'
const MobileSecondaryMenu = lazy(() => import('../components/header/MobileSecondaryMenu'));
const LookingFor = lazy(() => import("../components/partials/home/LookingFor"))
const PopularProducts = lazy(() => import("../components/partials/home/PopularProducts"))
const DiscoverTreasure = lazy(() => import("../components/partials/home/DiscoverTreasure"))
import LazyHeader from "../components/header/FrontHeader"
const CloserLookMain = lazy(() => import("../components/partials/frontPage/CloserLookMain"))
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
import { CategoriesListDetails, HomePageSectionDetails, configDetails, getMainHomePageData, serProgressLoaderStatus, setScrollPosition } from "@/redux/reducers/homepageReducer"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { Box, useMediaQuery } from "@mui/material";
import Layout from "@/components/common/Layout";
import useUserDetailsFromToken from "@/hooks/useUserDetailsFromToken";
import Toaster from "@/components/common/Toaster";
import Loader from "@/components/common/Loader";
import MainLayout from "@/components/common/MainLayout";
import RenderOnViewportEntry from "@/components/common/RenderOnViewportEntry";

function MainHomePage() {
    const dispatch = useAppDispatch()
    const { configDetails: configDetailsState, openToaster, scrollPosition, loading, mainHomePageData } = useAppSelector((state) => state.homePage)
    // const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'))
    useEffect(() => {
        return () => {
            dispatch(setScrollPosition(window.scrollY));
        }
    }, [])

    // useAPIoneTime({ service: HomePageSectionDetails, endPoint: ENDPOINTS.homePageSection })
    useUserDetailsFromToken()
    useEffect(() => {
        dispatch(serProgressLoaderStatus(true))
        return () => {
            dispatch(serProgressLoaderStatus(false))
        }
    }, [])
    useAPIoneTime({ service: configDetails, endPoint: ENDPOINTS.getConfigStore })

    return (
        <div className="flex flex-col min-h-screen">
            {/* <Suspense fallback={<Box id="HeaderWrapper"></Box>}> */}
            <MainLayout>
                <Loader open={loading} />
                {openToaster && <Toaster />}
                <Seo
                    keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
                    title="Home"
                    lang="en"
                />
                {/* {isMobile && <Suspense fallback={<></>}> <MobileSecondaryMenu /></Suspense>} */}
                <Box className="FrontPage">
                    {configDetailsState?.sliderenableinhome?.value === false ? null : <Banner />}
                    <RenderOnViewportEntry threshold={0.25} style={{minHeight: '240px'}}><Locations /></RenderOnViewportEntry>
                    <RenderOnViewportEntry threshold={0.25} style={{minHeight: '240px'}}><Adventure /></RenderOnViewportEntry>
                    <RenderOnViewportEntry threshold={0.25} style={{minHeight: '240px'}}><Experience /></RenderOnViewportEntry>
                    <RenderOnViewportEntry threshold={0.25} style={{minHeight: '240px'}}><KnowMore /></RenderOnViewportEntry>
                    <RenderOnViewportEntry threshold={0.25} style={{minHeight: '240px'}}><LatestStories /></RenderOnViewportEntry>
                    <RenderOnViewportEntry threshold={0.25} style={{minHeight: '240px'}}><Gallery /></RenderOnViewportEntry>
                    <RenderOnViewportEntry threshold={0.25} style={{minHeight: '240px'}}><CloserLookMain /></RenderOnViewportEntry>
                    <RenderOnViewportEntry threshold={0.25} style={{minHeight: '240px'}}><TheJournal /></RenderOnViewportEntry>
                </Box>
            </MainLayout>
        </div>
    )
}

export default MainHomePage
