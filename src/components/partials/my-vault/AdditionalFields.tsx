import { Delete1Icon } from '@/assets/icons';
import RenderFields from '@/components/common/RenderFields'
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Divider, IconButton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

const AdditionalFields = () => {
    const [fields, setFields] = useState<{ id: string, firstName: string, lastName: string }[]>([]);
    const [additionalFieldSchema, setAdditionalFieldSchema] = useState<{ [key: string]: string }>()

    const {
        register,
        reset,
        handleSubmit,
        control,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<{ firstName: string, lastName: string }>({
        resolver: yupResolver(additionalFieldSchema)
    })

    const handleAddField = () => {
        const newField = {
            id: Math.random().toString(36).substring(7), // Generate a random ID for the new field
            firstName: '',
            lastName: ''
        };
        additionalFieldSchema
        setFields(prevFields => [...prevFields, { ...newField }]);
    };

    const handleDeleteField = (id: string) => {
        setFields(prevFields => prevFields.filter(field => field.id !== id));
    };

    return (
        <Stack className="Fields JointFields">
            <Stack className="Header">
                <Typography>Additional Beneficiary / Account Holder</Typography>
                <Button variant="contained" color="success" onClick={handleAddField}>Add more</Button>
            </Stack>
            {fields.map((field) => (
                <Stack
                    key={field.id}
                    className="FieldsWrapper"
                    divider={<Divider flexItem />}
                >
                    <Stack className="Column">
                        <RenderFields
                            // register={register}
                            // error={errors.FirstName}
                            name="FirstName"
                            placeholder="Enter first name *"
                            // control={control}
                            variant='outlined'
                            margin='none'
                        />
                        <RenderFields
                            // register={register}
                            // error={errors.LastName}
                            name="LastName"
                            placeholder="Enter last name *"
                            // control={control}
                            variant='outlined'
                            margin='none'
                        />
                        <IconButton onClick={() => handleDeleteField(field.id)}><Delete1Icon /></IconButton>
                    </Stack>
                </Stack>
            ))}

        </Stack>
    )
}

export default AdditionalFields