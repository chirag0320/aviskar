import React, { useEffect, useMemo, useState } from "react"
import { useMediaQuery, Theme, Container, Stack } from "@mui/material"

// Components
import Layout from "@/components/common/Layout"
import Seo from "@/components/common/Seo"
import CategoryFilters from "@/components/partials/category/filters/CategoryFilters"
import ProductList from "@/components/partials/category/ProductList"
import SortBy from "@/components/partials/category/filters/SortBy"
import { getCategoryData, setPriceForEachItem } from "@/redux/reducers/categoryReducer"
import { ENDPOINTS } from "@/utils/constants"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { categoryRequestBody } from "@/types/categoryRequestBody"
import useApiRequest from "@/hooks/useAPIRequest"

export const pageSize = 12;
export const requestBodyDefault: categoryRequestBody = {
    search: "",
    pageNo: 0,
    pageSize: pageSize,
    sortBy: "",
    sortOrder: "",
    filters: {
        // minPrice: 0,
        // maxPrice: 100,
        specification: {}
    }
}

function Category({ location }: { location: any }) {
    const searchParams = useMemo(() => new URLSearchParams(location?.search), [location?.search]);
    const [page, setPage] = useState(searchParams.has("page") ? parseInt(searchParams.get("page")!) : 1);
    const dispatch = useAppDispatch();

    const [productIds, setProductIds] = useState({})
    const { data: priceData, loading: priceLoading } = useApiRequest(ENDPOINTS.productPrices, 'post', productIds, 60);
    const categoryData = useAppSelector(state => state.category);

    useEffect(() => {
        const callApi = async () => {
            await dispatch(getCategoryData({
                url: searchParams.has("keyword") ? ENDPOINTS.search : ENDPOINTS.getCategoryData + `/${location.pathname}`,
                body: searchParams.has("keyword") ? { ...requestBodyDefault, search: searchParams.get("keyword")!, pageNo: page - 1, filters: { specification: {} } } : {
                    ...requestBodyDefault, pageNo: page - 1, filters: { specification: {} }
                }
            }) as any)
        }
        callApi();
    }, [searchParams,location.pathname])

    useEffect(() => {
        if (categoryData?.items?.length > 0) {
            const productIds = categoryData?.items?.map((product: any) => product?.productId);
            setProductIds({ productIds })
        }
    }, [categoryData.specifications])

    useEffect(() => {
        if (priceData?.data?.length > 0) {
            const idwithpriceObj: any = {}
            priceData?.data?.forEach((product: any) => idwithpriceObj[product?.productId] = product)
            // setPriceForEachId(() => idwithpriceObj)
            dispatch(setPriceForEachItem(idwithpriceObj));
        }
    }, [priceData])

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
                        <CategoryFilters page={page} searchParams={searchParams} />
                    </Stack>
                ) : null}
                <Stack className="MainContent">
                    {!isSmallScreen ? <CategoryFilters page={page} searchParams={searchParams} /> : null}
                    <ProductList page={page} setPage={setPage} />
                </Stack>
            </Container>
        </Layout>
    )
}

export default Category