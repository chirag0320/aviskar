import React from "react"
import { Box, Skeleton, Card, Pagination, Stack, Typography } from "@mui/material"

// Components
import { ProductCard } from "@/components/common/Card"
// Hooks
import { useAppSelector } from "@/hooks"
import { pageSize } from "@/pages/[category]"
import Toaster from "@/components/common/Toaster"
import { navigate } from "gatsby"

function ProductList({ page, setPage }: { page: number, setPage: any }) {
  const categoryData = useAppSelector((state) => state.category);
  const { openToaster } = useAppSelector(state => state.homePage)

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    // navigate(`?page=${value}`, { replace: true });
    const pageQuery = new URLSearchParams(location.search);
    pageQuery.set('page', value.toString());
    navigate(`?${pageQuery.toString()}`, { replace: true });
  }

  return (
    <Box className="ProductList">
      {openToaster && <Toaster />}
      <Box className="ProductListWrapper">

        {
          !categoryData.loading ? (
            categoryData?.items?.length > 0 ? categoryData.items.map((product: any) => {
              return (
                <ProductCard key={product.productId} product={product} stickyProduct={false} />
              );
            })
              : <Typography variant="body1">Record not found</Typography>
          ) : (
            Array(6).fill(0).map((_, index) => {
              return (
                <Card className="ProductCard" key={index}>
                  <Skeleton animation="wave" height={350} width="100%" style={{ borderRadius: "10px 10px 0 0", padding: "0px" }} />
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <Skeleton animation="wave" height={95} width="95%" style={{ marginBottom: "4px" }} />
                    <Skeleton animation="wave" height={70} width="95%" />
                  </div>
                </Card>
              )
            })
          )
        }
      </Box>
      <Stack className="Pagination">
        {categoryData?.count > 0 && <Pagination count={Math.ceil(categoryData?.count / pageSize)} page={page} shape="rounded" onChange={handlePageChange} />}
      </Stack>
    </Box>
  )
}

export default ProductList