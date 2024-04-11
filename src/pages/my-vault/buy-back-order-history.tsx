import React, { useEffect } from "react"
import { Box, Container, Divider } from "@mui/material"
import { PageTitle } from "@/components/common/Utils"
import OrderDateStatusSelector from "@/components/partials/my-vault/OrderDateStatusSelector"
import OrderDetailsCard from "@/components/partials/my-vault/OrderDetailsCard"
import Seo from "@/components/common/Seo"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { ENDPOINTS } from "@/utils/constants"
import { getTopicDetails } from "@/redux/reducers/topicReducer"
import { useAppDispatch, useAppSelector } from "@/hooks"
import Layout from "@/components/common/Layout"
import Loader from "@/components/common/Loader"
import { getBuyBackOrderHistory, getConfigDropdowns } from "@/redux/reducers/myVaultReducer"
import { requestBodyDefault } from "../[category]"
import { navigate } from "gatsby"

export const requestBodyOrderHistory = {
    ...requestBodyDefault, filters: {
        fromDate: "",
        toDate: "",
        orderStatusId: "",
        orderCustomerId: ""
    },
    pageSize: -1
}

function BuyBackOrderHistory() {
    const orderBuypackHistoryDetails = useAppSelector(state => state.myVault.buyBackOrderHistory)
    const loading = useAppSelector(state => state.myVault.loading)
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector((state) => state.homePage.isLoggedIn)

    if (!isLoggedIn) {
        navigate('/login', { replace: true })
        return;
    }

    useEffect(() => {
        dispatch(
            getBuyBackOrderHistory({
                url: ENDPOINTS.getBuyBackOrderHistory,
                body: { ...requestBodyOrderHistory, filters: {} },
            })
        );
    }, []);
    useAPIoneTime({
        service: getConfigDropdowns,
        endPoint: ENDPOINTS.getConfigDropdown
    })

    return (
        <>
            <Loader open={loading} />
            {
                !loading && <Layout>
                    <Seo
                        keywords={[`QMint Topics`]}
                        title="Buyback orders"
                        lang="en"
                    />
                    <PageTitle title="Buyback orders" backToDashboard={true} />
                    <Box id="BuybackOrderHistoryPage" className='BuybackOrderHistoryPage' component="section">
                        <Container>
                            <Box className="Content OrderHistoryContent">
                                <Divider />
                                <OrderDateStatusSelector orderHistoryType="buy-back" />
                                <Divider />
                                <Box className="OrderDetailsCardsWrapper">
                                    No orders
                                    {/* <OrderDetailsCard />
                                    <OrderDetailsCard />
                                    <OrderDetailsCard />
                                    <OrderDetailsCard /> */}
                                </Box>
                            </Box>
                        </Container>
                    </Box>
                </Layout>
            }
        </>
    )
}

export default BuyBackOrderHistory
