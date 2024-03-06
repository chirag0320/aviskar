import React from "react"
import { useMediaQuery, Theme, Box, Button, Container, Drawer, IconButton, Typography, } from "@mui/material"
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Type
import type { FormControlLabelProps } from '@mui/material'

// Assets
import { CrossIcon, SortbyIcon } from "@/assets/icons/index"

// Utils
import { sortByOptions } from "@/utils/data"

interface UiFormInputs {
  Name: string
  Industry: string
  CompanySize: number
  Gender: string
  Password: string
  Subscribe: string
  Number: string
}

const schema = yup.object().shape({
  Name: yup.string().required(),
  CompanySize: yup.number().required().nullable(),
  Gender: yup.array().required().nullable(),
  Password: yup.string().required(),
  Subscribe: yup.string().required(),
  Number: yup.string().required(),
})

// Hooks
import { useToggle } from "@/hooks"

// Utils
import RenderFields from "@/components/common/RenderFields"

function SortBy() {
  const isSmallScreen: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const [openSortBy, toggleSortBy] = useToggle(false)
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

  const renderSortByFields = (labelPlacement: FormControlLabelProps['labelPlacement']) => {
    return (
      <RenderFields
        type="radio"
        control={control}
        register={register}
        name="CompanySize"
        labelPlacement={labelPlacement}
        error={errors.CompanySize}
        options={sortByOptions}
        margin="none"
        fullWidth
      />
    )
  }

  return (
    isSmallScreen ? (
      <>
        <Button
          color="secondary"
          variant="outlined"
          startIcon={<SortbyIcon />}
          onClick={toggleSortBy}
          className="OultinedButton"
        >
          Sort
        </Button>
        {openSortBy && (
          <Drawer
            id="SortByDrawer"
            anchor="bottom"
            open={openSortBy}
            onClose={toggleSortBy}
          >
            <Box className="DrawerHeader">
              <Container className="Wrapper">
                <Typography variant="subtitle2">SORT BY</Typography>
                <IconButton className="CloseButton" onClick={toggleSortBy}><CrossIcon /></IconButton>
              </Container>
            </Box>
            <Box className="DrawerContent">
              <Container>
                {renderSortByFields("start")}
              </Container>
            </Box>
          </Drawer>
        )}
      </>
    ) : (
      renderSortByFields("end")
    )
  )
}

export default SortBy