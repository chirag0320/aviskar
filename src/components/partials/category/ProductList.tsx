import React, { useState, useEffect, Fragment } from "react"
import { Box, Skeleton, Card, Pagination, Stack } from "@mui/material"

// Components
import { ProductCard } from "@/components/common/Card"
import { ENDPOINTS } from "@/utils/constants"
import { IFeaturedProducts, Idata, IpriceForEachId, IproductPrice } from "../home/FeaturedProducts"

// Hooks
import useApiRequest from "@/hooks/useAPIRequest"
import { useAppSelector } from "@/hooks"
import axiosInstance from '@/axiosfolder'
import { categoryData } from "@/types/categoryData"

const defaultData = {
  "search": "",
  "pageNo": 0,
  "pageSize": -1,
  "sortBy": "",
  "sortOrder": "",
  "filters": {
    "showOnHomepage": true
  }
}

let cancellationSource: AbortController | null = null;
let timeoutId: number | any = null;

function ProductList() {
  const [priceForEachId, setPriceForEachId] = useState<IpriceForEachId | null>(null)
  const [productIds, setProductIds] = useState({})
  const categoryData = useAppSelector((state) => state.category);
  const { data: priceData, loading: priceLoading } = useApiRequest(ENDPOINTS.productPrices, 'post', productIds, 60);

  // useEffect(() => {
  //   const ids = (categoryData.items as any[]).map((item) => item.productId as any);

  //   const fetchData = async () => {
  //     timeoutId && clearTimeout(timeoutId);
  //     if (cancellationSource) {
  //       cancellationSource.abort();
  //     }

  //     cancellationSource = new AbortController();

  //     timeoutId = setTimeout(() => {
  //       cancellationSource?.signal.addEventListener('abort', () => {
  //         // If request was cancelled before completing, clear state
  //         clearTimeout(timeoutId);
  //         cancellationSource = null;
  //       });

  //       axiosInstance
  //         .post(ENDPOINTS.productPrices, { productIds: ids }, { signal: cancellationSource?.signal }).then(response => {
  //           // console.log(response);

  //           if (response?.data?.data) {
  //             const idwithpriceObj: any = {}
  //             response?.data?.data?.forEach((product: any) => idwithpriceObj[product?.productId] = product)
  //             setPriceForEachId(idwithpriceObj)
  //           }
  //           clearTimeout(timeoutId);
  //           cancellationSource = null;
  //         }).catch(error => {
  //           if (error.name !== 'AbortError') {
  //             // console.error(error);
  //           }
  //           clearTimeout(timeoutId);
  //           cancellationSource = null;
  //         });
  //     }, 100)
  //   }
  //   fetchData();
  //   return () => {
  //     clearTimeout(timeoutId);
  //     if (cancellationSource) {
  //       cancellationSource.abort();
  //     }
  //   };
  // }, [categoryData])
  useEffect(() => {
    if (priceData?.data?.length > 0) {
      const idwithpriceObj: any = {}
      priceData?.data?.forEach((product: any) => idwithpriceObj[product?.productId] = product)
      setPriceForEachId(idwithpriceObj)
    }
  }, [priceData])
  useEffect(() => {
    if (categoryData?.items?.length > 0) {
      const productIds = categoryData?.items?.map((product:any )=> product?.productId);
      setProductIds({ productIds })
    }
  }, [categoryData])
  return (
    <Fragment>
      <Box className="ProductList">
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
        <Pagination count={10} shape="rounded" />
      </Stack>
    </Fragment>
  )
}

export default ProductList