
import React, { useEffect, useState } from "react"
import { Autocomplete, MenuItem, Button, Stack, TextField } from "@mui/material"
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Hooks
import { useAppDispatch, useAppSelector } from "@/hooks"

// Componenets
import StyledDialog from "@/components/common/StyledDialog"
import RenderFields from "@/components/common/RenderFields"
import GoogleMaps from "@/components/common/GoogleMaps"
import { StateOrCountry, addOrEditAddress } from "@/redux/reducers/checkoutReducer";
import { ENDPOINTS } from "@/utils/constants";
import { hasFulfilled } from "@/utils/common"
import useShowToaster from "@/hooks/useShowToaster"
import { AddressComponents } from "@/utils/parseAddressComponents"

interface AddAddress {
    open: boolean
    dialogTitle: string
    onClose: () => void
    addressTypeId: number
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

export const addressSchema = yup.object().shape({
    FirstName: yup.string().trim().required(),
    LastName: yup.string().trim().required(),
    Company: yup.string().trim(),
    Contact: yup.string().trim().required(),
    Email: yup.string().email().required(),
    Address1: yup.string().trim().required(),
    Address2: yup.string().trim(),
    City: yup.string().required().trim(),
    State: yup.string().required(),
    Country: yup.string().required(),
    Code: yup.string().required().trim()
})

function AddAddress(props: AddAddress) {
    const { open, dialogTitle, onClose, addressTypeId } = props
    const dispatch = useAppDispatch();
    const countryList = useAppSelector(state => state.checkoutPage.countryList);
    const stateList = useAppSelector(state => state.checkoutPage.stateList);
    const [stateId, setStateId] = useState<number | null>(null);
    const { showToaster } = useShowToaster();
    const loading = useAppSelector(state => state.checkoutPage.loading);
    const [googleAddressComponents, setGoogleAddressComponents] = useState<AddressComponents | null>(null);

    const {
        register,
        reset,
        handleSubmit,
        control,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(addressSchema)
    })

    const onAddressFormSubmitHandler = async (data: any) => {
        const addressQuery = {
            addressTypeId,
            firstName: data.FirstName,
            lastName: data.LastName,
            company: data.Company,
            phoneNumber: data.Contact,
            email: data.Email,
            isVerified: true, // static
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
                ...addressQuery
            }
        }))

        if (hasFulfilled(response.type)) {
            onClose()
            reset()
            showToaster({ message: "Address saved successfully", severity: "success" })
        } else {
            showToaster({ message: "Failed to save address. Please check the input fields", severity: "error" })
        }
    }

    useEffect(() => {
        return () => {
            reset()
        }
    }, []);

    useEffect(() => {
        console.log("🚀 ~ useEffect ~ googleAddressComponents:", googleAddressComponents)

        if (googleAddressComponents) {
            setValue('Address1', googleAddressComponents.address)
            countryList.forEach((country: StateOrCountry) => {
                if (country.name === googleAddressComponents.country.trim()) {
                    setValue('Country', country.id.toString())
                }
            })
            setValue('State', googleAddressComponents.state)
            setStateId(() => null);
        }
    }, [googleAddressComponents])

    console.log("Qmint", getValues('State'))
    console.log("Qmint", getValues('Country'))

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
                            placeholder="Enter first name"
                            control={control}
                            // setValue={setValue}
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
                            type="number"
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
                    <GoogleMaps setParsedAddress={setGoogleAddressComponents} />
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
                            type="select"
                            control={control}
                            error={errors.Country}
                            name="Country"
                            variant='outlined'
                            margin='none'
                            defaultValue={getValues('Country')}
                            value={getValues('Country')}
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
                            getOptionLabel={option => {
                                if (typeof option === 'string') {
                                    return option;
                                }
                                return option.name;
                            }}
                            renderInput={(params) => <TextField placeholder="Enter state" {...params} error={errors.State as boolean | undefined} />}
                            fullWidth
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
                            inputValue={getValues('State')}
                            // defaultValue={getValues('State')}
                            onInputChange={(event, newInputValue) => {
                                setValue('State', newInputValue); // Update the form value with the manually typed input
                            }}
                            freeSolo />

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

export default AddAddress