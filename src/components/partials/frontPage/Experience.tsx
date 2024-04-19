import React from 'react'
import { Box, Container, Typography, IconButton } from '@mui/material'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, Pagination, A11y, EffectCoverflow } from 'swiper/modules'
import { SwiperNavigation } from "@/components/common/Utils"

// Utills
import { SectionHeading } from "../../common/Utils"
import { PlayIcon } from "../../../assets/icons/index"
import { useAppSelector } from '@/hooks'
import noImage from '../../../assets/images/noImage.png'
import { navigate } from 'gatsby'

function Experience() {
    const { mainHomePageData, configDetails } = useAppSelector((state) => state.homePage)
    console.log("🚀 ~ Experience ~ mainHomePageData:", mainHomePageData?.experience)
    return (
        (mainHomePageData && mainHomePageData?.experience?.length > 0) ?
            <Box id="Experience">
                <Container maxWidth="lg">
                    <Box className="ExperienceWrapper">
                        <SectionHeading title={configDetails?.["mainhomepage.experiencetital"]?.value} description={configDetails?.["mainhomepage.experiencesubtital"]?.value} />
                        <Box className="ExperienceSlideWrapper" component="section" key={'Experience'}>
                            <Box className="SwiperContainer">
                                <Swiper
                                    effect={'coverflow'}
                                    grabCursor={true}
                                    centeredSlides={true}
                                    slidesPerView={'auto'}
                                    initialSlide={2}
                                    coverflowEffect={{
                                        rotate: 40,
                                        stretch: 0,
                                        depth: 970,
                                        modifier: 1,
                                        slideShadows: false,
                                    }}

                                    navigation={{
                                        nextEl: ".SwiperButtonNext",
                                        prevEl: ".SwiperButtonPrev",
                                        disabledClass: "SwiperButtonDisabled"
                                    }}
                                    pagination={false}
                                    modules={[EffectCoverflow, Navigation]}
                                    breakpoints={{

                                        260: {
                                            slidesPerView: 1.4,
                                        },
                                        1024: {
                                            slidesPerView: "auto"
                                        },
                                    }}
                                >
                                    {<SwiperNavigation />}
                                    {(mainHomePageData && mainHomePageData?.experience?.length > 0) ?
                                        mainHomePageData?.experience?.map((item) => {
                                            return (
                                                <SwiperSlide
                                                // onClick={() => {
                                                //     navigate('/blog/' + item.friendlyName)
                                                // }}
                                                >
                                                    <Box className="ExperienceSlide">
                                                        {item?.mediaType == '0' ?
                                                            <>
                                                                
                                                                <iframe width="100%" height="484"
                                                                    src="https://www.youtube.com/embed/Oswc-jAgwgo?si=Sl-ig71KsTEdgicY&amp;controls=0"
                                                                    >
                                                                    </iframe>
                                                            </>
                                                            :
                                                            <>
                                                                <IconButton className="PlayIcon">
                                                                    <PlayIcon />
                                                                </IconButton>
                                                                <img src={item.imageUrl ?? noImage} alt={item.title} />
                                                            </>
                                                            }

                                                    </Box>
                                                </SwiperSlide>
                                            )
                                        })
                                        : null}
                                    {/* <SwiperSlide>
                                        <Box className="ExperienceSlide">
                                            <img src="https://picsum.photos/1276/600" alt="https://picsum.photos/1276/600" />
                                            <IconButton className="PlayIcon">
                                                <PlayIcon />
                                            </IconButton>
                                        </Box>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Box className="ExperienceSlide">
                                            <img src="https://picsum.photos/1276/600" alt="https://picsum.photos/1276/600" />
                                            <IconButton className="PlayIcon">
                                                <PlayIcon />
                                            </IconButton>
                                        </Box>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Box className="ExperienceSlide">
                                            <img src="https://picsum.photos/1276/600" alt="https://picsum.photos/1276/600" />
                                            <IconButton className="PlayIcon">
                                                <PlayIcon />
                                            </IconButton>
                                        </Box>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Box className="ExperienceSlide">
                                            <img src="https://picsum.photos/1276/600" alt="https://picsum.photos/1276/600" />
                                            <IconButton className="PlayIcon">
                                                <PlayIcon />
                                            </IconButton>
                                        </Box>
                                    </SwiperSlide> */}
                                </Swiper>
                            </Box>
                        </Box>
                    </Box>
                </Container >
            </Box > : null
    )
}

export default Experience