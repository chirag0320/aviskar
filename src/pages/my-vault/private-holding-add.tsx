import React, { useEffect, useLayoutEffect, useMemo, useReducer } from "react";
import {
    Box, Button, Container, IconButton, MenuItem, Stack, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material"
import { PageTitle } from "@/components/common/Utils"
import Seo from "@/components/common/Seo"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { ENDPOINTS } from "@/utils/constants"
import { getTopicDetails } from "@/redux/reducers/topicReducer"
import { useAppDispatch, useAppSelector } from "@/hooks"
import Layout from "@/components/common/Layout"
import Loader from "@/components/common/Loader"
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import RenderFields from "@/components/common/RenderFields"
import { Delete1Icon } from "@/assets/icons"
import BasicDatePicker from "@/components/partials/my-vault/BasicDatePicker"
import { IPrivateHoldingAddInputs } from "@/types/myVault";
import { getPrivateHoldingFormDropdowns, getPrivateHoldingWithId } from "@/redux/reducers/myVaultReducer";
import DynamicFields from "@/components/partials/my-vault/private-holding-form/DynamicFields";
import ProvenanceDocuments from "@/components/partials/my-vault/private-holding-form/ProvenanceDocuments";
import ProductPhotos from "@/components/partials/my-vault/private-holding-form/ProductPhotos";
import useRequireLogin from "@/hooks/useRequireLogin";
// import { RenderDropdownItems } from "@/components/partials/my-vault/private-holding-form/RenderDropdownItems";
// import RenderDropdownItems from "@/components/partials/my-vault/private-holding-form/RenderDropdownItems";

const schema = yup.object().shape({
    Account: yup.string().notOneOf(["none"], "Account is required field"),
    ProductName: yup.string().trim().required("Product Name is required field"),
    MintOrBrand: yup.string().notOneOf(["none"], "Mint or Brand is required field"),
    Metal: yup.string().notOneOf(["none"], "Metal is required field"),
    Type: yup.string().notOneOf(["none"], "Type is required field"),
    Series: yup.string().notOneOf(["none"], "Series is required field"),
    Purity: yup.string().notOneOf(["none"], "Purity is required field"),
    Weight: yup.string().trim().required("Weight is required field"),
    WeightType: yup.string().notOneOf(["none"], "Weight Type is required field"),
    Date: yup.string().required("Date is required field"),
    // Specification: yup.string().trim(),
    // Value: yup.string().trim(),
    // CustomSpecification: yup.string().trim(),
    // CustomValue: yup.string().trim(),
    PurchasePrice: yup.string().trim().required("Purchase Price is required field"),
    PurchaseFrom: yup.string().trim().required("Purchase From is required field"),
    Qty: yup.string().required("Quantity is required field"),
    ProvenanceDocuments: yup.string().trim(),
    ProductPhotos: yup.string().trim().required("Product Photos is required field"),
    DocumentType: yup.string().notOneOf(["none"], "Document Type is required field"),
});

function createDataPhotos(
    fileName: string,
) {
    return { fileName };
}

const photosRows = [
    createDataPhotos(
        "test.png",
    ),
    createDataPhotos(
        "abc.gif",
    ),
];

function dropdownStateReducer(state: any, action: any) {
    switch (action.type) {
        case "APPLY_VALUES":
            return {
                Account: action.nextAccount,
                Mint: action.nextMint,
                Metal: action.nextMetal,
                Type: action.nextType,
                Series: action.nextSeries,
                Purity: action.nextPurity,
                WeightType: action.nextWeightType
            }
        default:
            return state;
    }
}

function privateHoldingAdd({ location }: { location: any }) {
    const { loadingForCheckingLogin } = useRequireLogin()
    const loading = useAppSelector(state => state.myVault.loading);
    const currentPrivateHolding = useAppSelector(state => state.myVault.currentPrivateHolding)
    const formDropdowns = useAppSelector(state => state.myVault.privateHoldingFormDropdowns);
    const formDropdownsKeys = useAppSelector(state => state.myVault.privateHoldingFormDropdownsKeys);
    const formDropdownsReverseKeys = useAppSelector(state => state.myVault.privateHoldingFormDropdownsReverseKeys);
    const dispatch = useAppDispatch()
    const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const [dropdownState, dropdownDispatch] = useReducer(dropdownStateReducer, {
        Mint: "none",
        Metal: "none",
        Type: "none",
        Series: "none",
        Purity: "none",
        WeightType: "none",
        Account: "none"
    });

    const {
        register,
        handleSubmit,
        control,
        clearErrors,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<IPrivateHoldingAddInputs>({
        resolver: yupResolver(schema)
    })

    useLayoutEffect(() => {
        const fetchFormDropdowns = async () => {
            await dispatch(getPrivateHoldingFormDropdowns({ url: ENDPOINTS.getPrivateHoldingAddFormDropdowns }))
        }
        fetchFormDropdowns();
    }, [])

    // get the inputs data if user wants to edit
    useEffect(() => {
        if (!searchParams.has("holdingId")) return;
        const holdingId = searchParams.get("holdingId");

        const fetchHolding = async () => {
            await dispatch(getPrivateHoldingWithId({ url: ENDPOINTS.getPrivateHoldingWithId + holdingId }))
        }
        fetchHolding()
    }, [])

    // set intial form values if user wants to edit
    useEffect(() => {
        if (!currentPrivateHolding) return;
        // console.log("🚀 ~ useEffect ~ currentPrivateHolding:", currentPrivateHolding)

        setValue("ProductName", currentPrivateHolding.productName)
        setValue("PurchaseFrom", currentPrivateHolding.purchasedFrom);
        setValue("Weight", currentPrivateHolding.weight);
        setValue("Qty", currentPrivateHolding.qty.toString());
        setValue("PurchasePrice", currentPrivateHolding.price.toString())

        if (!formDropdownsKeys) return;
        // console.log("🚀 ~ useEffect ~ formDropdownsKeys:", formDropdownsKeys, formDropdownsKeys["15"])
        // console.log("🚀 ~ useEffect ~ formDropdownsKeys:", formDropdownsKeys, "=>", currentPrivateHolding, "=>", currentPrivateHolding.productattribute.find((option) => formDropdownsKeys[option["specificationAttributeOptionId"].toString()] === "Mint"))

        dropdownDispatch({
            type: "APPLY_VALUES",
            nextAccount: "test",
            // NOTE : static
            nextMint: currentPrivateHolding.productattribute.find((option: any) => formDropdownsKeys[option["specificationAttributeOptionId"].toString()] === "Mint")!["specificationAttributeId"] ?? "0",
            nextMetal: currentPrivateHolding.productattribute.find((option: any) => formDropdownsKeys[option["specificationAttributeOptionId"].toString()] === "Metal")!["specificationAttributeId"] ?? "0",
            nextType: currentPrivateHolding.productattribute.find((option: any) => formDropdownsKeys[option["specificationAttributeOptionId"].toString()] === "Type")!["specificationAttributeId"] ?? "0",
            nextSeries: currentPrivateHolding.productattribute.find((option: any) => formDropdownsKeys[option["specificationAttributeOptionId"].toString()] === "Series")!["specificationAttributeId"] ?? "0",
            nextPurity: currentPrivateHolding.productattribute.find((option: any) => formDropdownsKeys[option["specificationAttributeOptionId"].toString()] === "Purity")!["specificationAttributeId"] ?? "0",
            nextWeightType: "0"
        })
    }, [currentPrivateHolding, formDropdownsKeys])


    const onSubmit = (data: any) => {
        console.log("🚀 ~ onSubmit ~ data:", data)
        // console.log(data);
    }

    const renderDropdownItems = (dropdowns: any) => dropdowns?.map((option: any) => <MenuItem key={option.specificationAttributeOptionsId} value={option.specificationAttributeOptionsId}>{option.specificationOption}</MenuItem>);
    if (loadingForCheckingLogin) {
        return
    }
    return (
        <>
            <Loader open={loading} />
            <Layout>
                <Seo
                    keywords={[`QMint Topics`]}
                    title="Add New Private Holding"
                    lang="en"
                />
                <PageTitle title={searchParams.has("holdingId") ? "Update Private Holding" : "Add New Private Holding"} backToDashboard={true} />
                <Box id="PrivateHoldingAddPage" className='PrivateHoldingAddPage' component="section">
                    <Container>
                        <Box className="Content PrivateHoldingAddContent">
                            <form onSubmit={handleSubmit(onSubmit)} id="AddPrivateHolding">
                                <Stack className="RowWrapper">
                                    <RenderFields
                                        type="select"
                                        register={register}
                                        error={errors.Account}
                                        name="Account"
                                        label="Account:"
                                        control={control}
                                        value={dropdownState.Account}
                                        getValues={getValues}
                                        setValue={setValue}
                                        variant='outlined'
                                        clearErrors={clearErrors}
                                        margin='none'
                                        className='SelectAccount'
                                        required
                                    >
                                        <MenuItem value="none">Select Account</MenuItem>
                                        <MenuItem key='test' value='test'>test</MenuItem>
                                        <MenuItem key='test' value='test1'>test1</MenuItem>
                                        <MenuItem key='test' value='test2'>test2</MenuItem>
                                    </RenderFields>
                                    <RenderFields
                                        register={register}
                                        error={errors.ProductName}
                                        name="ProductName"
                                        label="Product Name:"
                                        placeholder="Enter your product name."
                                        variant='outlined'
                                        margin='none'
                                        required
                                    />
                                    <RenderFields
                                        type="select"
                                        register={register}
                                        error={errors.MintOrBrand}
                                        name="MintOrBrand"
                                        label="Mint/Brand"
                                        value={dropdownState.Mint}
                                        control={control}
                                        variant='outlined'
                                        setValue={setValue}
                                        getValues={getValues}
                                        clearErrors={clearErrors}
                                        margin='none'
                                        className='SelectMint'
                                        required
                                    >
                                        <MenuItem value="none">Select Mint</MenuItem>
                                        {formDropdowns && renderDropdownItems(formDropdowns["Mint"])}
                                    </RenderFields>
                                </Stack>
                                <Stack className="RowWrapper">
                                    <RenderFields
                                        type="select"
                                        register={register}
                                        error={errors.Metal}
                                        name="Metal"
                                        getValues={getValues}
                                        label="Metal"
                                        value={dropdownState.Metal}
                                        control={control}
                                        setValue={setValue}
                                        clearErrors={clearErrors}
                                        variant='outlined'
                                        margin='none'
                                        className='SelectMetal'
                                        required
                                    >
                                        <MenuItem value="none">Select Metal</MenuItem>
                                        {/* {formDropdowns && <RenderDropdownItems dropdowns={formDropdowns["Metal"]} />} */}
                                        {formDropdowns && renderDropdownItems(formDropdowns["Metal"])}
                                    </RenderFields>
                                    <RenderFields
                                        type="select"
                                        register={register}
                                        error={errors.Type}
                                        name="Type"
                                        setValue={setValue}
                                        getValues={getValues}
                                        label="Type"
                                        value={dropdownState.Type}
                                        control={control}
                                        variant='outlined'
                                        clearErrors={clearErrors}
                                        margin='none'
                                        className='SelectType'
                                        required
                                    >
                                        <MenuItem value="none">Select Type</MenuItem>
                                        {/* {formDropdowns && <RenderDropdownItems dropdowns={formDropdowns["Type"]} />} */}
                                        {formDropdowns && renderDropdownItems(formDropdowns["Type"])}
                                    </RenderFields>
                                </Stack>
                                <Stack className="RowWrapper">
                                    <RenderFields
                                        type="select"
                                        register={register}
                                        error={errors.Series}
                                        name="Series"
                                        getValues={getValues}
                                        label="Series"
                                        value={dropdownState.Series}
                                        control={control}
                                        setValue={setValue}
                                        clearErrors={clearErrors}
                                        variant='outlined'
                                        margin='none'
                                        className='SelectSeries'
                                    // required
                                    >
                                        <MenuItem value="none">Select Series</MenuItem>
                                        {/* {formDropdowns && <RenderDropdownItems dropdowns={formDropdowns["Series"]} />} */}
                                        {formDropdowns && renderDropdownItems(formDropdowns["Series"])}
                                    </RenderFields>
                                    <RenderFields
                                        type="select"
                                        register={register}
                                        error={errors.Purity}
                                        name="Purity"
                                        label="Purity"
                                        getValues={getValues}
                                        setValue={setValue}
                                        value={dropdownState.Purity}
                                        control={control}
                                        clearErrors={clearErrors}
                                        variant='outlined'
                                        margin='none'
                                        className='SelectPurity'
                                        required
                                    >
                                        <MenuItem value="none">Select Purity</MenuItem>
                                        {/* {formDropdowns && <RenderDropdownItems dropdowns={formDropdowns["Purity"]} />} */}
                                        {formDropdowns && renderDropdownItems(formDropdowns["Purity"])}
                                    </RenderFields>
                                </Stack>
                                <Stack className="RowWrapper">
                                    <RenderFields
                                        register={register}
                                        error={errors.Weight}
                                        name="Weight"
                                        label="Weight"
                                        // type="number"
                                        placeholder="Enter Weight"
                                        control={control}
                                        variant='outlined'
                                        margin='none'
                                        className='Weight'
                                        setValue={setValue}
                                    />
                                    <RenderFields
                                        type="select"
                                        register={register}
                                        error={errors.WeightType}
                                        name="WeightType"
                                        clearErrors={clearErrors}
                                        value={dropdownState.WeightType}
                                        label="Weight Type"
                                        getValues={getValues}
                                        control={control}
                                        variant='outlined'
                                        setValue={setValue}
                                        margin='none'
                                        className='SelectWeightType'
                                        required
                                    >
                                        <MenuItem value="none">Select Weight Type</MenuItem>
                                        <MenuItem value='0'>ounces</MenuItem>
                                        <MenuItem value='1'>grams</MenuItem>
                                        <MenuItem value='2'>kilograms</MenuItem>
                                    </RenderFields>
                                </Stack>
                                <DynamicFields existingFields={currentPrivateHolding ? currentPrivateHolding.productattribute : null} />
                                <Stack className="RowWrapper">
                                    <BasicDatePicker setValue={setValue} existingDate={currentPrivateHolding ? currentPrivateHolding?.purchaseDate : null} />
                                    <RenderFields
                                        register={register}
                                        error={errors.PurchasePrice}
                                        name="PurchasePrice"
                                        label="Purchase price (per unit):"
                                        placeholder="Enter Purchase price"
                                        variant='outlined'
                                        margin='none'
                                        required
                                    />
                                    <RenderFields
                                        register={register}
                                        error={errors.PurchaseFrom}
                                        name="PurchaseFrom"
                                        placeholder="Enter Purchase from"
                                        label="Purchase From: "
                                        variant='outlined'
                                        margin='none'
                                        required
                                    />
                                    <RenderFields
                                        type="number"
                                        register={register}
                                        error={errors.Qty}
                                        control={control}
                                        name="Qty"
                                        placeholder="Enter available quantity"
                                        label="Qty:"
                                        variant='outlined'
                                        margin='none'
                                        required
                                    />
                                </Stack>
                                <Stack className="RowWrapper DocumentPhotosContentWrapper">
                                    <ProvenanceDocuments register={register} errors={errors} control={control} getValues={getValues} clearErrors={clearErrors} setValue={setValue} existingDocuments={currentPrivateHolding ? currentPrivateHolding.attachments.filter(doc => doc.type !== "ProductPhotos") : null} />
                                    <ProductPhotos register={register} errors={errors} control={control} getValues={getValues} clearErrors={clearErrors} setValue={setValue} existingDocuments={currentPrivateHolding ? currentPrivateHolding.attachments.filter(doc => doc.type === "ProductPhotos") : null} />
                                </Stack>
                                <Stack sx={{ gap: "20px", justifyContent: "flex-end" }} className='BottomButtonsWrapper'>
                                    <Button variant="outlined" size="large">Clear</Button>
                                    <Button variant="contained" size="large" type="submit">Save</Button>
                                </Stack>
                            </form>
                        </Box>
                    </Container>
                </Box >
            </Layout >
        </>
    )
}

export default privateHoldingAdd
