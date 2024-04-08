import React from 'react'
import { Box, Container, Typography, Button } from '@mui/material'

// Utills
import { SectionHeading } from "../../common/Utils"

function Gallery() {
    return (
        <Box id="Gallery">
            <Container maxWidth="lg">
                <Box className="GalleryWrapper">
                    <SectionHeading title="Picture Gallery" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry." />
                    <Box className="GalleryContentWrapper" component="section" key={'Gallery'}>
                        <Box className="TopImageWrapper">
                            <Box className="Left">
                                <img src="https://picsum.photos/876/600" alt="https://picsum.photos/876/600" />
                            </Box>
                            <Box className="Right">
                                <Box className="Top">
                                    <img src="https://picsum.photos/876/600" alt="https://picsum.photos/876/600" />
                                    <img src="https://picsum.photos/876/600" alt="https://picsum.photos/876/600" />
                                </Box>
                                <Box className="Bottom">
                                    <img src="https://picsum.photos/876/600" alt="https://picsum.photos/876/600" />
                                </Box>
                            </Box>
                        </Box>
                        <Box className="BottomImageWrapper">
                            <Box className="Left">
                                <img src="https://picsum.photos/876/600" alt="https://picsum.photos/876/600" />
                            </Box>
                            <Box className="Right">
                                <img src="https://picsum.photos/876/600" alt="https://picsum.photos/876/600" />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Gallery