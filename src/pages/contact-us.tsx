import React from 'react'
import Seo from "../components/common/Seo"
import Layout from "@/components/common/Layout";
import { Box, Container, Typography, Stack, Icon, Link, MenuItem, Button, } from "@mui/material"
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Utils
import { PageTitle } from "@/components/common/Utils"
import SocialNetwork from "@/components/partials/contactus/SocialNetwork";

// Assets
import { AddressIcon, Calling, Email, } from "../assets/icons/index"

// Components
import RenderFields from '../components/common/RenderFields'


interface GetInTouchInputs {
  Reason: string
  Name: string
  Email: string
  Phone: string
  Enquiry: string
}

const schema = yup.object().shape({
  Reason: yup.string(),
  Name: yup.string(),
  Email: yup.string(),
  Phone: yup.string(),
  Enquiry: yup.string(),
})


function ContactUs() {

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<GetInTouchInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      Reason: 'none', // Set the default value for the Reason field
    },
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Layout>
      <>
        <Seo
          keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
          title="Home"
          lang="en"
        />
        <Box id="ContactUsPage" className='ContactUsPage' component="section">
          <Box className="TitleWrapper">
            <PageTitle title="Contact us" />
          </Box>
          <Container>
            <Stack className="ContactCardsWrapper">
              <Box className="AddressWrapper ContactCard">
                <Box className="IconWrapper">
                  <Icon className='OriginalIcon'><AddressIcon /></Icon>
                </Box>
                <Typography variant="h4" component="h2" className="Title">address</Typography>
                <Typography variant="body1" className="AddressDesription">102 Adelaide St Brisbane <br /> Queensland 4000 Australia</Typography>
              </Box>
              <Box className="CallUsWrapper ContactCard">
                <Box className="IconWrapper">
                  <Icon className='OriginalIcon'><Calling /></Icon>
                </Box>
                <Typography variant="h4" component="h2" className="Title">Call us</Typography>
                <Link href="tel:(07) 3184 8300" variant="body1" className="CallUsNumber">(07) 3184 8300</Link>
              </Box>
              <Box className="EmailWrapper ContactCard">
                <Box className="IconWrapper">
                  <Icon className='OriginalIcon'><Email /></Icon>
                </Box>
                <Typography variant="h4" component="h2" className="Title">Email Id</Typography>
                <Link href="mailto:support@queenslandmint.com.ca" variant="body1" className="EmailAddress">support@queenslandmint.com.ca</Link>
              </Box>
            </Stack>
            <Box className="GetInTouchWrapper">
              <Box className="GetInTouchLeftForm">
                <Typography variant="h4" component="h2" className="Title">Get In Touch</Typography>
                <form onSubmit={handleSubmit(onSubmit)} id="GetintouchForm">
                  <RenderFields
                    type="select"
                    register={register}
                    error={errors.Reason}
                    name="Reason"
                    label="Reason:"
                    control={control}
                    variant='outlined'
                    margin='none'
                    required
                    className='SelectReason'
                  >
                    <MenuItem value="none">Select reason</MenuItem>
                    <MenuItem value="Inspect/audit metal In my Vault Storage account">Inspect/audit metal In my Vault Storage account</MenuItem>
                    <MenuItem value="technology">Technology</MenuItem>
                    <MenuItem value="manufactorig">Manufactorig</MenuItem>
                  </RenderFields>
                  <RenderFields
                    register={register}
                    error={errors.Name}
                    name="Name"
                    label="Your name:"
                    placeholder="Enter your name."
                    variant='outlined'
                    margin='none'
                    required
                  />
                  <RenderFields
                    register={register}
                    error={errors.Name}
                    name="Email"
                    label="Your email:"
                    placeholder="Enter your email address."
                    variant='outlined'
                    margin='none'
                    required
                  />
                  <RenderFields
                    register={register}
                    error={errors.Name}
                    name="Phone"
                    label="Your phone:"
                    placeholder="Enter your phone number."
                    variant='outlined'
                    margin='none'
                    required
                  />
                  <RenderFields
                    register={register}
                    error={errors.Name}
                    name="Enquiry"
                    label="Enquiry:"
                    placeholder="Enter your enquiry."
                    variant='outlined'
                    multiline={true}
                    rows={7}
                    className='EnquiryTexaea'
                    margin='none'
                    required
                  />
                  <Box className="FormAction">
                    <Button className='GetInTouchSubmitBtn' variant="contained" type="submit">Submit</Button>
                  </Box>
                </form>

              </Box>
              <Box className="GetInTouchRightMap">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9114285233754!2d72.50376677607713!3d23.02702407917064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b398e5880f1%3A0x32614b29d1226274!2sShivalik%20Shilp!5e0!3m2!1sen!2sin!4v1709713953852!5m2!1sen!2sin" width="600" height="450" loading="lazy" ></iframe>
              </Box>
            </Box>
            <SocialNetwork />
          </Container>
        </Box>

      </>
    </Layout>)
}

export default ContactUs