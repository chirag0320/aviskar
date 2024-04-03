import React, { Fragment, useCallback, useEffect, useState } from "react"
import { useMediaQuery, Theme, ListItem, ListItemButton, ListItemText, Divider } from "@mui/material"

import SmallScreenFilters from "./SmallScreenFilters"
import LargerScreenFilters from "./LargerScreenFilters"
import { navigate } from "gatsby"
import useDebounce from "@/hooks/useDebounce"
import { ENDPOINTS } from "@/utils/constants"
import { requestBodyDefault } from "@/pages/[category]"
import { getCategoryData, setClearFilters, setSortBy } from "@/redux/reducers/categoryReducer"
import { useAppDispatch, useAppSelector } from "@/hooks"
let timeOut: any;
function CategoryFilters({ page, searchParams, setPage }: { setPage: any, page: number, searchParams: URLSearchParams }) {
  const isSmallScreen: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});
  const [selectedPrice, setSelectedPrice] = useState<number[] | null>(null);
  const clearFilters = useAppSelector(state => state.category.clearFilters)
  const dispatch = useAppDispatch();

  const debounceFilter = useDebounce(selectedFilters, 700);
  const debouncePrice = useDebounce(selectedPrice, 700);

  const fetchData = async () => {
    const commonArgument = {
      pageNo: page - 1, filters: { minPrice: selectedPrice?.[0], maxPrice: selectedPrice?.[1], specification: selectedFilters }
    };

    const argumentForService = {
      url: searchParams.has("keyword") ? ENDPOINTS.search : ENDPOINTS.getCategoryData + `${location.pathname}`,
      body: searchParams.has("keyword") ? { ...requestBodyDefault, search: searchParams.get("keyword")!, ...commonArgument } : { ...requestBodyDefault, ...commonArgument }
    }
    if (timeOut) {
      clearTimeout(timeOut)
    }
    timeOut = setTimeout(() => {
      dispatch(getCategoryData(
        argumentForService) as any)
    }, 1000);
    // if (selectedFilters && Object.keys(selectedFilters)?.length || (selectedPrice)) {
    // await dispatch(getCategoryData(
    //   argumentForService) as any)
    // }
  }

  useEffect(() => {
    if (setPage) {
      // if (parseInt(searchParams.get("page")!) == 1) {
      fetchData()
      // }
      setPage(() => searchParams.has("page") ? parseInt(searchParams.get("page")!) : 1)
    }
  }, [window.location, searchParams]);

  useEffect(() => {
    const pageQuery = new URLSearchParams(location.search);
    pageQuery.set('page', "1");
    navigate(`?${pageQuery.toString()}`, { replace: true });
    if (page === 1) {
      fetchData();
    }
  }, [debounceFilter, debouncePrice])

  useEffect(() => {
    fetchData();
  }, [page])

  useEffect(() => {
    if (clearFilters) {
      const apiCall = async () => {
        const commonArgument = {
          pageNo: 1, filters: { specification: {} }
        };

        const argumentForService = {
          url: searchParams.has("keyword") ? ENDPOINTS.search : ENDPOINTS.getCategoryData + `${location.pathname}`,
          body: searchParams.has("keyword") ? { ...requestBodyDefault, search: searchParams.get("keyword")!, ...commonArgument } : { ...requestBodyDefault, ...commonArgument }
        }

        // if (selectedFilters && Object.keys(selectedFilters)?.length || (selectedPrice)) {
        await dispatch(getCategoryData(
          argumentForService) as any)
      }
      setSelectedFilters({});
      setSelectedPrice(null);
      dispatch(setSortBy(null));
      apiCall();
      dispatch(setClearFilters(false));
    }
  }, [clearFilters])

  const navigatePageHandler = (categoryId: number, searchEngineFriendlyPageName: string) => {
    navigate(`/${searchEngineFriendlyPageName}`, { state: { categoryId: categoryId } })
  }

  const renderList = useCallback((data: any) => {
    return (
      <>
        {
          data.map((item: any, index: number) => (
            <Fragment key={item.categoryId}>
              <ListItem>
                <ListItemButton onClick={() => navigatePageHandler(item.categoryId, item.searchEngineFriendlyPageName)}>
                  <ListItemText primary={item.name} primaryTypographyProps={{ variant: "body2" }} />
                </ListItemButton>
              </ListItem>
              {(index !== data.length - 1) && <Divider key={`Divider-${item}`} />}
            </Fragment>
          ))
        }
      </>
    )
  }, [])

  return (
    isSmallScreen ? (
      <SmallScreenFilters renderList={renderList} setSelectedFiltersMobile={setSelectedFilters} setSelectedPriceMobile={setSelectedPrice} page={page} />
    ) : (
      <LargerScreenFilters renderList={renderList} setSelectedFilters={setSelectedFilters} setSelectedPrice={setSelectedPrice} selectedFilters={selectedFilters} searchParams={searchParams} />
    )
  )
}

export default React.memo(CategoryFilters)