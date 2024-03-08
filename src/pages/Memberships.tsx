import React from "react"
import Seo from "../components/common/Seo"
import Layout from "@/components/common/Layout";
import { Box, Grid, Container, Typography } from "@mui/material"

// Utils
import { PageTitle } from "@/components/common/Utils"
import MembershipCard from "@/components/partials/memberships/MembershipCard";
import * as  variable from '../scss/settings/variables.module.scss'


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
                            <MembershipCard bgcolor={variable.copper} cardtitle="COPPER" />
                            <MembershipCard bgcolor={variable.silverSand} cardtitle="SILVER" />
                            <MembershipCard bgcolor={variable.goldTips} cardtitle="GOLD" />
                            <MembershipCard bgcolor={variable.mercury} cardtitle="PLATINUM" />
                        </Box>
                    </Container>
                </Box>
            </>
        </Layout>
    )
}

export default Memberships