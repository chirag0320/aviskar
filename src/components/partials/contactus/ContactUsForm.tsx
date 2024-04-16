import RenderFields from '@/components/common/RenderFields'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, MenuItem, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { saveContactUsDetails } from '@/redux/reducers/contactUs'
import { ENDPOINTS } from '@/utils/constants'
import { hasFulfilled } from '@/utils/common'
import useShowToaster from '@/hooks/useShowToaster'

interface GetInTouchInputs {
    reason: string
    name: string
    email: string
    phone: string
    enquiry: string
}

const schema = yup.object().shape({
    reason: yup.string().notOneOf(['none'], "Reason is required field"),
    name: yup.string().trim().required("Name is required field"),
    email: yup.string().email("Email must be valid").required("Email is required field"), // Email field is required and must be in email format
    phone: yup.string().trim().required("Phone number is required field"),
    enquiry: yup.string().trim().required("Enquiry is required field"),
});


const ContactUsForm = () => {
    const reasonsForContact = useAppSelector(state => state.contactUs.reasonsForContact);
    const loading = useAppSelector(state => state.contactUs.loading);
    const [reasonValue, setReasonValue] = useState("none")
    const dispatch = useAppDispatch();
    const { showToaster } = useShowToaster()

    const {
        register,
        handleSubmit,
        clearErrors,
        reset,
        getValues,
        control,
        setValue,
        formState: { errors },
    } = useForm<GetInTouchInputs>({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data: any) => {
        const response = await dispatch(saveContactUsDetails({
            url: ENDPOINTS.saveContactUsDetails, body: {
                ReasonId: data.reason,
                Email: data.email,
                Enquiry: data.enquiry,
                Name: data.name,
                PhoneNumber: data.phone
            }
        }) as any);

        if (hasFulfilled(response.type)) {
            showToaster({ message: "Enquiry Form has been submitted successfully", severity: "success" })
            reset();
        }
        else {
            showToaster({ message: "Submission failed! Try again." })
        }
    }

    return (
        <Box className="GetInTouchLeftForm">
            <Typography variant="h4" component="h2" className="Title">Get In Touch</Typography>
            <form onSubmit={handleSubmit(onSubmit)} id="GetintouchForm">
                <RenderFields
                    type="select"
                    register={register}
                    error={errors.reason}
                    name="reason"
                    clearErrors={clearErrors}
                    label="Reason* :"
                    control={control}
                    value={reasonValue}
                    variant='outlined'
                    getValues={getValues}
                    margin='none'
                    setValue={setValue}
                    // required
                    className='SelectReason'
                >
                    <MenuItem value="none">Select Reason</MenuItem>
                    {reasonsForContact.length > 0 && reasonsForContact.map((reason) => (
                        <MenuItem key={reason.id} value={reason.id}>{reason.reason}</MenuItem>
                    ))}
                </RenderFields>
                <RenderFields
                    register={register}
                    error={errors.name}
                    name="name"
                    label="Your name* :"
                    placeholder="Enter your name."
                    variant='outlined'
                    margin='none'
                // required
                />
                <RenderFields
                    register={register}
                    error={errors.email}
                    name="email"
                    label="Your email* :"
                    placeholder="Enter your email address."
                    variant='outlined'
                    margin='none'
                // required
                />
                <RenderFields
                    register={register}
                    error={errors.phone}
                    control={control}
                    type='number'
                    name="phone"
                    label="Your phone* :"
                    placeholder="Enter your phone number."
                    variant='outlined'
                    margin='none'
                // required
                />
                <RenderFields
                    register={register}
                    error={errors.enquiry}
                    name="enquiry"
                    label="Enquiry* :"
                    placeholder="Enter your enquiry."
                    variant='outlined'
                    multiline={true}
                    rows={7}
                    className='EnquiryTexaea'
                    margin='none'
                // required
                />
                <Box className="FormAction">
                    <Button className='GetInTouchSubmitBtn' variant="contained" type="submit" disabled={loading}>Submit</Button>
                </Box>
            </form>
        </Box>
    )
}

export default ContactUsForm