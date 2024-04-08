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

function TheJournal() {
    const { configDetails } = useAppSelector((state) => state.homePage)
    const { data, loading }: Idata = useApiRequest(ENDPOINTS.getBlog, 'post', dataforbody);

    return (
        <Box id="TheJournal">
            <Container component="section">
                <SectionHeading
                    title='The Best Of Adventure'
                    description='Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
                />
                <Container className="TheJounalPostWrapperContainer" maxWidth="lg">
                    {data?.data?.items?.length !== 0 ? (
                        <Box className="TheJounalPostWrapper">
                            {loading ? (
                                data?.data?.items?.slice(0, 2).map((destination) => (
                                    <Box className="TheJounalPost" key={destination.id}>
                                        <TravelCard
                                            friendlyName={destination?.friendlyName}
                                            place={destination.title}
                                            description={destination.bodyOverview}
                                            imageUrl={destination.imageUrl}
                                        />
                                    </Box>
                                ))
                            ) : (
                                Array(5)
                                    .fill(0)
                                    .map((_, index) => {
                                        return (
                                            <Box key={index}>
                                                <Card className="ProductCard">
                                                    <Skeleton animation="wave" height={500} style={{ borderRadius: "10px 10px 0 0", padding: "0px" }} />
                                                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                                        <Skeleton animation="wave" height={95} width="95%" style={{ marginBottom: "4px" }} />
                                                        <Skeleton animation="wave" height={70} width="95%" />
                                                    </div>
                                                </Card>
                                            </Box>
                                        );
                                    })
                            )
                            }
                        </Box>
                    ) : (
                        <RecordNotFound message="No destination available" />
                    )}
                </Container>
            </Container>
        </Box>
    )
}

export default React.memo(TheJournal)
