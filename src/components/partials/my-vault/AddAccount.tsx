
import React, { useEffect, useState } from "react"
import { Autocomplete, MenuItem, Button, Stack, TextField, Box, Typography, IconButton, Divider } from "@mui/material"
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Hooks
import { useAppDispatch, useAppSelector } from "@/hooks"

// Componenets
import StyledDialog from "@/components/common/StyledDialog"
import RenderFields from "@/components/common/RenderFields"
import GoogleMaps from "@/components/common/GoogleMaps"
import { StateOrCountry, addAddress as addAddressForCheckout, addOrEditAddress as addOrEditAddressForCheckout } from "@/redux/reducers/checkoutReducer";
import { ENDPOINTS } from "@/utils/constants";
import { AccountTypeEnum, PhoneNumberCountryCode, hasFulfilled } from "@/utils/common"
import useShowToaster from "@/hooks/useShowToaster"
import { AddressComponents } from "@/utils/parseAddressComponents"
import { AddressType } from "@/types/enums"
import { addOrEditAddresses as addOrEditAddressForMyVault, addAddress as addAddressForMyVault, addOrEditAccount } from "@/redux/reducers/myVaultReducer"
import { Delete1Icon } from "@/assets/icons"
import { IDropdownItem } from "@/types/myVault"
import { BussinessAccountFormSchema, IndividualAccountFormSchema, JointAccountFormSchema, SuperFundAccountFormSchema, TrustAccountFormSchema } from "@/utils/accountFormSchemas.schema"
import { AxiosError } from "axios"

interface AddAccountProps {
  open: boolean
  dialogTitle: string
  alignment: string
  onClose: () => void
  addressTypeId?: number
  handleAddressUpdate?: (addressData: any, isbilling: any) => any
  hadleSecondaryAction: () => void
}

interface Inputs {
  BusinessName: string,
  SuperfundName: string,
  TrustName: string,
  TrusteeName: string,
  TrusteeType: string,
  FirstName: string,
  LastName: string,
  Company: string,
  Contact: string,
  ContactCode: string,
  Email: string,
  Address1: string,
  Address2: string,
  City: string,
  Country: string,
  State: string,
  Code: number,
}

function getSchemaFromAlignment(alignment: string) {
  switch (alignment) {
    case "Individual":
      return IndividualAccountFormSchema;
    case "Business":
      return BussinessAccountFormSchema;
    case "Joint":
      return JointAccountFormSchema;
    case "SuperFund":
      return SuperFundAccountFormSchema;
    case "Trust":
      return TrustAccountFormSchema;
    default:
      return IndividualAccountFormSchema
  }
}

function AddAccount(props: AddAccountProps) {
  const { open, dialogTitle, alignment, onClose, addressTypeId, handleAddressUpdate, hadleSecondaryAction } = props
  // console.log("🚀 ~ AddAccount ~ trusteeTypes:", trusteeTypes)
  const configDropdowns = useAppSelector(state => state.myVault.configDropdowns)
  const dispatch = useAppDispatch();
  // const countryList = useAppSelector(state => state.checkoutPage.countryList);
  // const configDropdowns?.stateList = useAppSelector(state => state.checkoutPage.stateList);
  const [stateList, setStateList] = useState([])
  const [stateId, setStateId] = useState<number | null>(null);
  const { showToaster } = useShowToaster();
  const loading = useAppSelector(state => state.checkoutPage.loading);
  const [googleAddressComponents, setGoogleAddressComponents] = useState<AddressComponents & { postalCode?: string } | null>(null);
  const [countryValue, setcountryValue] = useState<any>('-1')
  const [stateValue, setstateValue] = useState<any>('')
  const [additionalFieldsCount, setAdditionalFieldsCount] = useState(0);

  const {
    register,
    reset,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(getSchemaFromAlignment(alignment))
  })

  const onAddressFormSubmitHandler = async (data: any) => {
    // console.log("🚀 ~ onAddressFormSubmitHandler ~ data:", data)

    const commonAddressQueryForPreparation = {
      // addressTypeId,
      firstName: data.FirstName,
      lastName: data.LastName,
      phoneNumber: data.Contact,
      email: data.Email,
      isVerified: true, // static
      city: data.City,
      state: stateId || 0,
      country: data.Country,
      accountTypeId: AccountTypeEnum[alignment],
      additionalBeneficiary: [],
      address: {
        // "addressId": 0,
        firstName: data.FirstName,
        lastName: data.LastName,
        phoneNumber: data.Contact,
        email: data.Email,
        isVerified: true, // static
        addressLine1: data.Address1,
        addressLine2: data.Address2,
        city: data.City,
        state: stateId || 0,
        stateName: data.State,
        postcode: data.Code,
        countryId: data.Country,
        accountTypeId: AccountTypeEnum[alignment],
        additionalBeneficiary: [],
      }
    }

    let prepareAddressQuery;
    switch (alignment) {
      case "Joint":
        prepareAddressQuery = { ...commonAddressQueryForPreparation } // need to change for addtional beneficary
        break;
      case "Business":
        prepareAddressQuery = { ...commonAddressQueryForPreparation, businessName: data.BusinessName }
        break;
      case "SuperFund":
        prepareAddressQuery = { ...commonAddressQueryForPreparation, superfundName: data.SuperfundName, trusteeTypeId: data.TrusteeType, trusteeName: data.TrusteeName }
        break;
      case "Trust":
        prepareAddressQuery = { ...commonAddressQueryForPreparation, trusteeName: data.TrusteeName, trustName: data.TrustName }
        break;
      default:
        prepareAddressQuery = { ...commonAddressQueryForPreparation }
        break;
    }

    const response = await dispatch(addOrEditAccount({
      url: ENDPOINTS.addOrEditAccount,
      body: prepareAddressQuery
    }))

    if (hasFulfilled(response.type)) {
      onClose()
      reset()
      showToaster({ message: "Account saved successfully", severity: "success" })
    }
    else {

      showToaster({ message: ((response.payload as AxiosError).response?.data as { message?: string }).message || "Failed to save address! Please try again", severity: "error" })
    }
  }

  useEffect(() => {
    return () => {
      reset()
      setcountryValue(-1)
      setstateValue('')
    }
  }, [open]);

  useEffect(() => {
    if (googleAddressComponents) {
      setValue('Address1', googleAddressComponents.address)
      configDropdowns?.countryList.forEach((country) => {
        if (country.name === googleAddressComponents.country.trim()) {
          setValue('Country', country.id.toString())
          setcountryValue(country.id.toString())
        }
      })
      setValue('State', googleAddressComponents.state)
      setstateValue(googleAddressComponents.state)
      setStateId(() => null);
      setValue('City', googleAddressComponents?.city)
      setValue('Address2', googleAddressComponents.address2)
      if (googleAddressComponents?.postalCode) {
        setValue("Code", Number(googleAddressComponents?.postalCode));
      }
    }
  }, [googleAddressComponents])

  useEffect(() => {
    const data: any = configDropdowns?.stateList.filter((state: any) => {
      return state.enumValue == countryValue || countryValue == -1
    })
    setStateList(data)
  }, [configDropdowns?.stateList, countryValue])

  const OnChange = (value: any) => {
    setcountryValue(value)
  }
  return (
    <StyledDialog
      id="AddAccountDialog"
      open={open}
      dialogTitle={dialogTitle}
      onClose={onClose}
      primaryActionText="Save"
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit(onAddressFormSubmitHandler)}>
        <Typography className="AccountType">Account Type : <Typography variant="inherit" component="span">{alignment}</Typography></Typography>
        <Stack className="FieldsWrapper">
          {alignment === "Business" && <Stack className="Fields BusinessFields">
            <RenderFields
              register={register}
              error={errors.BusinessName}
              name="BusinessName"
              placeholder="Enter business name *"
              control={control}
              variant='outlined'
              margin='none'
            />
          </Stack>}
          {alignment === "SuperFund" && <Stack className="Fields SuperfundFields">
            <RenderFields
              register={register}
              error={errors.SuperfundName}
              name="SuperfundName"
              placeholder="Enter superfund name *"
              control={control}
              variant='outlined'
              margin='none'
            />
            <Stack className="Column">
              <RenderFields
                register={register}
                type="select"
                control={control}
                error={errors.TrusteeType}
                setValue={setValue}
                name="TrusteeType"
                variant='outlined'
                margin='none'
              >
                <MenuItem value="none">Select trustee</MenuItem>
                {configDropdowns && configDropdowns.trusteeTypeList.map((trustee) =>
                  <MenuItem key={trustee.id} value={trustee.id}>{trustee.name}</MenuItem>
                )}
              </RenderFields>
              <RenderFields
                register={register}
                error={errors.TrusteeName}
                name="TrusteeName"
                placeholder="Enter trustee name *"
                control={control}
                variant='outlined'
                margin='none'
              />
            </Stack>
          </Stack>}
          {alignment === "Trust" && <Stack className="Fields TrustFields">
            <Stack className="Column">
              <RenderFields
                register={register}
                type="select"
                control={control}
                error={errors.TrusteeType}
                setValue={setValue}
                name="TrusteeType"
                variant='outlined'
                margin='none'
              >
                <MenuItem value="none">Select trustee</MenuItem>
                {configDropdowns && configDropdowns.trusteeTypeList.map((trustee) =>
                  <MenuItem key={trustee.id} value={trustee.id}>{trustee.name}</MenuItem>
                )}
              </RenderFields>
              <RenderFields
                register={register}
                error={errors.TrusteeName}
                name="TrusteeName"
                placeholder="Enter trustee name *"
                control={control}
                variant='outlined'
                margin='none'
              />
            </Stack>
            <RenderFields
              register={register}
              error={errors.TrustName}
              name="TrustName"
              placeholder="Enter trust name *"
              control={control}
              variant='outlined'
              margin='none'
            />
          </Stack>}
          <Stack className="Fields AllFields">
            <Stack className="Column">
              <RenderFields
                register={register}
                error={errors.FirstName}
                name="FirstName"
                placeholder="Enter first name *"
                control={control}
                variant='outlined'
                margin='none'
              />
              <RenderFields
                register={register}
                error={errors.LastName}
                name="LastName"
                placeholder="Enter last name *"
                control={control}
                variant='outlined'
                margin='none'
              />
            </Stack>
            <Stack className="Column">
              <Box className="ContactField">
                <RenderFields
                  register={register}
                  type="select"
                  control={control}
                  setValue={setValue}
                  name="ContactCode"
                  variant="outlined"
                  margin="none"
                  className="ContactSelect"
                >
                  {PhoneNumberCountryCode.map((phone) => <MenuItem key={phone.code} value={phone.dial_code}>{`${phone.name} (${phone.dial_code})`}</MenuItem>)}
                </RenderFields>
                <RenderFields
                  register={register}
                  error={errors.Contact || errors.ContactCode}
                  name="Contact"
                  type="number"
                  placeholder="Enter contact *"
                  control={control}
                  variant='outlined'
                  margin='none'
                  className="ContactTextField"
                />
              </Box>
              <RenderFields
                register={register}
                error={errors.Email}
                name="Email"
                placeholder="Enter email id *"
                control={control}
                variant='outlined'
                margin='none'
              />
            </Stack>
            <GoogleMaps setParsedAddress={setGoogleAddressComponents} />
            <Stack className="Column">
              <RenderFields
                register={register}
                error={errors.Address1}
                name="Address1"
                placeholder="Enter address line 1 *"
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
            </Stack>
            <Stack className="Column">
              <RenderFields
                register={register}
                error={errors.City}
                name="City"
                placeholder="Enter city *"
                control={control}
                variant='outlined'
                margin='none'
              />
              <Autocomplete
                disablePortal
                options={stateList}
                getOptionLabel={(option: any) => {
                  if (typeof option === 'string') {
                    return option;
                  }
                  return option.name;
                }}
                renderInput={(params) => <TextField placeholder="Enter state *" {...params} error={errors.State as boolean | undefined} />}
                onChange={(_, value) => {
                  if (!value) {
                    return;
                  }

                  if (typeof value === 'string') {
                    setValue('State', value);
                  } else {
                    setValue('State', value?.name);
                    setStateId(value?.id ? value?.id : null);
                  }
                }}
                inputValue={stateValue}
                // defaultValue={getValues('State')}
                onInputChange={(event, newInputValue) => {
                  setValue('State', newInputValue); // Update the form value with the manually typed input
                  setstateValue(newInputValue)
                }}
                freeSolo />
            </Stack>
            <Stack className="Column">
              <RenderFields
                type="number"
                register={register}
                error={errors.Code}
                name="Code"
                placeholder="Enter zip / postal code *"
                control={control}
                variant='outlined'
                margin='none'
              />
              <RenderFields
                register={register}
                type="select"
                control={control}
                error={errors.Country}
                name="Country"
                variant='outlined'
                margin='none'
                defaultValue={"-1"}
                value={countryValue}
                setValue={setValue}
                onChange={OnChange}
              >
                <MenuItem value="-1">Select country *</MenuItem>
                {configDropdowns?.countryList.map((country) => (
                  <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
                ))}
              </RenderFields>
            </Stack>
          </Stack>
          {alignment === "Joint" && <Stack className="Fields JointFields">
            <Stack className="Header">
              <Typography>Additional Beneficiary / Account Holder</Typography>
              <Button variant="contained" color="success" onClick={() => setAdditionalFieldsCount(prev => prev + 1)}>Add more</Button>
            </Stack>
            {Array(additionalFieldsCount).map(() => {
              return (<Stack
                className="FieldsWrapper"
                divider={<Divider flexItem />}
              >
                <Stack className="Column">
                  <RenderFields
                    register={register}
                    error={errors.FirstName}
                    name="FirstName"
                    placeholder="Enter first name *"
                    control={control}
                    variant='outlined'
                    margin='none'
                  />
                  <RenderFields
                    register={register}
                    error={errors.LastName}
                    name="LastName"
                    placeholder="Enter last name *"
                    control={control}
                    variant='outlined'
                    margin='none'
                  />
                  <IconButton><Delete1Icon /></IconButton>
                </Stack>
              </Stack>)
            })}
          </Stack>}
        </Stack>
        <Stack className="ActionWrapper">
          <Button variant="outlined" onClick={hadleSecondaryAction}>
            Back
          </Button>
          <Button variant="contained" type="submit" disabled={loading}>
            Save
          </Button>
        </Stack>
      </form>
    </StyledDialog >
  )
}

export default AddAccount