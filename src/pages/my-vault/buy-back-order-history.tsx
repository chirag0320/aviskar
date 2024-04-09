import React from "react"
import { Box, Container, Divider } from "@mui/material"
import { PageTitle } from "@/components/common/Utils"
import OrderDateStatusSelector from "@/components/partials/my-vault/OrderDateStatusSelector"
import OrderDetailsCard from "@/components/partials/my-vault/OrderDetailsCard"
import Seo from "@/components/common/Seo"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { ENDPOINTS } from "@/utils/constants"
import { useAppSelector } from "@/hooks"
import Layout from "@/components/common/Layout"
import Loader from "@/components/common/Loader"
import { getBuyBackOrderHistory } from "@/redux/reducers/myVaultReducer"
import { requestBodyDefault } from "../[category]"

export const requestBodyOrderHistory = {
    ...requestBodyDefault, filters: {
        fromDate: "",
        toDate: "",
        orderStatusId: "",
        orderCustomerId: ""
    }
}

function BuyBackOrderHistory() {
    // const loading = useAppSelector(state => state.myVault.loading)

    useAPIoneTime({
        service: getBuyBackOrderHistory, endPoint: ENDPOINTS.getBuyBackOrderHistory, body: requestBodyOrderHistory
    })

    return (
        <>
            {/* <Loader open={loading} /> */}
            <Layout>
                <Seo
                    keywords={[`QMint BuyBackOrderHistory`]}
                    title="Buyback orders"
                    lang="en"
                />
                <PageTitle title="Buyback orders" backToDashboard={true} />
                <Box id="BuybackOrderHistoryPage" className='BuybackOrderHistoryPage' component="section">
                    <Container>
                        <Box className="Content OrderHistoryContent">
                            <Divider />
                            <OrderDateStatusSelector />
                            <Divider />
                            <Box className="OrderDetailsCardsWrapper">
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Layout>

        </>
    )
}

export default BuyBackOrderHistory