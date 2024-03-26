import React from "react"
import { Box, Container } from "@mui/material"
import Layout from "../../components/common/Layout"
import { PageTitle } from "@/components/common/Utils"
import Seo from "@/components/common/Seo"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { ENDPOINTS } from "@/utils/constants"
import { getTopicDetails } from "@/redux/reducers/topicReducer"
import { useAppSelector } from "@/hooks"
function Topics(paramsData: any) {
  const { topicDetails, loading } = useAppSelector(state => state.topic)
  console.log("🚀 ~ Topics ~ topicDetails, loading:", topicDetails, loading)
  useAPIoneTime({ service: getTopicDetails, endPoint: ENDPOINTS.topicDetail?.replace('{{topic-name}}', paramsData?.params?.['topic-name']) })
  return (
    !loading && <Layout>
      <Seo
        keywords={[`QMint Topics`]}
        title="Topics"
        lang="en"
      />
      <PageTitle title={topicDetails?.systemName} />
      <Container id="PageTopics">
        <Box className="Content" dangerouslySetInnerHTML={{
          __html: topicDetails?.body
        }} > 
        </Box>
      </Container>
    </Layout>
  )
}

export default Topics