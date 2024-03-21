import React, { Fragment, useCallback } from "react"
import { useMediaQuery, Theme, ListItem, ListItemButton, ListItemText, Divider } from "@mui/material"

import SmallScreenFilters from "./SmallScreenFilters"
import LargerScreenFilters from "./LargerScreenFilters"
import { navigate } from "gatsby"

interface Props {
  setSelectedFilters: any,
  setSelectedPrice: any,
  selectedFilters: { [key: string]: string[] },
  page: number
}

function CategoryFilters({ setSelectedFilters, setSelectedPrice, selectedFilters, page }: Props) {
  const isSmallScreen: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

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
      <SmallScreenFilters renderList={renderList} setSelectedFiltersMobile={setSelectedFilters} setSelectedPriceMobile={setSelectedPrice} />
    ) : (
      <LargerScreenFilters renderList={renderList} setSelectedFilters={setSelectedFilters} setSelectedPrice={setSelectedPrice} selectedFilters={selectedFilters} page={page} />
    )
  )
}

export default React.memo(CategoryFilters)