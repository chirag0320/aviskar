import React, { useState } from "react"
import { Box, Stack } from "@mui/material"
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import {
  GlassMagnifier,
} from "react-image-magnifiers";

// Types
import { type Swiper as SwiperTypes } from "swiper"

// Data
import { productImages } from "@/utils/data"

function ProductImages() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperTypes | null>(null)

  return (
    <Box className="ProductImages">
      <Box className="SwiperContainer">
        <Swiper
          className="MainThumbnail"
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs]}
          spaceBetween={10}
        >
          {productImages.map((image) => (
            <SwiperSlide key={image}>
              <Stack className="ImageWrapper">
                <GlassMagnifier
                  imageSrc={image}
                  imageAlt="Product image"
                  className="Magnifier"
                  magnifierSize="50%"
                  square
                />
              </Stack>
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          className="SupportImages"
          onSwiper={setThumbsSwiper}
          modules={[FreeMode, Navigation, Thumbs]}
          spaceBetween={10}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          breakpoints={{
            425: {
              slidesPerView: 5,
            },
            500: {
              slidesPerView: 6,
            },
            600: {
              slidesPerView: 7,
            },
            700: {
              slidesPerView: 8,
            },
            800: {
              slidesPerView: 9,
            },
            900: {
              slidesPerView: 5,
            },
            1200: {
              slidesPerView: 7,
            },
            1440: {
              slidesPerView: 8,
            },
          }}
        >
          {productImages.map((image) => (
            <SwiperSlide key={image}>
              <img src={image} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  )
}

export default ProductImages

