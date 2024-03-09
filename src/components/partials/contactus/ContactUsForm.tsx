import RenderFields from '@/components/common/RenderFields'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, MenuItem, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { saveContactUsDetails } from '@/redux/reducers/contactUs'
import { ENDPOINTS } from '@/utils/constants'

interface GetInTouchInputs {
    reason: string
    name: string
    email: string
    phone: string
    enquiry: string
}

const schema = yup.object().shape({
    reason: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(), // Email field is required and must be in email format
    phone: yup.string().required(),
    enquiry: yup.string().required(),
});


const ContactUsForm = () => {
    const reasonsForContact = useAppSelector(state => state.contactUs.reasonsForContact);
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<GetInTouchInputs>({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data: any) => {
        console.log(data);
        dispatch(saveContactUsDetails({
            url: ENDPOINTS.saveContactUsDetails, body: {
                ReasonId: data.reason,
                Email: data.email,
                Enquiry: data.enquiry,
                Name: data.name,
                PhoneNumber: data.phone
            }
        }) as any);
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
                    label="Reason:"
                    control={control}
                    variant='outlined'
                    margin='none'
                    // required
                    className='SelectReason'
                >
                    {reasonsForContact.length > 0 && reasonsForContact.map((reason) => (
                        <MenuItem key={reason.id} value={reason.id}>{reason.reason}</MenuItem>
                    ))}
                </RenderFields>
                <RenderFields
                    register={register}
                    error={errors.name}
                    name="name"
                    label="Your name:"
                    placeholder="Enter your name."
                    variant='outlined'
                    margin='none'
                // required
                />
                <RenderFields
                    register={register}
                    error={errors.email}
                    name="email"
                    label="Your email:"
                    placeholder="Enter your email address."
                    variant='outlined'
                    margin='none'
                // required
                />
                <RenderFields
                    register={register}
                    error={errors.phone}
                    name="phone"
                    label="Your phone:"
                    placeholder="Enter your phone number."
                    variant='outlined'
                    margin='none'
                // required
                />
                <RenderFields
                    register={register}
                    error={errors.enquiry}
                    name="enquiry"
                    label="Enquiry:"
                    placeholder="Enter your enquiry."
                    variant='outlined'
                    multiline={true}
                    rows={7}
                    className='EnquiryTexaea'
                    margin='none'
                // required
                />
                <Box className="FormAction">
                    <Button className='GetInTouchSubmitBtn' variant="contained" type="submit">Submit</Button>
                </Box>
            </form>
        </Box>
    )
}

export default ContactUsForm