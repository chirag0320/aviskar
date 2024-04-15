import { Delete1Icon } from '@/assets/icons';
import RenderFields from '@/components/common/RenderFields'
import {
    Box, IconButton, Link, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material"
import { string } from 'prop-types';
import React, { useEffect, useState } from 'react'

const ProductPhotos = ({ register, errors, control, setValue, getValues, clearErrors, existingDocuments = null }: any) => {
    const [files, setFile] = useState<{
        id: string,
        fileName: string,
        type: number,
        fileByte?: string,
        filePath?: string
    }[]>([]);

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
        <Box className="PhotosContentwrapper">
            <RenderFields
                type="file"
                register={register}
                error={errors.ProductPhotos}
                name="ProductPhotos"
                label="Product Photos:"
                control={control}
                variant='outlined'
                margin='none'
                required
            >
            </RenderFields>
            <Box className="CommonTableWrapper">
                <TableContainer
                    className="DocumentsDetailTablewrapper  CommonTableDesign"
                >
                    <Table className="DocumentsDetailTable" sx={{ minWidth: 550 }} aria-label="Documents Details table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ minWidth: "300px" }}>File Name</TableCell>
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

export default ProductPhotos