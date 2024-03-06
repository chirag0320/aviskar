import React from 'react'
import Seo from "../components/common/Seo"
import Layout from "@/components/common/Layout";
import { Box, Grid, Container, Typography } from "@mui/material"

// Utils
import { PageTitle } from "@/components/common/Utils"

function ContactUs() {
    return (
        <Layout>
            <>
                <Seo
                    keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
                    title="Home"
                    lang="en"
                />
                <Box id="ContactUsPage" component="section">
                    <Box className="TitleWrapper">
                        <PageTitle title="Contact us" />
                    </Box> 
                    <Container>
                        
                    </Container>
                </Box>

            </>
        </Layout>)
}

export default ContactUs