import React from "react"
import { Box, Container } from "@mui/material"

// Componenets
import Layout from "@/components/common/Layout"
import Seo from "@/components/common/Seo"
import { PageTitle } from "@/components/common/Utils"

function Topics() {
  return (
    <Layout>
      <Seo
        keywords={[`QMint Topics`]}
        title="Topics"
        lang="en"
      />
      <PageTitle title="Topics" />
      <Container id="PageTopics">
        <Box className="Content">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis ea voluptate blanditiis? Aliquid animi, quod facilis repellendus, nam possimus sint sequi ducimus saepe quae illo qui minima eveniet magni omnis.
        </Box>
      </Container>
    </Layout>
  )
}

export default Topics