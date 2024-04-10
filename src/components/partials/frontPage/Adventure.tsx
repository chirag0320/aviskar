import React from 'react'
import { Box, Container, Typography, Button } from '@mui/material'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, Pagination, A11y } from 'swiper/modules'
import { SwiperNavigation } from "@/components/common/Utils"

// Utills
import { SectionHeading } from "../../common/Utils"

function Adventure() {
    const config = {
        slidesPerView: 1.5,
        centeredSlides: true,
        spaceBetween: 20,
        pagination: {
            clickable: true,
        },
        loop: true,
        speed: 300,
        modules: [Pagination, Autoplay, A11y],
        scrollbar: {
            draggable: true
        },
        grabCursor: true,
        autoplay: {
            delay: 800000,
        },
    };

    return (
        <Box id="Adventure">
            <Box className="AdventureWrapper">
                <SectionHeading title="The Best Of Adventure" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry." />
                <Box className="AdventureSlideWrapper" component="section" key={'Adventure'}>
                    <Box className="SwiperContainer">
                        <Swiper {...config}>
                            <SwiperSlide>
                                <Box className="AdventureSlide">
                                    <img src="https://picsum.photos/876/600" alt="https://picsum.photos/876/600" />
                                    <Box className="AdventureSlideContentBox">
                                        <Typography className="SlideTitle">The best day trips from brisbane</Typography>
                                        <Typography className="SlideSubTitle">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Typography>
                                        <Button variant='contained' className="Button">Discover More</Button>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="AdventureSlide">
                                    <img src="https://picsum.photos/1276/600" alt="https://picsum.photos/1276/600" />
                                    <Box className="AdventureSlideContentBox">
                                        <Typography className="SlideTitle">The best day trips from brisbane</Typography>
                                        <Typography className="SlideSubTitle">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Typography>
                                        <Button variant='contained' className="Button">Discover More</Button>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="AdventureSlide">
                                    <img src="https://picsum.photos/1276/600" alt="https://picsum.photos/1276/600" />
                                    <Box className="AdventureSlideContentBox">
                                        <Typography className="SlideTitle">The best day trips from brisbane</Typography>
                                        <Typography className="SlideSubTitle">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Typography>
                                        <Button variant='contained' className="Button">Discover More</Button>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="AdventureSlide">
                                    <img src="https://picsum.photos/1276/600" alt="https://picsum.photos/1276/600" />
                                    <Box className="AdventureSlideContentBox">
                                        <Typography className="SlideTitle">The best day trips from brisbane</Typography>
                                        <Typography className="SlideSubTitle">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Typography>
                                        <Button variant='contained' className="Button">Discover More</Button>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="AdventureSlide">
                                    <img src="https://picsum.photos/1276/600" alt="https://picsum.photos/1276/600" />
                                    <Box className="AdventureSlideContentBox">
                                        <Typography className="SlideTitle">The best day trips from brisbane</Typography>
                                        <Typography className="SlideSubTitle">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Typography>
                                        <Button variant='contained' className="Button">Discover More</Button>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                        </Swiper>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Adventure