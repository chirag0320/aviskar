import React, { useState } from "react"
import { Container } from "@mui/material"

// Hooks
import { useAppSelector } from '@/hooks'
import useAPIoneTime from '@/hooks/useAPIoneTime'

// Reducers
import { getSiteMapData } from '@/redux/reducers/homepageReducer'

// Componenets
import Layout from "@/components/common/Layout"
import Loader from "@/components/common/Loader"
import Seo from "@/components/common/Seo"
import { PageTitle } from "@/components/common/Utils"
import SitemapList from "@/components/partials/sitemap/SitemapList"
import Services from "@/components/partials/sitemap/Services"

function Sitemap() {
  const { siteMapData } = useAppSelector(state => state.homePage)
  console.log("🚀 ~ Sitemap ~ siteMapData:", siteMapData)
  const [state] = useState({ service: getSiteMapData })
  useAPIoneTime(state)

  return (
    <Layout>
      <Loader open={false} />
      <Seo
        keywords={[`QMint Sitemap`]}
        title="Sitemap"
        lang="en"
      />
      <PageTitle title="Sitemap" />
      <Container id="PageSitemap">
        <SitemapList />
        <Services />
      </Container>
    </Layout>
  )
}

export default Sitemap