import React from "react"
import { Box, Container, Typography } from "@mui/material"
import { PageTitle } from "@/components/common/Utils"
import Seo from "@/components/common/Seo"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { ENDPOINTS } from "@/utils/constants"
import { getTopicDetails } from "@/redux/reducers/topicReducer"
import { useAppSelector } from "@/hooks"
import Layout from "@/components/common/Layout"
import Loader from "@/components/common/Loader"
import RewardsPointsTable from "@/components/common/RewardsPointsTable"


function Topics(paramsData: any) {
    const { topicDetails, loading } = useAppSelector(state => state.topic)
    useAPIoneTime({ service: getTopicDetails, endPoint: ENDPOINTS.topicDetail?.replace('{{topic-name}}', paramsData?.params?.['topic-name']) })
    return (
        <>
            <Loader open={loading} />
            {
                !loading && <Layout>
                    <Seo
                        keywords={[`QMint Topics`]}
                        title="Reward Points History"
                        lang="en"
                    />
                    <PageTitle title="Reward points" backToDashboard={true} />
                    <Box id="RewardPointsHistoryPage" className='RewardPointsHistoryPage' component="section">
                        <Container>
                            <Box className="Content RewardPointsHistoryContent">
                                <Typography variant="subtitle1" sx={{ fontWeight: '500', mb: '10px' }}>Your current balance is 1100 reward points ($36.63).</Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: '500' }}>Minimum balance allowed to use is 100 reward points ($3.33).</Typography>
                                <Typography variant="h4" className="RewardPointsTableTitle">History</Typography>
                                <RewardsPointsTable />
                            </Box>
                        </Container>
                    </Box>
                </Layout>
            }
        </>
    )
}

export default Topics