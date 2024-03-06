import React, { Fragment } from "react"
import { useMediaQuery, Theme, Box, List, ListItem, ListItemButton, ListItemText, Divider } from "@mui/material"
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Hooks
import { useAppSelector } from "@/hooks"
import SmallScreenFilters from "./SmallScreenFilters"
import LargerScreenFilters from "./LargerScreenFilters"

interface UiFormInputs {
  Gender: string
}

const schema = yup.object().shape({
  Gender: yup.array().required().nullable(),
})

function CategoryFilters() {
  const isSmallScreen: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  const categoryData = useAppSelector(state => state.category)

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UiFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {},
  })

  const renderList = (data: any) => {
    return (
      <List>
        {data.map((item: any, index: number) => (
          <Fragment key={item.categoryId}>
            <ListItem >
              <ListItemButton href="#">
                <ListItemText primary={item.name} primaryTypographyProps={{ variant: "body2" }} />
              </ListItemButton>
            </ListItem>
            {(index !== data.length - 1) && <Divider key={`Divider-${item}`} />}
          </Fragment>
        ))}
      </List>
    )
  }

  return (
    isSmallScreen ? (
      <SmallScreenFilters categoryData={categoryData} renderList={renderList} />
    ) : (
      <LargerScreenFilters categoryData={categoryData} renderList={renderList} />
    )
  )
}

export default CategoryFilters