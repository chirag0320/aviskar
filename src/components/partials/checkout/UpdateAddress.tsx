
import React, { useEffect, useState } from "react"
import { Autocomplete, MenuItem, Button, Stack, TextField, Box, Typography } from "@mui/material"
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Hooks
import { useAppDispatch, useAppSelector } from "@/hooks"

// Componenets
import StyledDialog from "@/components/common/StyledDialog"
import RenderFields from "@/components/common/RenderFields"
import GoogleMaps from "@/components/common/GoogleMaps"
import { StateOrCountry, addOrEditAddress, updateAddress } from "@/redux/reducers/checkoutReducer";
import { ENDPOINTS } from "@/utils/constants";
import { hasFulfilled } from "@/utils/common"
import { addressSchema } from "./AddAddress"
import useShowToaster from "@/hooks/useShowToaster"
import { AddressComponents } from "@/utils/parseAddressComponents"

interface UpdateAddress {
  open: boolean
  dialogTitle: string
  onClose: () => void
  existingAddress?: any
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

function UpdateAddress(props: UpdateAddress) {
  const { open, dialogTitle, onClose, existingAddress } = props
  const loading = useAppSelector(state => state.checkoutPage.loading);
  const countryList = useAppSelector(state => state.checkoutPage.countryList);
  const stateList = useAppSelector(state => state.checkoutPage.stateList);
  const [stateId, setStateId] = useState<number | null>(null);
  // console.log("🚀 ~ UpdateAddress ~ existingAddress:", existingAddress)
  const dispatch = useAppDispatch();
  const { showToaster } = useShowToaster();
  const [googleAddressComponents, setGoogleAddressComponents] = useState<AddressComponents | null>(null);

  const {
    register,
    reset,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(addressSchema)
  })

  const onAddressFormSubmitHandler = async (data: any) => {
    const addressQuery = {
      firstName: data.FirstName,
      lastName: data.LastName,
      company: data.Company,
      phoneNumber: data.Contact,
      email: data.Email,
      isVerified: false, // static
      addressLine1: data.Address1,
      addressLine2: data.Address2,
      city: data.City,
      stateId: stateId,
      stateName: data.State,
      postcode: data.Code,
      countryId: data.Country,
    }

    const response = await dispatch(addOrEditAddress({
      url: ENDPOINTS.addOrEditAddress,
      body: {
        ...addressQuery,
        addressId: existingAddress.addressId
      }
    }))

    if (hasFulfilled(response.type)) {
      onClose()
      reset()
      showToaster({ message: "Address saved successfully", severity: 'success' })
      dispatch(updateAddress({
        ...existingAddress,
        firstName: data.FirstName,
        lastName: data.LastName,
        company: data.Company,
        phone1: data.Contact,
        email: data.Email,
        addressLine1: data.Address1,
        addressLine2: data.Address2,
        city: data.City,
        stateName: data.State,
        postcode: data.Code,
        country: data.Country,
        countryName: countryList.find((country: StateOrCountry) => country.id === data.Country)?.name,
        state: stateId,
      }))
    } else {
      showToaster({ message: "Failed to save address", severity: 'error' })
    }
  }

  useEffect(() => {
    // console.log("🚀 ~ useEffect ~ googleAddressComponents:", googleAddressComponents)

    if (googleAddressComponents) {
      setValue('Address1', googleAddressComponents.address)
      // setValue('Country', googleAddressComponents.country)
      countryList.forEach((country: StateOrCountry) => {
        if (country.name === googleAddressComponents.country) {
          setValue('Country', country.id.toString())
        }
      })
      setValue('State', googleAddressComponents.state)
      setStateId(() => null);
    }
  }, [googleAddressComponents])

  useEffect(() => {
    setValue('State', existingAddress?.stateName);
    setStateId(existingAddress?.state);
    return () => {
      reset()
    }
  }, [existingAddress])

  return (
    <StyledDialog
      id="UpdateAddress"
      open={open}
      dialogTitle={dialogTitle}
      onClose={onClose}
      primaryActionText="Save"
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit(onAddressFormSubmitHandler)}>
        <Stack className="AllFields" >
          <Stack className="Column">
            <RenderFields
              register={register}
              error={errors.FirstName}
              name="FirstName"
              placeholder="Enter first name *"
              control={control}
              // setValue={setValue}
              defaultValue={existingAddress?.firstName}
              variant='outlined'
              margin='none'
            />
            <RenderFields
              register={register}
              error={errors.LastName}
              defaultValue={existingAddress?.lastName}
              name="LastName"
              placeholder="Enter last name *"
              control={control}
              variant='outlined'
              margin='none'
            />
          </Stack>
          <RenderFields
            register={register}
            error={errors.Company}
            name="Company"
            defaultValue={existingAddress?.company}
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
              defaultValue={existingAddress?.phone1}
              type="number"
              placeholder="Enter contact *"
              control={control}
              variant='outlined'
              margin='none'
            />
            <RenderFields
              register={register}
              error={errors.Email}
              name="Email"
              defaultValue={existingAddress?.email}
              placeholder="Enter email id *"
              control={control}
              variant='outlined'
              margin='none'
            />
          </Stack>
          <GoogleMaps setParsedAddress={setGoogleAddressComponents} />
          <RenderFields
            register={register}
            error={errors.Address1}
            name="Address1"
            defaultValue={existingAddress?.addressLine1}
            placeholder="Enter address line 1 *"
            control={control}
            variant='outlined'
            margin='none'
          />
          <RenderFields
            register={register}
            error={errors.Address2}
            name="Address2"
            defaultValue={existingAddress?.addressLine2}
            placeholder="Enter address line 2"
            control={control}
            variant='outlined'
            margin='none'
          />
          <Stack className="Column">
            <RenderFields
              register={register}
              error={errors.City}
              defaultValue={existingAddress?.city}
              name="City"
              placeholder="Enter city *"
              control={control}
              variant='outlined'
              margin='none'
            />
            <RenderFields
              register={register}
              type="select"
              control={control}
              error={errors.Country}
              name="Country *"
              defaultValue={existingAddress?.country}
              variant='outlined'
              margin='none'
              setValue={setValue}
            >
              <MenuItem value="none">Select country</MenuItem>
              {countryList.map((country: StateOrCountry) => (
                <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
              ))}
            </RenderFields>
          </Stack>
          <Stack className="Column">
            <Autocomplete
              disablePortal
              options={stateList}
              defaultValue={existingAddress?.stateName}
              getOptionLabel={option => {
                if (typeof option === 'string') {
                  return option;
                }
                return option.name;
              }}
              renderInput={(params) => <TextField placeholder="Enter state *" {...params} error={errors.State as boolean | undefined} required />}
              fullWidth
              onChange={(_, value) => {
                if (!value) {
                  return;
                }

                if (typeof value === 'string') {
                  setValue('State', value);
                }
                else {
                  setValue('State', value.name);
                  setStateId(value.id);
                }
              }}
              onInputChange={(event, newInputValue) => {
                setValue('State', newInputValue); // Update the form value with the manually typed input
              }}
              freeSolo
            />
            <RenderFields
              type="number"
              register={register}
              error={errors.Code}
              name="Code"
              defaultValue={existingAddress?.postcode}
              placeholder="Enter pin code *"
              control={control}
              variant='outlined'
              margin='none'
            />
          </Stack>
          <Stack className="ActionWrapper">
            <Button variant="outlined" onClick={onClose}>
              Close
            </Button>
            <Button variant="contained" type="submit" disabled={loading}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
    </StyledDialog >
  )
}

export default UpdateAddress