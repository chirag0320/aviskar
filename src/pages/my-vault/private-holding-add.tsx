import * as React from "react";
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
    provenanceDocuments: string
    productPhotos: string
    documentType: string
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
    provenanceDocuments: yup.string().trim(),
    productPhotos: yup.string().trim().required("productPhotos is required field"),
    documentType: yup.string().trim().required("documentType is required field"),
});

function createDataDocuments(
    fileName: string,
    documentType: string,
) {
    return { fileName, documentType };
}
function createDataPhotos(
    fileName: string,
) {
    return { fileName };
}
const documentsRows = [
    createDataDocuments(
        "test.mp4",
        "Invoice",
    ),
    createDataDocuments(
        "new.gif",
        "Certifacate",
    ),
    createDataDocuments(
        "newvideo.gif",
        "Valuation",
    ),
];
const photosRows = [
    createDataPhotos(
        "test.png",
    ),
    createDataPhotos(
        "abc.gif",
    ),

];

function privateHoldingAdd(paramsData: any) {
    const { topicDetails, loading } = useAppSelector(state => state.topic)
    useAPIoneTime({ service: getTopicDetails, endPoint: ENDPOINTS.topicDetail?.replace('{{topic-name}}', paramsData?.params?.['topic-name']) })

    const {
        register,
        handleSubmit,
        control,
        getValues,
        setValue,
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
                                    <Stack className="RowWrapper">
                                        <RenderFields
                                            type="select"
                                            register={register}
                                            error={errors.account}
                                            name="account"
                                            label="Account:"
                                            control={control}
                                            getValues={getValues}
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
                                            getValues={getValues}
                                            margin='none'
                                            className='SelectMint'
                                            required
                                        >
                                            <MenuItem key='test' value='perth mint'>perth mint</MenuItem>
                                            <MenuItem key='test' value='royal mint'>royal mint</MenuItem>
                                            <MenuItem key='test' value='sunshine mint'>sunshine mint</MenuItem>
                                        </RenderFields>
                                    </Stack>
                                    <Stack className="RowWrapper">
                                        <RenderFields
                                            type="select"
                                            register={register}
                                            error={errors.metal}
                                            name="metal"
                                            getValues={getValues}
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
                                            getValues={getValues}
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
                                    <Stack className="RowWrapper">
                                        <RenderFields
                                            type="select"
                                            register={register}
                                            error={errors.series}
                                            name="series"
                                            getValues={getValues}
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
                                            getValues={getValues}
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
                                    <Stack className="RowWrapper">
                                        <RenderFields
                                            type="select"
                                            register={register}
                                            error={errors.weight}
                                            name="weight"
                                            label="Weight"
                                            getValues={getValues}
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
                                            getValues={getValues}
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
                                    <Stack className="RowWrapper SpecificationWrapper">
                                        <RenderFields
                                            type="select"
                                            register={register}
                                            error={errors.specification}
                                            name="specification"
                                            label="Specification"
                                            getValues={getValues}
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
                                            getValues={getValues}
                                            label="Value"
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
                                    <Stack className="RowWrapper CustomSpecificationWrapper">
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
                                    <Stack className='RowWrapper ButtonsWrapper'>
                                        <Button variant="contained" size="large">Add Specification</Button>
                                        <Button variant="contained" size="large">Add Custom Specification</Button>
                                    </Stack>
                                    <Stack className="RowWrapper">
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
                                            control={control}
                                            name="qty"
                                            label="Qty:"
                                            variant='outlined'
                                            margin='none'
                                            required
                                        />
                                    </Stack>
                                    <Stack className="RowWrapper DocumentPhotosContentWrapper">
                                        <Box className="DocumentsContentwrapper">
                                            <RenderFields
                                                type="file"
                                                register={register}
                                                error={errors.provenanceDocuments}
                                                name="provenanceDocuments"
                                                label="Provenance Documents:"
                                                control={control}
                                                variant='outlined'
                                                margin='none'
                                                required
                                            >
                                            </RenderFields>
                                            <RenderFields
                                                type="select"
                                                register={register}
                                                error={errors.documentType}
                                                name="documentType"
                                                control={control}
                                                variant='outlined'
                                                getValues={getValues}
                                                margin='none'
                                                className='SelectValue'
                                            // required
                                            >
                                                <MenuItem key='test' value='perth mint'>Invoice</MenuItem>
                                                <MenuItem key='test' value='royal mint'>Certificate</MenuItem>
                                                <MenuItem key='test' value='sunshine mint'>other</MenuItem>
                                            </RenderFields>
                                            <Box className="CommonTableWrapper">
                                                <TableContainer
                                                    className="DocumentsDetailTablewrapper  CommonTableDesign"
                                                >
                                                    <Table className="DocumentsDetailTable" sx={{ minWidth: 550 }} aria-label="Documents Details table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell sx={{ minWidth: "200px" }}>File Name</TableCell>
                                                                <TableCell sx={{ minWidth: "200px" }}>Documents Type</TableCell>
                                                                <TableCell sx={{ minWidth: "100px" }}>Remove</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {documentsRows.map((row) => (
                                                                <TableRow
                                                                    key={row.fileName}
                                                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                                >
                                                                    <TableCell component="th" scope="row">{row.fileName}</TableCell>
                                                                    <TableCell>{row.documentType}</TableCell>
                                                                    <TableCell>
                                                                        <IconButton className="DeleteButton"><Delete1Icon /></IconButton>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}

                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Box>
                                        </Box>
                                        <Box className="PhotosContentwrapper">
                                            <RenderFields
                                                type="file"
                                                register={register}
                                                error={errors.productPhotos}
                                                name="productPhotos"
                                                label="Product Photos:"
                                                control={control}
                                                variant='outlined'
                                                margin='none'
                                                required
                                            >
                                            </RenderFields>
                                            <Box className="CommonTableWrapper">
                                                <TableContainer
                                                    className="PhotosDetailTablewrapper  CommonTableDesign"
                                                >
                                                    <Table className="PhotosDetailTable" sx={{ minWidth: 400 }} aria-label="Photos Details table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell sx={{ minWidth: "300px" }}>File Name</TableCell>
                                                                <TableCell sx={{ minWidth: "100px" }}>Remove</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {photosRows.map((row) => (
                                                                <TableRow
                                                                    key={row.fileName}
                                                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                                >
                                                                    <TableCell component="th" scope="row">{row.fileName}</TableCell>
                                                                    <TableCell>
                                                                        <IconButton className="DeleteButton"><Delete1Icon /></IconButton>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}

                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Box>
                                        </Box>
                                    </Stack>
                                    <Stack sx={{ gap: "20px", justifyContent: "flex-end" }} className='BottomButtonsWrapper'>
                                        <Button variant="contained" size="large">Save</Button>
                                        <Button variant="outlined" size="large">Cancel</Button>
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
