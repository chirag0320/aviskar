import React from "react"
import { Box, Button, Container, Divider, IconButton, MenuItem, Stack } from "@mui/material"
import { PageTitle } from "@/components/common/Utils"
import Seo from "@/components/common/Seo"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { ENDPOINTS } from "@/utils/constants"
import { getTopicDetails } from "@/redux/reducers/topicReducer"
import { useAppSelector } from "@/hooks"
import Layout from "@/components/common/Layout"
import Loader from "@/components/common/Loader"
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import RenderFields from "@/components/common/RenderFields"
import { Delete1Icon } from "@/assets/icons"
import BasicDatePicker from "@/components/partials/my-vault/BasicDatePicker"

interface privateHoldingAddInputs {
    account: string
    productName: string
    mintOrBrand: string
    metal: string
    type: string
    series: string
    purity: string
    weight: string
    weightType: string
    specification: string
    value: string
    customSpecification: string
    customValue: string
    purchasePrice: string
    purchaseFrom: string
    qty: string
}

const schema = yup.object().shape({
    account: yup.string().trim().required("account is required field"),
    productName: yup.string().trim().required("productName is required field"),
    mintOrBrand: yup.string().trim(),
    metal: yup.string().trim().required("metal is required field"),
    type: yup.string().trim().required("type is required field"),
    series: yup.string().trim(),
    purity: yup.string().trim().required("purity is required field"),
    weight: yup.string().trim().required("weight is required field"),
    weightType: yup.string().trim().required("weightType is required field"),
    specification: yup.string().trim(),
    varalue: yup.string().trim(),
    customSpecification: yup.string().trim(),
    customValue: yup.string().trim(),
    purchasePrice: yup.string().trim().required("purchasePrice is required field"),
    purchaseFrom: yup.string().trim().required("purchasePrice is required field"),
    qty: yup.string().trim().required("Quentity is required field"),
});


function privateHoldingAdd(paramsData: any) {
    const { topicDetails, loading } = useAppSelector(state => state.topic)
    useAPIoneTime({ service: getTopicDetails, endPoint: ENDPOINTS.topicDetail?.replace('{{topic-name}}', paramsData?.params?.['topic-name']) })

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<privateHoldingAddInputs>({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data: any) => {
        console.log(data);
    }


    return (
        <>
            <Loader open={loading} />
            {
                !loading && <Layout>
                    <Seo
                        keywords={[`QMint Topics`]}
                        title="Add New Private Holding"
                        lang="en"
                    />
                    <PageTitle title="Add New Private Holding" backToDashboard={true} />
                    <Box id="PrivateHoldingAddPage" className='PrivateHoldingAddPage' component="section">
                        <Container>
                            <Box className="Content PrivateHoldingAddContent">
                                <form onSubmit={handleSubmit(onSubmit)} id="AddPrivateHolding">
                                    <Stack>
                                        <RenderFields
                                            type="select"
                                            register={register}
                                            error={errors.account}
                                            name="account"
                                            label="Account:"
                                            control={control}
                                            variant='outlined'
                                            margin='none'
                                            className='SelectAccount'
                                            required
                                        >
                                            <MenuItem key='test' value='test'>test</MenuItem>
                                            <MenuItem key='test' value='test1'>test1</MenuItem>
                                            <MenuItem key='test' value='test2'>test2</MenuItem>
                                        </RenderFields>
                                        <RenderFields
                                            register={register}
                                            error={errors.productName}
                                            name="productName"
                                            label="Product Name:"
                                            // placeholder="Enter your product name."
                                            variant='outlined'
                                            margin='none'
                                            required
                                        />
                                        <RenderFields
                                            type="select"
                                            register={register}
                                            error={errors.mintOrBrand}
                                            name="mintOrBrand"
                                            label="Mint/Brand"
                                            control={control}
                                            variant='outlined'
                                            margin='none'
                                            className='SelectMint'
                                            required
                                        >
                                            <MenuItem key='test' value='perth mint'>perth mint</MenuItem>
                                            <MenuItem key='test' value='royal mint'>royal mint</MenuItem>
                                            <MenuItem key='test' value='sunshine mint'>sunshine mint</MenuItem>
                                        </RenderFields>
                                    </Stack>
                                    <Stack>
                                        <RenderFields
                                            type="select"
                                            register={register}
                                            error={errors.metal}
                                            name="metal"
                                            label="Metal"
                                            control={control}
                                            variant='outlined'
                                            margin='none'
                                            className='SelectMetal'
                                            required
                                        >
                                            <MenuItem key='test' value='perth mint'>perth mint</MenuItem>
                                            <MenuItem key='test' value='royal mint'>royal mint</MenuItem>
                                            <MenuItem key='test' value='sunshine mint'>sunshine mint</MenuItem>
                                        </RenderFields>
                                        <RenderFields
                                            type="select"
                                            register={register}
                                            error={errors.type}
                                            name="type"
                                            label="Type"
                                            control={control}
                                            variant='outlined'
                                            margin='none'
                                            className='SelectType'
                                            required
                                        >
                                            <MenuItem key='test' value='perth mint'>perth mint</MenuItem>
                                            <MenuItem key='test' value='royal mint'>royal mint</MenuItem>
                                            <MenuItem key='test' value='sunshine mint'>sunshine mint</MenuItem>
                                        </RenderFields>
                                    </Stack>
                                    <Stack>
                                        <RenderFields
                                            type="select"
                                            register={register}
                                            error={errors.series}
                                            name="series"
                                            label="Series"
                                            control={control}
                                            variant='outlined'
                                            margin='none'
                                            className='SelectSeries'
                                        // required
                                        >
                                            <MenuItem key='test' value='perth mint'>perth mint</MenuItem>
                                            <MenuItem key='test' value='royal mint'>royal mint</MenuItem>
                                            <MenuItem key='test' value='sunshine mint'>sunshine mint</MenuItem>
                                        </RenderFields>
                                        <RenderFields
                                            type="select"
                                            register={register}
                                            error={errors.purity}
                                            name="purity"
                                            label="Purity"
                                            control={control}
                                            variant='outlined'
                                            margin='none'
                                            className='SelectPurity'
                                            required
                                        >
                                            <MenuItem key='test' value='perth mint'>perth mint</MenuItem>
                                            <MenuItem key='test' value='royal mint'>royal mint</MenuItem>
                                            <MenuItem key='test' value='sunshine mint'>sunshine mint</MenuItem>
                                        </RenderFields>
                                    </Stack>
                                    <Stack>
                                        <RenderFields
                                            type="select"
                                            register={register}
                                            error={errors.weight}
                                            name="weight"
                                            label="Weight"
                                            control={control}
                                            variant='outlined'
                                            margin='none'
                                            className='SelectWeight'
                                            required
                                        >
                                            <MenuItem key='test' value='perth mint'>perth mint</MenuItem>
                                            <MenuItem key='test' value='royal mint'>royal mint</MenuItem>
                                            <MenuItem key='test' value='sunshine mint'>sunshine mint</MenuItem>
                                        </RenderFields>
                                        <RenderFields
                                            type="select"
                                            register={register}
                                            error={errors.weightType}
                                            name="weightType"
                                            label="Weight Type"
                                            control={control}
                                            variant='outlined'
                                            margin='none'
                                            className='SelectWeightType'
                                            required
                                        >
                                            <MenuItem key='test' value='perth mint'>perth mint</MenuItem>
                                            <MenuItem key='test' value='royal mint'>royal mint</MenuItem>
                                            <MenuItem key='test' value='sunshine mint'>sunshine mint</MenuItem>
                                        </RenderFields>
                                    </Stack>
                                    <Stack sx={{ alignItems: "center", }}>
                                        <RenderFields
                                            type="select"
                                            register={register}
                                            error={errors.specification}
                                            name="specification"
                                            label="Specification"
                                            control={control}
                                            variant='outlined'
                                            margin='none'
                                            className='SelectSpecification'
                                        // required
                                        >
                                            <MenuItem key='test' value='perth mint'>perth mint</MenuItem>
                                            <MenuItem key='test' value='royal mint'>royal mint</MenuItem>
                                            <MenuItem key='test' value='sunshine mint'>sunshine mint</MenuItem>
                                        </RenderFields>
                                        <RenderFields
                                            type="select"
                                            register={register}
                                            error={errors.value}
                                            name="value"
                                            label="value"
                                            control={control}
                                            variant='outlined'
                                            margin='none'
                                            className='SelectValue'
                                        // required
                                        >
                                            <MenuItem key='test' value='perth mint'>perth mint</MenuItem>
                                            <MenuItem key='test' value='royal mint'>royal mint</MenuItem>
                                            <MenuItem key='test' value='sunshine mint'>sunshine mint</MenuItem>
                                        </RenderFields>
                                        <IconButton className="DeleteButton"><Delete1Icon /></IconButton>
                                    </Stack>
                                    <Stack sx={{ alignItems: "center", }}>
                                        <RenderFields
                                            register={register}
                                            error={errors.customSpecification}
                                            name="customSpecification"
                                            label="Custom Specification"
                                            // placeholder="Enter custom specification."
                                            variant='outlined'
                                            margin='none'
                                        // required
                                        />
                                        <RenderFields
                                            register={register}
                                            error={errors.customValue}
                                            name="customValue"
                                            label="Custom Value"
                                            // placeholder="Enter custom value."
                                            variant='outlined'
                                            margin='none'
                                        // required
                                        />
                                        <IconButton className="DeleteButton"><Delete1Icon /></IconButton>
                                    </Stack>
                                    <Stack className='ButtonsWrapper'>
                                        <Button variant="contained" size="large">Add Specification</Button>
                                        <Button variant="contained" size="large">Add Custom Specification</Button>
                                    </Stack>
                                    <Stack>
                                        <BasicDatePicker />
                                        <RenderFields
                                            register={register}
                                            error={errors.purchasePrice}
                                            name="purchasePrice"
                                            label="Purchase price (per unit):"
                                            variant='outlined'
                                            margin='none'
                                            required
                                        />
                                        <RenderFields
                                            register={register}
                                            error={errors.purchaseFrom}
                                            name="purchaseFrom"
                                            label="Purchase From: "
                                            variant='outlined'
                                            margin='none'
                                            required
                                        />
                                        <RenderFields
                                            type="number"
                                            register={register}
                                            error={errors.qty}
                                            name="qty"
                                            label="Qty:"
                                            variant='outlined'
                                            margin='none'
                                            required
                                        />
                                    </Stack>
                                </form>
                            </Box>
                        </Container>
                    </Box >
                </Layout >
            }
        </>
    )
}

export default privateHoldingAdd
