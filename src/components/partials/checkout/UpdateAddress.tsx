
import React from "react"
import { Box, Stack, Typography } from "@mui/material"
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Hooks
import { useToggle } from "@/hooks"

// Componenets
import StyledDialog from "@/components/common/StyledDialog"
import RenderFields from '@/components/common/RenderFields';

interface UpdateAddress {
  open: boolean
  dialogTitle: string
  onClose: () => void
}

interface Inputs {
  FirstName: string,
  LastName: string,
  Company: string,
  Contact: string,
  Email: string,
  Address1: string,
  Address2: string,
  City: string,
  Country: string,
  State: string,
  Code: number,
}

const schema = yup.object().shape({
  SelectMetal: yup.string().required(),
});

function UpdateAddress(props: UpdateAddress) {
  const { open, dialogTitle, onClose } = props

  const {
    register,
    reset,
    handleSubmit,
    clearErrors,
    control,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema)
  })

  return (
    <StyledDialog
      id="UpdateAddress"
      open={open}
      dialogTitle={dialogTitle}
      onClose={onClose}
      primaryActionText="Save"
      maxWidth="sm"
    >
      <Stack className="AllFields">
        <Stack className="Column">
          <RenderFields
            register={register}
            error={errors.FirstName}
            name="FirstName"
            placeholder="Enter first name"
            control={control}
            variant='outlined'
            margin='none'
          />
          <RenderFields
            register={register}
            error={errors.LastName}
            name="LastName"
            placeholder="Enter last name"
            control={control}
            variant='outlined'
            margin='none'
          />
        </Stack>
        <RenderFields
          register={register}
          error={errors.Company}
          name="Company"
          placeholder="Enter company"
          control={control}
          variant='outlined'
          margin='none'
        />
        <Stack className="Column">
          <RenderFields
            register={register}
            error={errors.Contact}
            name="Contact"
            placeholder="Enter contact"
            control={control}
            variant='outlined'
            margin='none'
          />
          <RenderFields
            register={register}
            error={errors.Email}
            name="Email"
            placeholder="Enter email id"
            control={control}
            variant='outlined'
            margin='none'
          />
        </Stack>
        <RenderFields
          register={register}
          error={errors.Address1}
          name="Address1"
          placeholder="Enter address line 1"
          control={control}
          variant='outlined'
          margin='none'
        />
        <RenderFields
          register={register}
          error={errors.Address2}
          name="Address2"
          placeholder="Enter address line 2"
          control={control}
          variant='outlined'
          margin='none'
        />
        <Stack className="Column">
          <RenderFields
            register={register}
            error={errors.City}
            name="City"
            placeholder="Enter city"
            control={control}
            variant='outlined'
            margin='none'
          />
          <RenderFields
            register={register}
            error={errors.Country}
            name="Country"
            placeholder="Enter country"
            control={control}
            variant='outlined'
            margin='none'
          />
        </Stack>
        <Stack className="Column">
          <RenderFields
            register={register}
            error={errors.State}
            name="State"
            placeholder="Enter state"
            control={control}
            variant='outlined'
            margin='none'
          />
          <RenderFields
            type="number"
            register={register}
            error={errors.Code}
            name="Code"
            placeholder="Enter pin code"
            control={control}
            variant='outlined'
            margin='none'
          />
        </Stack>
      </Stack>
    </StyledDialog>
  )
}

export default UpdateAddress