import React, { Suspense, lazy, useEffect, useState } from "react"
import { Box, Typography, Button, useMediaQuery, Theme, Skeleton } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, Pagination, A11y } from 'swiper/modules'

// Utils
const SwiperNavigation = lazy(() => import('../../common/Utils').then((module) => ({ default: module.SwiperNavigation })))
import useApiRequest from "@/hooks/useAPIRequest"
import { Url } from "url"
import { ENDPOINTS } from "@/utils/constants"
import { StaticImage } from "gatsby-plugin-image"

interface IbannerData {
  id: number,
  storeCode: number,
  url: Url,
  displayOrder: number,
  sliderTime: number,
  htmlCode: any,
  isImgUrl: boolean,
  cdnUrlLarge: any,
  cdnUrlSmall: any
}
function Banner() {
  const { data }: any = useApiRequest(ENDPOINTS.getSlider);
  const isLargeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))
  const [tempImgHide, setTempImgHide] = useState(true)
  const [config, setConfig] = useState({
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: ".SwiperButtonNext",
      prevEl: ".SwiperButtonPrev",
      disabledClass: "SwiperButtonDisabled"
    },
    pagination: {
      clickable: true,
    },
    loop: true,
    speed: 300,
    modules: [Navigation, Autoplay, Pagination, A11y],
    scrollbar: {
      draggable: true
    },
    grabCursor: true,
    // autoplay: {
    //   delay: 4000,
    // },
  })
  useEffect(() => {
    const x = setTimeout(() => {
      setTempImgHide(false)
      setConfig((prev) => ({ ...prev, autoplay: { delay: 4000 } }))
    }, 10000);
    return () => {
      clearTimeout(x)
    }
  }, [])

  return (
    <Box id="Banner" component="section" key={'banner'}>
      <Typography variant="h2" className="BannerTitle">Top articles</Typography>
      <Box className="SwiperContainer">
        <Swiper {...config} >
          {data?.data?.length > 0 ?
            <>
              {
                data?.data?.map((item: IbannerData, index: number) => {
                  return (
                    <SwiperSlide key={`BannerSlider-${index}`}>
                      <Box className="Wrapper" sx={{ position: 'relative', width: '100%', height: '100%' }}>
                        <img
                          rel="prefetch"
                          loading="eager"
                          src={isLargeScreen ? item.cdnUrlLarge : item.cdnUrlSmall}
                          alt="background"
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'fill' }}
                        />
                      </Box>
                    </SwiperSlide>
                  )
                })
              }
            </>
            :
            <>
              {!isMobile ? <Skeleton animation="wave" height="75vh" width="100vw" style={{ transform: "none", margin: "auto", borderRadius: "0px" }} /> : <Skeleton animation="wave" height="300px" width="100vw" style={{ transform: "none", margin: "auto", borderRadius: "0px" }} />}
            </>
          }
        </Swiper>
        {data?.data?.length > 0 ? <Suspense fallback={<></>}><SwiperNavigation /></Suspense> : null}
      </Box>
    </Box >
  )
}

export default React.memo(Banner)