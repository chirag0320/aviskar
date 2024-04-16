import { Delete1Icon } from '@/assets/icons';
import RenderFields from '@/components/common/RenderFields'
import useShowToaster from '@/hooks/useShowToaster';
import {
    Box, IconButton, Link, MenuItem, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material"
import React, { useEffect, useState } from 'react'

const documentTypeEnum: { [key: string]: string } = {
    "0": "Invoice",
    "1": "Certificate",
    "2": "Other"
}

const ProvenanceDocuments = ({ register, errors, control, setValue, getValues, clearErrors, existingDocuments = null, provenanceDocuments, setProvenanceDocuments }: any) => {
    const { showToaster } = useShowToaster()
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [docTypeValue, setDocTypeValue] = useState<string>("none");

    useEffect(() => {
        if (!existingDocuments) return;

        setProvenanceDocuments(existingDocuments.map((doc: any) => {
            return {
                id: doc.id,
                fileName: doc.fileName,
                type: doc.type,
                filePath: doc.filepath
            }
        }))
    }, [existingDocuments])

    const handleDeleteFile = (id: string) => {
        setProvenanceDocuments(provenanceDocuments.filter((file: any) => file.id !== id));
    }

    const uploadHandler = () => {
        if (getValues("DocumentType") === "none") {
            showToaster({ message: "Select the document type", severity: "error" })
            return;
        }
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event: any) => {
                const fileData = event?.target?.result;

                setProvenanceDocuments([...provenanceDocuments, {
                    id: new Date().getTime().toString(),
                    fileName: selectedFile.name,
                    type: getValues("DocumentType"),
                    fileByte: fileData
                }]);
            };
            reader.readAsArrayBuffer(selectedFile);
            setValue("ProvenanceDocuments", selectedFile);
            setSelectedFile(null);
        }
        else {
            showToaster({ message: "Please select a file", severity: "error" })
        }
    }

    return (
        <Box className="DocumentsContentwrapper">
            <RenderFields
                type="file"
                register={register}
                error={errors.ProvenanceDocuments}
                name="ProvenanceDocuments"
                label="Provenance Documents:"
                control={control}
                variant='outlined'
                setSelectedFile={setSelectedFile}
                uploadFileHandler={uploadHandler}
                margin='none'
                required
            >
            </RenderFields>
            <RenderFields
                type="select"
                register={register}
                error={errors.DocumentType}
                clearErrors={clearErrors}
                name="DocumentType"
                control={control}
                variant='outlined'
                getValues={getValues}
                margin='none'
                setValue={setValue}
                value={docTypeValue}
                className='SelectValue'
            >
                <MenuItem value='none'>Select Document Type</MenuItem>
                <MenuItem key='test' value='0'>Invoice</MenuItem>
                <MenuItem key='test' value='1'>Certificate</MenuItem>
                <MenuItem key='test' value='2'>other</MenuItem>
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
                            {provenanceDocuments.map((file: any) => (
                                <TableRow
                                    key={file.id}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="document">
                                        <Link href={file.filePath} target="_blank">{file.fileName}</Link>
                                    </TableCell>
                                    <TableCell>{documentTypeEnum[file.type.toString()]}</TableCell>
                                    <TableCell>
                                        <IconButton className="DeleteButton" onClick={() => handleDeleteFile(file.id)}><Delete1Icon /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

export default ProvenanceDocuments