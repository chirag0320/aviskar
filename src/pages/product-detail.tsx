import React from "react"
import { Container } from "@mui/material"

// Components
import Layout from "@/components/common/Layout"
import Seo from "@/components/common/Seo"
import AboutProduct from "@/components/partials/productDetail/AboutProduct"
import RelatedProduct from "@/components/partials/productDetail/RelatedProduct"

function ProductDetail() {
  return (
    <Layout>
      <Seo
        keywords={[`QMint categories`]}
        title="Category"
        lang="en"
      />
      <Container id="PageProductDetail">
        <AboutProduct />
        <RelatedProduct />
      </Container>
    </Layout>
  )
}

export default ProductDetail