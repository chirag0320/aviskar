import React from "react"
import { useMediaQuery, Theme, Container, Stack } from "@mui/material"

// Components
import Layout from "@/components/common/Layout"
import Seo from "@/components/common/Seo"
import CategoryFilters from "@/components/partials/category/CategoryFilters"
import ProductList from "@/components/partials/category/ProductList"
import SortBy from "@/components/partials/category/SortBy"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { getCategoryData } from "@/redux/reducers/categoryReducer"
import { ENDPOINTS } from "@/utils/constants"

function Category() {
  useAPIoneTime({
    service: getCategoryData, endPoint: ENDPOINTS.getCategoryData, body: {
      "search": "",
      "pageNo": 1,
      "pageSize": -1,
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
        {isSmallScreen && (
          <Stack className="CategoryHeader">
            <SortBy />
            <CategoryFilters />
          </Stack>
        )}
        <Stack className="MainContent">
          {!isSmallScreen && <CategoryFilters />}
          <ProductList />
        </Stack>
      </Container>
    </Layout>
  )
}

export default Category