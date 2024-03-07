import React from "react"
import { useMediaQuery, Theme, Container, Stack } from "@mui/material"

// Components
import Layout from "@/components/common/Layout"
import Seo from "@/components/common/Seo"
import CategoryFilters from "@/components/partials/category/filters/CategoryFilters"
import ProductList from "@/components/partials/category/ProductList"
import SortBy from "@/components/partials/category/filters/SortBy"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { getCategoryData } from "@/redux/reducers/categoryReducer"
import { ENDPOINTS } from "@/utils/constants"

function Category() {
  useAPIoneTime({
    service: getCategoryData, endPoint: ENDPOINTS.getCategoryData, body: {
      "search": "",
      "pageNo": 1,
      "pageSize": 12,
      "sortBy": "",
      "sortOrder": "",
      "filters": {
        "minPrice": 0,
        "maxPrice": 100,
        "specification": {}
      }
    }
  })

  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  return (
    <Layout>
      <Seo
        keywords={[`QMint categories`]}
        title="Category"
        lang="en"
      />
      <Container id="PageCategory">
        {isSmallScreen ? (
          <Stack className="CategoryHeader">
            <SortBy />
            <CategoryFilters />
          </Stack>
        ) :null}
        <Stack className="MainContent">
          {!isSmallScreen ? <CategoryFilters />:null}
          <ProductList />
        </Stack>
      </Container>
    </Layout>
  )
}

export default Category