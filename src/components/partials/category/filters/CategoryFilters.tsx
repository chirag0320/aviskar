import React, { Fragment, useCallback, useEffect, useState } from "react"
import { useMediaQuery, Theme, ListItem, ListItemButton, ListItemText, Divider } from "@mui/material"

import SmallScreenFilters from "./SmallScreenFilters"
import LargerScreenFilters from "./LargerScreenFilters"
import { navigate } from "gatsby"
import useDebounce from "@/hooks/useDebounce"
import { ENDPOINTS } from "@/utils/constants"
import { requestBodyDefault } from "@/pages/[category]"
import { getCategoryData } from "@/redux/reducers/categoryReducer"
import { useAppDispatch } from "@/hooks"

function CategoryFilters({ page, searchParams,setPage }: { setPage:any,page: number, searchParams: URLSearchParams }) {
  const isSmallScreen: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});
  const [selectedPrice, setSelectedPrice] = useState<number[] | null>(null);
  const dispatch = useAppDispatch();

  const debounceFilter = useDebounce(selectedFilters, 700);
  const debouncePrice = useDebounce(selectedPrice, 700);
  const fetchData = async () => {
    const commonArgument = {
      pageNo: page - 1, filters: { minPrice: selectedPrice?.[0], maxPrice: selectedPrice?.[1], specification: selectedFilters }
    };

    const argumentForService = {
      url: searchParams.has("keyword") ? ENDPOINTS.search : ENDPOINTS.getCategoryData + `/${location.pathname}`,
      body: searchParams.has("keyword") ? { ...requestBodyDefault, search: searchParams.get("keyword")!, ...commonArgument } : { ...requestBodyDefault, ...commonArgument }
    }

    // if (selectedFilters && Object.keys(selectedFilters)?.length || (selectedPrice)) {
      await dispatch(getCategoryData(
        argumentForService) as any)
    // }
  }
  useEffect(() => {
    if(setPage){
      setPage(()=>searchParams.has("page") ? parseInt(searchParams.get("page")!) : 1)
    }
  }, [searchParams]);

  useEffect(() => {
    const pageQuery = new URLSearchParams(location.search);
    pageQuery.set('page', "1");
    navigate(`?${pageQuery.toString()}`, { replace: true });
    if(page === 1){
      fetchData();
    }
  },[debounceFilter, debouncePrice])

useEffect(()=>{
  fetchData();
},[page])

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
      <LargerScreenFilters renderList={renderList} setSelectedFilters={setSelectedFilters} setSelectedPrice={setSelectedPrice} selectedFilters={selectedFilters} page={page} />
    )
  )
}

export default React.memo(CategoryFilters)