import React from "react"
import { Container } from "@mui/material"

// Components
import Layout from "@/components/common/Layout"
import Seo from "@/components/common/Seo"
import AboutProduct from "@/components/partials/productDetail/AboutProduct"
import RelatedProduct from "@/components/partials/productDetail/RelatedProduct"
import { Breadcrumb } from "@/components/common/Utils"

function ProductDetail() {
  return (
    <Layout>
      <Seo
        keywords={[`QMint categories`]}
        title="Category"
        lang="en"
      />
      <Breadcrumb page1={"Shop"} page2={"Products"} page3={"2024 1oz Lunar Series III Year of the Dragon Silver Coin"} />
      <Container id="PageProductDetail">
        <AboutProduct />
        <RelatedProduct />
      </Container>
    </Layout>
  )
}

export default ProductDetail