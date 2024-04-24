import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"

import { Box, Card, Skeleton, useMediaQuery, Container, Typography, } from "@mui/material"
import { Link } from "gatsby";

import { Navigation, Autoplay, Pagination, A11y } from 'swiper/modules'

import { SwiperNavigation } from "@/components/common/Utils"

function ProductsSlider() {
    const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'))
    const config = {
        slidesPerView: 1.3,
        spaceBetween: 16,
        navigation: {
            nextEl: ".ProductNext",
            prevEl: ".ProductPrev",
            disabledClass: "SwiperButtonDisabled"
        },
        pagination: {
            clickable: true,
        },
        centeredSlides: isMobile,
        loop: true,
        speed: 500,
        modules: [Navigation, Autoplay, Pagination, A11y],
        scrollbar: {
            draggable: true
        },
        grabCursor: true,
        autoplay: {
            delay: 8000,
        },
        breakpoints: {
            475: {
                slidesPerView: 1.5,
                spaceBetween: 20,
            },
            600: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            900: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1440: {
                slidesPerView: 5,
                spaceBetween: 40,
            },
        },
    }

    return (
        <Box id="ProductsSlider" component="section">
            <Box className="ProductsSliderWrapper">
                <Box className="SwiperContainer">
                    <Swiper  {...config}>
                        <SwiperSlide>
                            <Link to="#" className="ProductCardLink">
                                <Card className="ProductCard">
                                    <Box className="ProductImageWrapper">
                                        <img className="ProductImage" src="https://qmintstoremedia.blob.core.windows.net/pictures/products/2023-1oz-lunar-series-year-of-the-rabbit-platinum-coin_120320242303026.png?sv=2018-03-28&sr=b&sig=5tD7n%2Bvm4%2BK%2BKE5ZHQfCaSdQBforI3BPxO1kNTNTOzI%3D&st=2024-03-11T13%3A50%3A02Z&se=3024-03-12T13%3A50%3A02Z&sp=r&c=638458482026612121" alt="product-image" />
                                    </Box>
                                    <Box className="ProductTitle">
                                        <Typography variant="h4">Popular silver</Typography>
                                    </Box>
                                </Card>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to="#" className="ProductCardLink">
                                <Card className="ProductCard">
                                    <Box className="ProductImageWrapper">
                                        <img className="ProductImage" src="https://qmintstoremedia.blob.core.windows.net/pictures/products/10oz-Queensland-Mint-Silver-Bar-Ultra-Shine-Duo-Strike-feature_12032024230335.png?sv=2018-03-28&sr=b&sig=XCUDOH%2FkM4UpF4ZQkcdAN4GQSFzAPcv64Kmjv1P78Hk%3D&st=2024-03-11T13%3A48%3A35Z&se=3024-03-12T13%3A48%3A35Z&sp=r&c=638458481151053317" alt="product-image" />
                                    </Box>
                                    <Box className="ProductTitle">
                                        <Typography variant="h4">Silver Favorites</Typography>
                                    </Box>
                                </Card>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to="#" className="ProductCardLink">
                                <Card className="ProductCard">
                                    <Box className="ProductImageWrapper">
                                        <img className="ProductImage" src="https://qmintstoremedia.blob.core.windows.net/pictures/products/100g-Queensland-Mint-Gold-Cast-Bar-Front-min_120320242303349.png?sv=2018-03-28&sr=b&sig=UnuW%2FiChduz2inKlg%2BDfrW3xT30DsTazNxH5HtRzWGk%3D&st=2024-03-11T13%3A47%3A34Z&se=3024-03-12T13%3A47%3A34Z&sp=r&c=638458480549736466" alt="product-image" />
                                    </Box>
                                    <Box className="ProductTitle">
                                        <Typography variant="h4">Gold Bars</Typography>
                                    </Box>
                                </Card>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to="#" className="ProductCardLink">
                                <Card className="ProductCard">
                                    <Box className="ProductImageWrapper">
                                        <img className="ProductImage" src="https://qmintstoremedia.blob.core.windows.net/pictures/products/QMint-2oz-gold-Bar-Front-min_120320242303307.png?sv=2018-03-28&sr=b&sig=oPYsZ0UE%2Fq8EZ%2F9AZx2gN3r6r87hk1pRJOTO3dchY7w%3D&st=2024-03-11T13%3A47%3A30Z&se=3024-03-12T13%3A47%3A30Z&sp=r&c=638458480507584070" alt="product-image" />
                                    </Box>
                                    <Box className="ProductTitle">
                                        <Typography variant="h4">On Sale</Typography>
                                    </Box>
                                </Card>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to="#" className="ProductCardLink">
                                <Card className="ProductCard">
                                    <Box className="ProductImageWrapper">
                                        <img className="ProductImage" src="https://qmintstoremedia.blob.core.windows.net/pictures/products/QMint-2oz-gold-Bar-Front-min_120320242303307.png?sv=2018-03-28&sr=b&sig=oPYsZ0UE%2Fq8EZ%2F9AZx2gN3r6r87hk1pRJOTO3dchY7w%3D&st=2024-03-11T13%3A47%3A30Z&se=3024-03-12T13%3A47%3A30Z&sp=r&c=638458480507584070" alt="product-image" />
                                    </Box>
                                    <Box className="ProductTitle">
                                        <Typography variant="h4">Bundle & Save</Typography>
                                    </Box>
                                </Card>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to="#" className="ProductCardLink">
                                <Card className="ProductCard">
                                    <Box className="ProductImageWrapper">
                                        <img className="ProductImage" src="https://qmintstoremedia.blob.core.windows.net/pictures/products/QMint-2oz-gold-Bar-Front-min_120320242303307.png?sv=2018-03-28&sr=b&sig=oPYsZ0UE%2Fq8EZ%2F9AZx2gN3r6r87hk1pRJOTO3dchY7w%3D&st=2024-03-11T13%3A47%3A30Z&se=3024-03-12T13%3A47%3A30Z&sp=r&c=638458480507584070" alt="product-image" />
                                    </Box>
                                    <Box className="ProductTitle">
                                        <Typography variant="h4">Popular Gold</Typography>
                                    </Box>
                                </Card>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to="#" className="ProductCardLink">
                                <Card className="ProductCard">
                                    <Box className="ProductImageWrapper">
                                        <img className="ProductImage" src="https://qmintstoremedia.blob.core.windows.net/pictures/products/QMint-2oz-gold-Bar-Front-min_120320242303307.png?sv=2018-03-28&sr=b&sig=oPYsZ0UE%2Fq8EZ%2F9AZx2gN3r6r87hk1pRJOTO3dchY7w%3D&st=2024-03-11T13%3A47%3A30Z&se=3024-03-12T13%3A47%3A30Z&sp=r&c=638458480507584070" alt="product-image" />
                                    </Box>
                                    <Box className="ProductTitle">
                                        <Typography variant="h4">Popular Gold2</Typography>
                                    </Box>
                                </Card>
                            </Link>
                        </SwiperSlide>
                    </Swiper>
                    <SwiperNavigation classNameNext="ProductNext" classNamePrev="ProductPrev" />
                </Box>
            </Box>
        </Box>
    )
}

export default ProductsSlider