import React from "react"
import Seo from "../components/common/Seo"
import Layout from "@/components/common/Layout";
import { Box, Grid, Container, Typography } from "@mui/material"

// Utils
import { PageTitle } from "@/components/common/Utils"
import MembershipCard from "@/components/partials/memberships/MembershipCard";
import  * as  variable from '../scss/settings/variables.module.scss'


function Memberships() {
    return (
        <Layout>
            <>
                <Seo
                    keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
                    title="Home"
                    lang="en"
                />
                <Box id="MembershipsPage" component="section">
                    <Box className="TitleWrapper">
                        <PageTitle title="Memberships" />
                    </Box> 
                    <Container>
                    <Box className="MembershipCardWrapper">
                        <MembershipCard BgColor={variable.copper} CardTitle="COPPER"/>
                        <MembershipCard BgColor={variable.silverSand} CardTitle="SILVER"/>
                        <MembershipCard BgColor={variable.goldTips} CardTitle="GOLD"/>
                        <MembershipCard BgColor={variable.mercury} CardTitle="PLATINUM"/>
                    </Box>
                    </Container>
                </Box>
            </>
        </Layout>
    )
}

export default Memberships