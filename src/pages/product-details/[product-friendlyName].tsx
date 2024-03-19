import React from "react"
import { Container } from "@mui/material"

// Components
import Layout from "@/components/common/Layout"
import Seo from "@/components/common/Seo"
import AboutProduct from "@/components/partials/productDetail/AboutProduct"
import RelatedProduct from "@/components/partials/productDetail/RelatedProduct"
import { Breadcrumb } from "@/components/common/Utils"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { getProductDetailsData } from "@/redux/reducers/categoryReducer"
import { ENDPOINTS } from "@/utils/constants"
import { useAppSelector } from "@/hooks"

function ProductDetail({ params }: any) {
  const { productDetailsData } = useAppSelector((state) => state.category)
  useAPIoneTime({
    service: getProductDetailsData, endPoint: ENDPOINTS.productDetails.replace('{{product-id}}', params?.["product-friendlyName"] //params?.["product-friendlyName"]
    )
  })
  return (
    <Layout>
      <Seo
        keywords={[`QMint categories`]}
        title="Category"
        lang="en"
      />
      <Breadcrumb page1={"Shop"} page2={"Products"} page3={"2024 1oz Lunar Series III Year of the Dragon Silver Coin"} />
      <Container id="PageProductDetail">
        {productDetailsData?.productId && <AboutProduct productId={productDetailsData?.productId} />}
        {productDetailsData?.relatedProducts?.length > 0 && <RelatedProduct relatedProductsList={structuredClone(productDetailsData?.relatedProducts)} />}
      </Container>
    </Layout>
  )
}

export default ProductDetail