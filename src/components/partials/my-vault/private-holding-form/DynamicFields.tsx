import { Delete1Icon } from '@/assets/icons';
import RenderFields from '@/components/common/RenderFields'
import { IPrivateHoldingAddInputs } from '@/types/myVault';
import { IndividualAccountFormSchema } from '@/utils/accountFormSchemas.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, IconButton, MenuItem, Stack } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

export interface ISpecificationField {
    [key: string]: { specificationName: string, value: string }
}

const DynamicFields = ({existingFields} : {existingFields : }) => {
    const [specificationFields, setSpecificationField] = useState<ISpecificationField[]>([]);
    console.log("🚀 ~ DynamicFields ~ specificationFields:", specificationFields)
    const [customSpecificationFields, setCustomSpecificationField] = useState<ISpecificationField[]>([]);

    // Just an dummy react hook form
    const {
        register,
        handleSubmit,
        control,
        clearErrors,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<IPrivateHoldingAddInputs>({
        resolver: yupResolver(IndividualAccountFormSchema)
    })

    const handleAddSpecificationField = () => {
        const newField = {
            [Math.random().toString(36).substring(7)]: {
                specificationName: "none",
                value: "none"
            }
        };
        // additionalFieldSchema
        setSpecificationField(prevFields => [...prevFields, { ...newField }]);
    };

    const handleDeleteSpecificationField = (id: string) => {
        setSpecificationField(prevFields => prevFields.filter(field => Object.keys(field)[0] !== id));
    };

    const handleAddCustomSpecificationField = () => {
        const newField = {
            [Math.random().toString(36).substring(7)]: {
                specificationName: "",
                value: ""
            }
        };
        // additionalFieldSchema
        setCustomSpecificationField(prevFields => [...prevFields, { ...newField }]);
    };

    const handleDeleteCustomeSpecificationField = (id: string) => {
        setCustomSpecificationField(prevFields => prevFields.filter(field => Object.keys(field)[0] !== id));
    };

    return (
        <>
            {specificationFields.map((field, index) => <Stack className="RowWrapper SpecificationWrapper" key={Object.keys(field)[0]}>
                <RenderFields
                    type="select"
                    // register={register}
                    // error={errors.Specification}
                    name="Specification"
                    label="Specification"
                    // getValues={getValues}
                    value={field[Object.keys(field)[0]].specificationName}
                    onChange={(value) => {
                        const newFields = [...specificationFields];
                        newFields[index][Object.keys(field)[0]].specificationName = value;
                        setSpecificationField(newFields);
                    }}
                    control={control}
                    variant='outlined'
                    defaultValue="none"
                    margin='none'
                    clearErrors={clearErrors}
                    className='SelectSpecification'
                // required
                >
                    <MenuItem key='test' value='none'>Select Specfication</MenuItem>
                    <MenuItem key='test' value='perth mint'>perth mint</MenuItem>
                    <MenuItem key='test' value='royal mint'>royal mint</MenuItem>
                    <MenuItem key='test' value='sunshine mint'>sunshine mint</MenuItem>
                </RenderFields>
                <RenderFields
                    type="select"
                    // register={register}
                    // error={errors.Value}
                    name="Value"
                    // getValues={getValues}
                    value={field[Object.keys(field)[0]].value}
                    onChange={(value) => {
                        const newFields = [...specificationFields];
                        newFields[index][Object.keys(field)[0]].value = value;
                        setSpecificationField(newFields);
                    }}
                    label="Value"
                    control={control}
                    clearErrors={clearErrors}
                    variant='outlined'
                    margin='none'
                    className='SelectValue'
                // required
                >
                    <MenuItem key='test' value='perth mint'>perth mint</MenuItem>
                    <MenuItem key='test' value='royal mint'>royal mint</MenuItem>
                    <MenuItem key='test' value='sunshine mint'>sunshine mint</MenuItem>
                </RenderFields>
                <IconButton className="DeleteButton" onClick={() => handleDeleteSpecificationField(Object.keys(field)[0])}><Delete1Icon /></IconButton>
            </Stack>)}
            {customSpecificationFields.map((field, index) => <Stack className="RowWrapper CustomSpecificationWrapper" key={Object.keys(customSpecificationFields)[0]}>
                <RenderFields
                    // register={register}
                    // error={errors.CustomSpecification}
                    name="CustomSpecification"
                    label="Custom Specification"
                    // placeholder="Enter custom specification."
                    value={field[Object.keys(field)[0]].specificationName}
                    placeholder='Enter Custom Specification'
                    onChange={(e) => {
                        const newFields = [...customSpecificationFields];
                        newFields[index][Object.keys(field)[0]].specificationName = e.target.value;
                        setCustomSpecificationField(newFields);
                    }}
                    variant='outlined'
                    margin='none'
                // required
                />
                <RenderFields
                    // register={register}
                    // error={errors.CustomValue}
                    name="CustomValue"
                    label="Custom Value"
                    value={field[Object.keys(field)[0]].value}
                    placeholder="Enter Custome Specfication Value"
                    onChange={(e) => {
                        const newFields = [...customSpecificationFields];
                        newFields[index][Object.keys(field)[0]].value = e.target.value;
                        setCustomSpecificationField(newFields);
                    }}
                    // placeholder="Enter custom value."
                    variant='outlined'
                    margin='none'
                // required
                />
                <IconButton className="DeleteButton" onClick={() => handleDeleteCustomeSpecificationField(Object.keys(field)[0])}><Delete1Icon /></IconButton>
            </Stack>)}
            <Stack className='RowWrapper ButtonsWrapper'>
                <Button variant="contained" size="large" onClick={handleAddSpecificationField}>Add Specification</Button>
                <Button variant="contained" size="large" onClick={handleAddCustomSpecificationField}>Add Custom Specification</Button>
            </Stack>
        </>
    )
}

export default DynamicFields