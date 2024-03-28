import React from "react"
import Seo from "../components/common/Seo"
import Layout from "@/components/common/Layout";
import { Box, Grid, Container, Typography } from "@mui/material"

// Utils
import { PageTitle } from "@/components/common/Utils"
import MembershipCard from "@/components/partials/memberships/MembershipCard";
import * as  variable from '../scss/settings/variables.module.scss'
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { membershipPlanDetails } from "@/redux/reducers/homepageReducer";
import { ENDPOINTS } from "@/utils/constants";
import { useAppSelector } from "@/hooks";


const colourForMembership: any = {
    gold: 'goldTips',
    palladium: 'palladium',
    platinum: 'mercury',
    silver: 'silver',
    copper: 'copper',
}

function Memberships() {
    const { mebershipPlanDetailsData } = useAppSelector((state) => state.homePage)

    useAPIoneTime({ service: membershipPlanDetails, endPoint: ENDPOINTS.membership })

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
                            {
                                Object.entries(mebershipPlanDetailsData).flatMap((item: any, index) => {
                                    return (
                                        item[0] !== 'currentMemberShip' ? [<MembershipCard bgcolor={variable[colourForMembership[item[0]]] === 'silver'? '#c0c0c0' : variable[colourForMembership[item[0]]]} cardtitle={item[0] as string} details={item[1]} />] : []
                                    )
                                })
                            }
                            {/* <MembershipCard bgcolor={variable.copper} cardtitle="COPPER" />
                            <MembershipCard bgcolor={variable.silverSand} cardtitle="SILVER" />
                            <MembershipCard bgcolor={variable.goldTips} cardtitle="GOLD" />
                            <MembershipCard bgcolor={variable.mercury} cardtitle="PLATINUM" /> */}
                        </Box>
                    </Container>
                </Box>
            </>
        </Layout>
    )
}

export default Memberships