import React, { useState, useEffect, Fragment } from "react"
import { Box, Skeleton, Card, Pagination, Stack } from "@mui/material"

// Components
import { ProductCard } from "@/components/common/Card"
import { ENDPOINTS } from "@/utils/constants"
import { IpriceForEachId } from "../home/FeaturedProducts"

// Hooks
import useApiRequest from "@/hooks/useAPIRequest"
import { useAppSelector } from "@/hooks"
import { pageSize } from "@/pages/category"

function ProductList({ page, setPage }: { page: number, setPage: any }) {
  const [priceForEachId, setPriceForEachId] = useState<IpriceForEachId | null>(null)
  const [productIds, setProductIds] = useState({})
  const categoryData = useAppSelector((state) => state.category);
  const { data: priceData, loading: priceLoading } = useApiRequest(ENDPOINTS.productPrices, 'post', productIds, 60);

  useEffect(() => {
    if (priceData?.data?.length > 0) {
      const idwithpriceObj: any = {}
      priceData?.data?.forEach((product: any) => idwithpriceObj[product?.productId] = product)
      setPriceForEachId(idwithpriceObj)
    }
  }, [priceData])

  useEffect(() => {
    if (categoryData?.items?.length > 0) {
      const productIds = categoryData?.items?.map((product: any) => product?.productId);
      setProductIds({ productIds })
    }
  }, [categoryData])

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }

  return (
    <Box className="ProductList">
      <Box className="ProductListWrapper">
        {
          categoryData.items.length > 0 ? categoryData.items.map((product: any) => {
            const updatedProduct = { ...product };
            updatedProduct.priceWithDetails = priceForEachId ? priceForEachId[product?.productId] : null;
            return (
              <ProductCard key={product.productId} product={updatedProduct} />
            );
          })
            :
            Array(6).fill(0).map((_, index) => {
              return (
                <Card className="ProductCard" key={index}>
                  <Skeleton animation="wave" height={500} style={{ borderRadius: "10px 10px 0 0", padding: "0px" }} />
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <Skeleton animation="wave" height={95} width="95%" style={{ marginBottom: "4px" }} />
                    <Skeleton animation="wave" height={70} width="95%" />
                  </div>
                </Card>
              )
            })
        }
      </Box>
      <Stack className="Pagination">
        <Pagination count={Math.floor(categoryData.count / pageSize)} page={page} shape="rounded" onChange={handlePageChange} />
      </Stack>
    </Box>
  )
}

export default ProductList