import React, { useEffect } from "react"
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
import { useAppDispatch, useAppSelector } from "@/hooks"
import { setRecentlyViewedProduct } from "@/redux/reducers/homepageReducer"

function ProductDetail({ params }: any) {
  const { productDetailsData } = useAppSelector((state) => state.category)
  const dispatch = useAppDispatch()
  useAPIoneTime({
    service: getProductDetailsData, endPoint: ENDPOINTS.productDetails.replace('{{product-id}}', params?.["product-friendlyName"] //params?.["product-friendlyName"]
    )
  })
  useEffect(() => {
    if(productDetailsData?.productId){
      dispatch(setRecentlyViewedProduct(productDetailsData?.productId))
    }
  }, [productDetailsData?.productId])

  return (
    <Layout>
      <Seo
        keywords={[`QMint categories`]}
        title="Category"
        lang="en"
      />
      <Breadcrumb page1={"Shop"} page2={"Products"} page3={params?.["product-friendlyName"]} />
      <Container id="PageProductDetail">
        {productDetailsData?.productId && <AboutProduct productId={productDetailsData?.productId} />}
        {productDetailsData?.relatedProducts?.length > 0 && <RelatedProduct relatedProductsList={structuredClone(productDetailsData?.relatedProducts)} />}
      </Container>
    </Layout>
  )
}

export default ProductDetail