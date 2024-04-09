import React from "react"
import { Box, Container, Divider } from "@mui/material"
import { PageTitle } from "@/components/common/Utils"
import OrderDateStatusSelector from "@/components/partials/my-vault/OrderDateStatusSelector"
import OrderDetailsCard from "@/components/partials/my-vault/OrderDetailsCard"
import Seo from "@/components/common/Seo"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { ENDPOINTS } from "@/utils/constants"
import { getTopicDetails } from "@/redux/reducers/topicReducer"
import { useAppSelector } from "@/hooks"
import Layout from "@/components/common/Layout"
import Loader from "@/components/common/Loader"
function buyBackOrderHistory(paramsData: any) {
    const { topicDetails, loading } = useAppSelector(state => state.topic)
    useAPIoneTime({ service: getTopicDetails, endPoint: ENDPOINTS.topicDetail?.replace('{{topic-name}}', paramsData?.params?.['topic-name']) })
    return (
        <>
            <Loader open={loading} />
            {
                !loading && <Layout>
                    <Seo
                        keywords={[`QMint Topics`]}
                        title="Buyback orders"
                        lang="en"
                    />
                    <PageTitle title="Buyback orders" backToDashboard={true} />
                    <Box id="BuybackOrderHistoryPage" className='BuybackOrderHistoryPage' component="section">
                        <Container>
                            <Box className="Content OrderHistoryContent">
                                <Divider />
                                <OrderDateStatusSelector />
                                <Divider />
                                <Box className="OrderDetailsCardsWrapper">
                                    No orders
                                    {/* <OrderDetailsCard />
                                    <OrderDetailsCard />
                                    <OrderDetailsCard />
                                    <OrderDetailsCard /> */}
                                </Box>
                            </Box>
                        </Container>
                    </Box>
                </Layout>
            }
        </>
    )
}

export default buyBackOrderHistory