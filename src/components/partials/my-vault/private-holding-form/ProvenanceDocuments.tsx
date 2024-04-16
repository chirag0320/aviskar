import { Delete1Icon } from '@/assets/icons';
import RenderFields from '@/components/common/RenderFields'
import {
    Box, Button, Container, IconButton, Link, MenuItem, Stack, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material"
import { string } from 'prop-types';
import React, { useEffect, useState } from 'react'

function createDataDocuments(
    fileName: string,
    documentType: string,
) {
    return { fileName, documentType };
}

const ProvenanceDocuments = ({ register, errors, control, setValue, getValues, clearErrors, existingDocuments = null }: any) => {
    const [files, setFile] = useState<{
        id: string,
        fileName: string,
        type: number,
        fileByte?: string,
        filePath?: string
    }[]>([]);
    // console.log("🚀 ~ ProvenanceDocuments ~ files:", files)

    useEffect(() => {
        if (!existingDocuments) return;

        setFile(existingDocuments.map((doc: any) => {
            return {
                id: doc.id,
                fileName: doc.fileName,
                type: doc.type,
                filePath: doc.filepath
            }
        }))
    }, [existingDocuments])

    useEffect(() => {
        setValue("DocumentType", "none");
    }, [])

    const handleDeleteFile = (id: string) => {
        setFile(files.filter(file => file.id !== id));
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
                defaultValue="none"
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
                            {files.map((file) => (
                                <TableRow
                                    key={file.id}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="document">
                                        <Link href={file.filePath} target="_blank">{file.fileName}</Link>
                                    </TableCell>
                                    <TableCell>{file.type}</TableCell>
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