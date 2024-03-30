import React, { useEffect, useState } from "react"
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
import useDebounce from "@/hooks/useDebounce"
import { categoryRequestBody } from "@/types/categoryRequestBody"
import useApiRequest from "@/hooks/useAPIRequest"
import { serProgressLoaderStatus } from "@/redux/reducers/homepageReducer"

export const pageSize = 12;
export const requestBodyDefault: categoryRequestBody = {
    search: "",
    pageNo: 0,
    pageSize: pageSize,
    sortBy: "",
    sortOrder: "",
    filters: {
        minPrice: 0,
        maxPrice: 100,
        specification: {}
    }
}

function Category({ location }: { location: any }) {
    const searchParams = new URLSearchParams(location?.search);
    const [page, setPage] = useState(searchParams.has("page") ? parseInt(searchParams.get("page")!) : 1);
    const dispatch = useAppDispatch();

    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});
    const [selectedPrice, setSelectedPrice] = useState<number[] | null>(null);

    const [productIds, setProductIds] = useState({})
    const { data: priceData, loading: priceLoading } = useApiRequest(ENDPOINTS.productPrices, 'post', productIds, 60);
    const categoryData = useAppSelector(state => state.category);

    const debounceFilter = useDebounce(selectedFilters, 700);
    const debouncePrice = useDebounce(selectedPrice, 700);
    useEffect(() => {
        dispatch(serProgressLoaderStatus(true))
        return () => {
            dispatch(serProgressLoaderStatus(false))
        }
    }, [])

    useEffect(() => {
        const commonArgument = {
            pageNo: page, filters: { minPrice: selectedPrice?.[0], maxPrice: selectedPrice?.[1], specification: selectedFilters }
        };

        const argumentForService = {
            url: searchParams.has("keyword") ? ENDPOINTS.search : ENDPOINTS.getCategoryData + `/${location.pathname}`,
            body: searchParams.has("keyword") ? { ...requestBodyDefault, search: searchParams.get("keyword")!, ...commonArgument } : { ...requestBodyDefault, ...commonArgument }
        }

        if (Object.keys(selectedFilters).length || (selectedPrice)) {
            dispatch(getCategoryData(
                argumentForService) as any)
        }
    }, [debounceFilter, debouncePrice]);

    useEffect(() => {
        setSelectedFilters((prev) => ({}));
        setSelectedPrice(() => null);

        const argumentForService = {
            url: searchParams.has("keyword") ? ENDPOINTS.search : ENDPOINTS.getCategoryData + `/${location.pathname}`,
            body: searchParams.has("keyword") ? { ...requestBodyDefault, search: searchParams.get("keyword")!, pageNo: page, filters: { specification: {} } } : { ...requestBodyDefault, pageNo: page, filters: { specification: {} } }
        }

        dispatch(getCategoryData(
            argumentForService) as any)
    }, [page, location.pathname])


    useEffect(() => {
        if (priceData?.data?.length > 0) {
            const idwithpriceObj: any = {}
            priceData?.data?.forEach((product: any) => idwithpriceObj[product?.productId] = product)
            // setPriceForEachId(() => idwithpriceObj)
            dispatch(setPriceForEachItem(idwithpriceObj));
        }
    }, [priceData])

    useEffect(() => {
        if (categoryData?.items?.length > 0) {
            // console.log("🚀 ~ useEffect ~ categoryData:", categoryData)
            const productIds = categoryData?.items?.map((product: any) => product?.productId);
            setProductIds({ productIds })
        }
    }, [categoryData.specifications])

    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

    const categoryFilters = (
        <CategoryFilters selectedFilters={selectedFilters} setSelectedPrice={setSelectedPrice} setSelectedFilters={setSelectedFilters} page={page} />
    );

    // console.log("🚀 ~ Category ~ selectedFilters:", selectedFilters)

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
                        <SortBy page={page} />
                        {categoryFilters}
                    </Stack>
                ) : null}
                <Stack className="MainContent">
                    {!isSmallScreen ? categoryFilters : null}
                    <ProductList page={page} setPage={setPage} />
                </Stack>
            </Container>
        </Layout>
    )
}

export default Category