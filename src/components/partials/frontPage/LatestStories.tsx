import React from 'react'
import { Box, Container, Typography, Button, Stack } from '@mui/material'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, Pagination, A11y, EffectCoverflow } from 'swiper/modules'
import { SwiperNavigation } from "@/components/common/Utils"

// Utills
import { SectionHeading } from "../../common/Utils"
import { ArrowRight } from "../../../assets/icons/index"

function LatestStories() {
    return (
        <Box id="LatestStories">
            <Container maxWidth="lg" className='LatestStoriesContainer'>
                <Box className="LatestStoriesMainWrapper">
                    <Stack className='SectionHeadingWrapper'>
                        <Box className="SectionHeading">
                            <Typography variant="h2" component="h2" className="Title">Latest Stories</Typography>
                            <Typography className="Description">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Typography>
                        </Box>
                        <Button className='SectionButton' variant="contained" endIcon={<ArrowRight />}>Discover More</Button>
                    </Stack>
                    <Box className="LatestStoriesWrapper" component="section" key={'LatestStories'}>
                        <Box className="TopStoriesWrapper">
                            <Box className="TopStoriePost">
                                <img src="https://picsum.photos/600/520" alt="https://picsum.photos/600/520" />
                                <Stack className='StoryContentBox'>
                                    <Typography variant='subtitle2' className='StorieTitle'>Whitsunday Island: Vivid experiences on and under the water</Typography>
                                    <Button variant='text' className='StorieButton' endIcon={<ArrowRight />}>Read more</Button>
                                </Stack>
                            </Box>
                            <Box className="TopStoriePost">
                                <img src="https://picsum.photos/600/520" alt="https://picsum.photos/600/520" />
                                <Stack className='StoryContentBox'>
                                    <Typography variant='subtitle2' className='StorieTitle'>Whitsunday Island: Vivid experiences on and under the water</Typography>
                                    <Button variant='text' className='StorieButton' endIcon={<ArrowRight />}>Read more</Button>
                                </Stack>
                            </Box>
                        </Box>
                        <Box className="BottomStoriesWrapper">
                            <Box className="BottomStoriePost">
                                <img src="https://picsum.photos/600/520" alt="https://picsum.photos/600/520" />
                                <Stack className='StoryContentBox'>
                                    <Typography variant='subtitle2' className='StorieTitle'>Moreton Island, Queensland</Typography>
                                    <Button variant='text' className='StorieButton' endIcon={<ArrowRight />}>Discover More</Button>
                                </Stack>
                            </Box>
                            <Box className="BottomStoriePost">
                                <img src="https://picsum.photos/600/520" alt="https://picsum.photos/600/520" />
                                <Stack className='StoryContentBox'>
                                    <Typography variant='subtitle2' className='StorieTitle'>Surfers Paradise Beach, Queensland</Typography>
                                    <Button variant='text' className='StorieButton' endIcon={<ArrowRight />}>Discover More</Button>
                                </Stack>
                            </Box>
                            <Box className="BottomStoriePost">
                                <img src="https://picsum.photos/600/520" alt="https://picsum.photos/600/520" />
                                <Stack className='StoryContentBox'>
                                    <Typography variant='subtitle2' className='StorieTitle'>Daintree River, Forest Creek Queensland</Typography>
                                    <Button variant='text' className='StorieButton' endIcon={<ArrowRight />}>Discover More</Button>
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="SectionButtonMobile">
                        <Button variant="contained" endIcon={<ArrowRight />}>Discover More</Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default LatestStories