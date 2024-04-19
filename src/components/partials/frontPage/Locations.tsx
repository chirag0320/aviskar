import React from 'react'
import { Box, Container, Typography, Button } from '@mui/material'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, Pagination, A11y, Grid } from 'swiper/modules'
import { SwiperNavigation } from "@/components/common/Utils"

// Utills
import { SectionHeading } from "../../common/Utils"
import { useAppSelector } from '@/hooks'
import noImage from '../../../assets/images/noImage.png'
import { navigate } from 'gatsby'

function Locations() {
    const { mainHomePageData, configDetails } = useAppSelector((state) => state.homePage)
    const config = {
        slidesPerView: 4,
        slidesPerColumn: 2,
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
        modules: [Navigation, Autoplay, A11y, Grid],
        scrollbar: {
            draggable: true
        },
        grabCursor: true,
        autoplay: {
            delay: 8000,
        },
        breakpoints: {
            1200: {
                slidesPerView: 4,
            },
            900: {
                slidesPerView: 3,
            },
            260: {
                slidesPerView: 2,
                slidesPerColumn: 2,
                spaceBetween: 20,
            },
        },
    }
    return (
        (mainHomePageData && mainHomePageData?.beyond?.length > 0) ?
            <Box id="Location">
                <Container maxWidth="lg">
                    <Box className="LocationsWrapper">
                        <SectionHeading title={configDetails?.["mainhomepage.beyondtital"]?.value} description={configDetails?.["mainhomepage.beyondsubtital"]?.value} />
                        <Box component="section" key={'Locations'}>
                            <Box className="SwiperContainer">
                                <Swiper {...config} >
                                    {(mainHomePageData && mainHomePageData?.beyond?.length > 0) ?
                                        mainHomePageData?.beyond?.map((item) => {
                                            return (
                                                <SwiperSlide onClick={() => {
                                                    navigate('/blog/' + item.friendlyName)
                                                }}>
                                                    <Box className="LocationsSlide">
                                                        <img src={item?.imageUrl ?? noImage} alt={item?.title} />
                                                        <Typography className="SlideDescription" onClick={() => {
                                                            navigate('/blog/' + item.friendlyName)
                                                        }}>{item?.title}</Typography>
                                                    </Box>
                                                </SwiperSlide>
                                            )
                                        })
                                        : null}
                                    {/* <SwiperSlide>
                                    <Box className="LocationsSlide">
                                        <img src="https://picsum.photos/270/270" alt="https://picsum.photos/270/270" />
                                        <Typography className="SlideDescription">Great Keppel Island</Typography>
                                    </Box>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Box className="LocationsSlide">
                                        <img src="https://picsum.photos/270/270" alt="https://picsum.photos/270/270" />
                                        <Typography className="SlideDescription">Great Keppel Island</Typography>
                                    </Box>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Box className="LocationsSlide">
                                        <img src="https://picsum.photos/270/270" alt="https://picsum.photos/270/270" />
                                        <Typography className="SlideDescription">The Gold Coast</Typography>
                                    </Box>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Box className="LocationsSlide">
                                        <img src="https://picsum.photos/270/270" alt="https://picsum.photos/270/270" />
                                        <Typography className="SlideDescription">Airlie Beach</Typography>
                                    </Box>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Box className="LocationsSlide">
                                        <img src="https://picsum.photos/270/270" alt="https://picsum.photos/270/270" />
                                        <Typography className="SlideDescription">Lady Elliot Island</Typography>
                                    </Box>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Box className="LocationsSlide">
                                        <img src="https://picsum.photos/270/270" alt="https://picsum.photos/270/270" />
                                        <Typography className="SlideDescription">Great Keppel Island</Typography>
                                    </Box>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Box className="LocationsSlide">
                                        <img src="https://picsum.photos/270/270" alt="https://picsum.photos/270/270" />
                                        <Typography className="SlideDescription">Great Keppel Island</Typography>
                                    </Box>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Box className="LocationsSlide">
                                        <img src="https://picsum.photos/270/270" alt="https://picsum.photos/270/270" />
                                        <Typography className="SlideDescription">The Gold Coast</Typography>
                                    </Box>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Box className="LocationsSlide">
                                        <img src="https://picsum.photos/270/270" alt="https://picsum.photos/270/270" />
                                        <Typography className="SlideDescription">Airlie Beach</Typography>
                                    </Box>
                                </SwiperSlide> */}
                                </Swiper>
                                {<SwiperNavigation />}
                            </Box>
                        </Box>
                    </Box >
                </Container>
            </Box> : null
    )
}

export default Locations