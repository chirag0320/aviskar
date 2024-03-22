
import React, { useState } from "react"
import { Autocomplete, MenuItem, SelectChangeEvent, Button, Stack, TextField } from "@mui/material"
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Hooks
import { useAppDispatch, useToggle } from "@/hooks"

// Componenets
import StyledDialog from "@/components/common/StyledDialog"
import RenderFields from "@/components/common/RenderFields"
import GoogleMaps from "@/components/common/GoogleMaps"
import { addOrEditAddress } from "@/redux/reducers/checkoutReducer";
import { ENDPOINTS } from "@/utils/constants";

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

const schema = yup.object().shape({
  // SelectMetal: yup.string().required(),
  FirstName: yup.string().required(),
  LastName: yup.string().required(),
  Company: yup.string().required(),
  Contact: yup.string().required(),
  Email: yup.string().email().required(),
  Address1: yup.string().required(),
  Address2: yup.string(),
  City: yup.string().required(),
  State: yup.string().required(),
  Country: yup.string().required(),
  Code: yup.string().required()
})

function UpdateAddress(props: UpdateAddress) {
  const { open, dialogTitle, onClose, existingAddress } = props
  console.log("🚀 ~ UpdateAddress ~ existingAddress:", existingAddress)
  const dispatch = useAppDispatch();

  const {
    register,
    reset,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      Country: "none",
    },
  })

  const onAddressFormSubmitHandler = (data: any) => {
    console.log("🚀 ~ onAddressFormSubmitHandler ~ data:", data)
    // console.log(data);
    // dispatch(addOrEditAddress(ENDPOINTS.addOrEditAddress,))

    const addressQuery = {
      firstName: data.FirstName,
      lastName: data.LastName,
      company: data.Company,
      phoneNumber: data.Contact,
      email: data.Email,
      // static
      isVerified: true,
      addressLine1: data.Address1,
      addressLine2: data.Address2,
      city: data.City,
      // static
      stateId: 1,
      stateName: "koi bhi",
      postcode: data.Code,
      // static
      countryId: 1,
    }

    if (existingAddress) {
      dispatch(addOrEditAddress({
        url: ENDPOINTS.addOrEditAddress,
        body: {
          ...addressQuery,
          addressId: existingAddress.addressId
        }
      }))
    }
    else {
      dispatch(addOrEditAddress({
        url: ENDPOINTS.addOrEditAddress,
        body: {
          ...addressQuery
        }
      }))
    }
    onClose()
    reset()
  }

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
              value={existingAddress?.firstName}
              variant='outlined'
              margin='none'
            />
            <RenderFields
              register={register}
              error={errors.LastName}
              value={existingAddress?.lastName}
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
            value={existingAddress?.company}
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
              value={existingAddress?.phone1}
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
              value={existingAddress?.email}
              placeholder="Enter email id"
              control={control}
              variant='outlined'
              margin='none'
            />
          </Stack>
          <GoogleMaps />
          <RenderFields
            register={register}
            error={errors.Address1}
            name="Address1"
            value={existingAddress?.addressLine1}
            placeholder="Enter address line 1"
            control={control}
            variant='outlined'
            margin='none'
          />
          <RenderFields
            register={register}
            error={errors.Address2}
            name="Address2"
            value={existingAddress?.addressLine2}
            placeholder="Enter address line 2"
            control={control}
            variant='outlined'
            margin='none'
          />
          <Stack className="Column">
            <RenderFields
              register={register}
              error={errors.City}
              value={existingAddress?.city}
              name="City"
              placeholder="Enter city"
              control={control}
              variant='outlined'
              margin='none'
            />
            <RenderFields
              type="select"
              register={register}
              error={errors.Country}
              name="Country"
              defaultValue={existingAddress?.countryName}  // Set defaultValue based on existingAddress?.countryName
              placeholder="Enter country"
              control={control}
              variant='outlined'
              margin='none'
            >
              <MenuItem value="none" selected={!existingAddress}>Select country</MenuItem>
              <MenuItem value="India" selected={existingAddress?.countryName == 'India'}>India</MenuItem>
              <MenuItem value="Australia" selected={existingAddress?.countryName == 'Australia'}>Australia</MenuItem>
              <MenuItem value="USA" selected={existingAddress?.countryName == 'USA'}>USA</MenuItem>
            </RenderFields>

          </Stack>
          <Stack className="Column">
            <Autocomplete
              disablePortal
              options={top100Films}
              renderInput={(params) => <TextField placeholder="Enter state" {...params} />}
              fullWidth
              value={existingAddress?.stateName}
              onChange={(_, value: any) => {
                // setStateName(value?.label);
                setValue('State', value?.label);
              }}
              freeSolo
            />
            <RenderFields
              type="number"
              register={register}
              error={errors.Code}
              name="Code"
              value={existingAddress?.postcode}
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
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
    </StyledDialog >
  )
}

export default UpdateAddress

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { label: 'The Good, the Bad and the Ugly', year: 1966 },
  { label: 'Fight Club', year: 1999 },
  {
    label: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    label: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { label: 'Forrest Gump', year: 1994 },
  { label: 'Inception', year: 2010 },
  {
    label: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: 'Goodfellas', year: 1990 },
  { label: 'The Matrix', year: 1999 },
  { label: 'Seven Samurai', year: 1954 },
  {
    label: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { label: 'City of God', year: 2002 },
  { label: 'Se7en', year: 1995 },
  { label: 'The Silence of the Lambs', year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: 'Life Is Beautiful', year: 1997 },
  { label: 'The Usual Suspects', year: 1995 },
  { label: 'Léon: The Professional', year: 1994 },
  { label: 'Spirited Away', year: 2001 },
  { label: 'Saving Private Ryan', year: 1998 },
  { label: 'Once Upon a Time in the West', year: 1968 },
  { label: 'American History X', year: 1998 },
  { label: 'Interstellar', year: 2014 },
  { label: 'Casablanca', year: 1942 },
  { label: 'City Lights', year: 1931 },
  { label: 'Psycho', year: 1960 },
  { label: 'The Green Mile', year: 1999 },
  { label: 'The Intouchables', year: 2011 },
  { label: 'Modern Times', year: 1936 },
  { label: 'Raiders of the Lost Ark', year: 1981 },
  { label: 'Rear Window', year: 1954 },
  { label: 'The Pianist', year: 2002 },
  { label: 'The Departed', year: 2006 },
  { label: 'Terminator 2: Judgment Day', year: 1991 },
  { label: 'Back to the Future', year: 1985 },
  { label: 'Whiplash', year: 2014 },
  { label: 'Gladiator', year: 2000 },
  { label: 'Memento', year: 2000 },
  { label: 'The Prestige', year: 2006 },
  { label: 'The Lion King', year: 1994 },
  { label: 'Apocalypse Now', year: 1979 },
  { label: 'Alien', year: 1979 },
  { label: 'Sunset Boulevard', year: 1950 },
  {
    label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { label: 'The Great Dictator', year: 1940 },
  { label: 'Cinema Paradiso', year: 1988 },
  { label: 'The Lives of Others', year: 2006 },
  { label: 'Grave of the Fireflies', year: 1988 },
  { label: 'Paths of Glory', year: 1957 },
  { label: 'Django Unchained', year: 2012 },
  { label: 'The Shining', year: 1980 },
  { label: 'WALL·E', year: 2008 },
  { label: 'American Beauty', year: 1999 },
  { label: 'The Dark Knight Rises', year: 2012 },
  { label: 'Princess Mononoke', year: 1997 },
  { label: 'Aliens', year: 1986 },
  { label: 'Oldboy', year: 2003 },
  { label: 'Once Upon a Time in America', year: 1984 },
  { label: 'Witness for the Prosecution', year: 1957 },
  { label: 'Das Boot', year: 1981 },
  { label: 'Citizen Kane', year: 1941 },
  { label: 'North by Northwest', year: 1959 },
  { label: 'Vertigo', year: 1958 },
  {
    label: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { label: 'Reservoir Dogs', year: 1992 },
  { label: 'Braveheart', year: 1995 },
  { label: 'M', year: 1931 },
  { label: 'Requiem for a Dream', year: 2000 },
  { label: 'Amélie', year: 2001 },
  { label: 'A Clockwork Orange', year: 1971 },
  { label: 'Like Stars on Earth', year: 2007 },
  { label: 'Taxi Driver', year: 1976 },
  { label: 'Lawrence of Arabia', year: 1962 },
  { label: 'Double Indemnity', year: 1944 },
  {
    label: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { label: 'Amadeus', year: 1984 },
  { label: 'To Kill a Mockingbird', year: 1962 },
  { label: 'Toy Story 3', year: 2010 },
  { label: 'Logan', year: 2017 },
  { label: 'Full Metal Jacket', year: 1987 },
  { label: 'Dangal', year: 2016 },
  { label: 'The Sting', year: 1973 },
  { label: '2001: A Space Odyssey', year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: 'Toy Story', year: 1995 },
  { label: 'Bicycle Thieves', year: 1948 },
  { label: 'The Kid', year: 1921 },
  { label: 'Inglourious Basterds', year: 2009 },
  { label: 'Snatch', year: 2000 },
  { label: '3 Idiots', year: 2009 },
  { label: 'Monty Python and the Holy Grail', year: 1975 },
]