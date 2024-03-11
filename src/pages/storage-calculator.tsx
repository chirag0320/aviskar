import React from 'react'
import Seo from "../components/common/Seo"
import { Box, Container, Typography, Stack, MenuItem, Button, } from "@mui/material"
import Layout from "@/components/common/Layout";
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Utils
import { PageTitle } from "@/components/common/Utils"
import ShippingCard from "@/components/partials/shipping-insurance-calculator/ShippingCard";

// Components
import RenderFields from '../components/common/RenderFields'

interface ShippingInputs {
    SelectMetal: string
    Weight: string
    MetalType: string
    WeightType: string
}

const schema = yup.object().shape({
    SelectMetal: yup.string(),
    Weight: yup.string(),
    MetalType: yup.string(),
    WeightType: yup.string(),
})

function StorageCalculator() {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<ShippingInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            SelectMetal: 'none', // Set the default value
            Weight: 'none', // Set the default value
            MetalType: 'Bar', // Set the default value
            WeightType: 'Grams', // Set the default value
        },
    })

    const onSubmit = (data: any) => {
        console.log(data)
    }


    return (
        <Layout>

            <>
                <Seo
                    keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
                    title="Home"
                    lang="en"
                />
                <Box id="StorageCalculator" className='ShippingInsuranceCalculator' component="section">
                    <Box className="TitleWrapper">
                        <PageTitle title="Storage" />
                    </Box>
                    <Container>
                        <Box className='ShippingInsuranceCalculatorPageContent'>
                            <Box className="SelectionWrapper">
                                <Stack className='MetalWrapper'>
                                    <RenderFields
                                        type="select"
                                        register={register}
                                        error={errors.SelectMetal}
                                        name="SelectMetal"
                                        label="Select Metal"
                                        control={control}
                                        variant='outlined'
                                        margin='none'
                                        className='SelectMetal'
                                    >
                                        <MenuItem value="none">Metal</MenuItem>
                                        <MenuItem value="gold">Gold</MenuItem>
                                        <MenuItem value="silver">Silver</MenuItem>
                                        <MenuItem value="platinum">Platinum</MenuItem>
                                        <MenuItem value="palladium">Palladium</MenuItem>
                                        <MenuItem value="copper">Copper</MenuItem>
                                    </RenderFields>
                                    <RenderFields
                                        type="radio"
                                        register={register}
                                        error={errors.MetalType}
                                        name="MetalType"
                                        label="Metal Type"
                                        control={control}
                                        margin='none'
                                        className='MetalType'
                                        options={[
                                            { id: '1', name: 'Bar', value: 'Bar', label: 'Bar' },
                                            { id: '2 ', name: 'Coin', value: 'Coin', label: 'Coin' },
                                        ]}
                                        row
                                    />
                                </Stack>
                                <Stack className='WeightWrapper'>
                                    <RenderFields
                                        type="select"
                                        register={register}
                                        error={errors.Weight}
                                        name="Weight"
                                        label="Weight"
                                        control={control}
                                        variant='outlined'
                                        margin='none'
                                        className='Weight'
                                    >
                                        <MenuItem value="none">Weight</MenuItem>
                                        <MenuItem value="100">100</MenuItem>
                                        <MenuItem value="10">10</MenuItem>
                                        <MenuItem value="1">1</MenuItem>
                                        <MenuItem value="1010">1010</MenuItem>
                                    </RenderFields>
                                    <RenderFields
                                        type="radio"
                                        register={register}
                                        error={errors.MetalType}
                                        name="WeightType"
                                        label="Weight Type"
                                        control={control}
                                        margin='none'
                                        className='WeightType'
                                        options={[
                                            { id: '1', name: 'Ounces', value: 'Ounces', label: 'Ounces' },
                                            { id: '2 ', name: 'Grams', value: 'Grams', label: 'Grams' },
                                            { id: '3 ', name: 'Kilograms', value: 'Kilograms', label: 'Kilograms' },
                                        ]}
                                        row
                                    />
                                </Stack>
                                {/* <Box className="FormAction"> */}
                                <Button className='AddMetaltBtn' size='large' variant="contained">Add Metal</Button>
                                {/* </Box> */}
                            </Box>
                            <Box className="ShippingCardsWrapper">
                                <ShippingCard cardtitle="Gold bars" />
                                <ShippingCard cardtitle="Silver coins" />
                                <ShippingCard cardtitle="Platinum bars" />
                                <ShippingCard cardtitle="Palladium bars" />
                                <ShippingCard cardtitle="Copper bars" />
                                <ShippingCard cardtitle="Gold coins" />
                                <ShippingCard cardtitle="Silver bars" />
                                <ShippingCard cardtitle="Platinum coins" />
                            </Box>
                            <Box className="TotalWrapper StorageTotalValueWrapper">
                                <Stack className='DataValueWrapper TotalValueWrapper'>
                                    <Typography variant="body1" className="">Total Vault Storage and Insurance
                                        until 30th June 2024</Typography>
                                    <Typography variant="subtitle1" className="">$ 847.041</Typography>
                                </Stack>
                            </Box>
                        </Box>
                    </Container>

                </Box>
            </>
        </Layout>
    )
}

export default StorageCalculator