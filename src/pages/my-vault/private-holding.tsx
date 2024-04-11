import React from "react"
import { Box, Button, Container, Divider } from "@mui/material"
import { PageTitle } from "@/components/common/Utils"
import Seo from "@/components/common/Seo"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { ENDPOINTS } from "@/utils/constants"
import { getTopicDetails } from "@/redux/reducers/topicReducer"
import { useAppSelector } from "@/hooks"
import Layout from "@/components/common/Layout"
import Loader from "@/components/common/Loader"
import { PlusIcon } from "@/assets/icons"
import PrivateHoldingCard from "@/components/partials/my-vault/PrivateHoldingsCard"
function privateHolding(paramsData: any) {
    const { topicDetails, loading } = useAppSelector(state => state.topic)
    useAPIoneTime({ service: getTopicDetails, endPoint: ENDPOINTS.topicDetail?.replace('{{topic-name}}', paramsData?.params?.['topic-name']) })
    return (
        <>
            <Loader open={loading} />
            {
                !loading && <Layout>
                    <Seo
                        keywords={[`QMint Topics`]}
                        title="Private Holdings"
                        lang="en"
                    />
                    <PageTitle title="Private Holdings" backToDashboard={true} />
                    <Box id="PrivateHoldingPage" className='PrivateHoldingPage' component="section">
                        <Container>
                            <Box className="Content PrivateHoldingContent">
                                <Box sx={{ textAlign: 'right' }}>
                                    <Button variant="outlined" startIcon={<PlusIcon />}>Add new</Button>
                                </Box>
                                <Box className="PrivateHoldingCardsWrapper">
                                    <PrivateHoldingCard />
                                    <PrivateHoldingCard />
                                    <PrivateHoldingCard />
                                    <PrivateHoldingCard />
                                </Box>
                            </Box>
                        </Container>
                    </Box>
                </Layout>
            }
        </>
    )
}

export default privateHolding
