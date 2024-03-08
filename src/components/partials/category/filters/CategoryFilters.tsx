import React, { Fragment, useCallback } from "react"
import { useMediaQuery, Theme, Box, List, ListItem, ListItemButton, ListItemText, Divider } from "@mui/material"
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Hooks
import { useAppSelector } from "@/hooks"
import SmallScreenFilters from "./SmallScreenFilters"
import LargerScreenFilters from "./LargerScreenFilters"

interface Props {
  setSelectedFilters: any, setSelectedPrice: any, selectedFilters: { [key: string]: string[] }
}

const schema = yup.object().shape({
  Gender: yup.array().required().nullable(),
})

function CategoryFilters({ setSelectedFilters, setSelectedPrice, selectedFilters }: Props) {
  const isSmallScreen: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  const categoryData = useAppSelector(state => state.category)

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   control,
  //   formState: { errors },
  // } = useForm<UiFormInputs>({
  //   resolver: yupResolver(schema),
  //   defaultValues: {},
  // })

  const renderList = useCallback((data: any) => {
    return (
      <>
        {
          data.map((item: any, index: number) => (
            <Fragment key={item.categoryId}>
              <ListItem >
                <ListItemButton href="#">
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
      <SmallScreenFilters renderList={renderList} />
    ) : (
      <LargerScreenFilters renderList={renderList} setSelectedFilters={setSelectedFilters} setSelectedPrice={setSelectedPrice} selectedFilters={selectedFilters} />
    )
  )
}

export default React.memo(CategoryFilters)