import React from 'react'
import { Container, Stack, Box, Button, Skeleton, Card } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, A11y } from 'swiper/modules'

// Utils
import { SectionHeading } from "../../common/Utils"
import { TravelCard } from "../../common/Card"
import useApiRequest from '@/hooks/useAPIRequest'
import { ENDPOINTS } from '@/utils/constants'
import { navigate } from 'gatsby'

// Components
import RecordNotFound from '@/components/common/RecordNotFound'
import { useAppSelector } from '@/hooks'

const dataforbody = {
  "search": "",
  "pageNo": 0,
  "pageSize": -1,
  "sortBy": "",
  "sortOrder": "",
  "filters": {
  }
}
interface ItravelDestinations {
  id: number
  title: string,
  body: string,
  bodyOverview: string,
  allowComments: boolean,
  includeInSitemap: boolean,
  tags: any,
  startDateUtc: Date,
  endDateUtc: Date,
  metaKeywords: string,
  metaDescription: string,
  metaTitle: string,
  commentCount: number,
  friendlyName: string,
  stores: string,
  isActive: boolean,
  imageUrl: string,
}
interface Idata {
  data: {
    data: {
      items: ItravelDestinations[]
    }
  },
  loading: boolean,
}
function SkeletonCloserLook({ index }: { index: number | string }) {
  return (
    <SwiperSlide key={index}>
      <Card className="ProductCard">
        <Skeleton animation="wave" height={500} style={{ borderRadius: "10px 10px 0 0", padding: "0px" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Skeleton animation="wave" height={95} width="95%" style={{ marginBottom: "4px" }} />
          <Skeleton animation="wave" height={70} width="95%" />
        </div>
      </Card>
    </SwiperSlide>
  )
}
function CloserLook() {
  const { configDetails } = useAppSelector((state) => state.homePage)
  const { data, loading }: Idata = useApiRequest(ENDPOINTS.getBlog, 'post', dataforbody);

  const config = {
    slidesPerView: 1.4,
    spaceBetween: 20,
    pagination: {
      clickable: true,
    },
    centeredSlides: true,
    loop: true,
    speed: 500,
    modules: [Autoplay, Pagination, A11y],
    scrollbar: {
      draggable: true
    },
    grabCursor: true,
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      375: {
        slidesPerView: 1.5,
        spaceBetween: 40,
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      900: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    }
  }

  return (
    <Container id="CloserLook" component="section">
      <SectionHeading
        title={configDetails?.["home.closerlook.tital"]?.value ?? "Take a closer look*"}
        description={configDetails?.["home.closerlook.subtital"]?.value ?? "description*"}
      />
      <Container className="DestinationWrapper" maxWidth="lg">
        {data?.data?.items?.length !== 0 ?
          <Box className="SwiperContainer">
            <Swiper {...config} >
              {
                !loading ?
                  (data?.data?.items?.length > 0 ? data?.data?.items?.map((destination) => (
                    <SwiperSlide key={destination.id}>
                      <TravelCard
                        friendlyName={destination?.friendlyName}
                        place={destination.title}
                        description={destination.bodyOverview}
                        imageUrl={destination.imageUrl}
                      />
                    </SwiperSlide>
                  ))
                    : null) :
                  Array(5).fill(0).map((_, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <Card className="ProductCard">
                          <Skeleton animation="wave" height={500} style={{ borderRadius: "10px 10px 0 0", padding: "0px" }} />
                          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <Skeleton animation="wave" height={95} width="95%" style={{ marginBottom: "4px" }} />
                            <Skeleton animation="wave" height={70} width="95%" />
                          </div>
                        </Card>
                      </SwiperSlide>
                    );
                  })
              }
            </Swiper>
          </Box>
          : <RecordNotFound message="No destination available" />
        }
      </Container>
      <Stack className="Action">
        <Button aria-label={'DiscoverMore'} name={'DiscoverMore'} variant="contained" onClick={() => {
          navigate('/blog')
        }}>Discover More</Button>
      </Stack>
    </Container>
  )
}

export default React.memo(CloserLook)
