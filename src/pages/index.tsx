import React, { Suspense, lazy, useEffect, useState } from "react"
import Seo from "../components/common/Seo"
import Banner from '../components/partials/home/Banner'
const MobileSecondaryMenu = lazy(() => import('../components/header/MobileSecondaryMenu'));
const LookingFor = lazy(() => import("../components/partials/home/LookingFor"))
const PopularProducts = lazy(() => import("../components/partials/home/PopularProducts"))
const DiscoverTreasure = lazy(() => import("../components/partials/home/DiscoverTreasure"))
const CloserLook = lazy(() => import("../components/partials/home/CloserLook"))
import FeaturedProducts from "../components/partials/home/FeaturedProducts"
import { ENDPOINTS } from "@/utils/constants"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { CategoriesListDetails, HomePageSectionDetails, configDetails } from "@/redux/reducers/homepageReducer"
import { useAppSelector } from "@/hooks"
import { useMediaQuery } from "@mui/material";
import Layout from "@/components/common/Layout";
import useUserDetailsFromToken from "@/hooks/useUserDetailsFromToken";

function IndexPage() {
  const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
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

  useAPIoneTime({ service: configDetails, endPoint: ENDPOINTS.getConfigStore })
  useAPIoneTime({ service: HomePageSectionDetails, endPoint: ENDPOINTS.homePageSection })
  useAPIoneTime({ service: CategoriesListDetails, endPoint: ENDPOINTS.topCategoriesListWithSubCategories, body })
  useUserDetailsFromToken()
  const [wait1, setWait1] = useState(false)
  const [wait2, setWait2] = useState(false)
  const [wait3, setWait3] = useState(false)
  useEffect(() => {
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
      clearTimeout(timeout1)
      clearTimeout(timeout2)
      clearTimeout(timeout3)
    }
  }, [])

  return (
    <Layout>
      <>
        <Seo
          keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
          title="Home"
          lang="en"
        />
        {isMobile && <Suspense fallback={<></>}> <MobileSecondaryMenu /></Suspense>}
        {configDetailsState?.sliderenableinhome?.value === false ? null : <Banner />}
        {wait1 && <Suspense fallback={<></>}> <FeaturedProducts /></Suspense>}
        {wait1 && <Suspense fallback={<></>}> <LookingFor /></Suspense>}
        {wait1 && <Suspense fallback={<></>}><PopularProducts /></Suspense>}
        {wait2 && <Suspense fallback={<></>}><DiscoverTreasure /></Suspense>}
        {wait3 && <Suspense fallback={<></>}><CloserLook /></Suspense>}
      </>
    </Layout>
  )
}

export default IndexPage
