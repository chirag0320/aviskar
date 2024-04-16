import React, { useEffect } from "react"
import { Box, Button, Container, Divider } from "@mui/material"
import { PageTitle } from "@/components/common/Utils"
import Seo from "@/components/common/Seo"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { ENDPOINTS } from "@/utils/constants"
import { getTopicDetails } from "@/redux/reducers/topicReducer"
import { useAppDispatch, useAppSelector } from "@/hooks"
import Layout from "@/components/common/Layout"
import Loader from "@/components/common/Loader"
import { PlusIcon } from "@/assets/icons"
import PrivateHoldingCards from "@/components/partials/my-vault/PrivateHoldingsCard"
import { getPrivateHoldingsList } from "@/redux/reducers/myVaultReducer"
import { navigate } from "gatsby"
import useRequireLogin from "@/hooks/useRequireLogin"

function privateHolding(paramsData: any) {
    const { loadingForCheckingLogin } = useRequireLogin()
    const loading = useAppSelector(state => state.myVault.loading)
    const dispatch = useAppDispatch()
    const fetchPrivateHoldingsList = async () => {
        await dispatch(getPrivateHoldingsList());
    }
    useEffect(() => {
        fetchPrivateHoldingsList()
    }, [])
    if (loadingForCheckingLogin) {
        return
    }
    return (
        <>
            <Loader open={loading} />
            <Layout>
                <Seo
                    keywords={[`QMint Topics`]}
                    title="Private Holdings"
                    lang="en"
                />
                <PageTitle title="Private Holdings" backToDashboard={true} />
                <Box id="PrivateHoldingPage" className='PrivateHoldingPage' component="section">
                    <Container>
                        <Box className="Content PrivateHoldingContent">
                            <Box sx={{ textAlign: 'right' }}>
                                <Button variant="outlined" startIcon={<PlusIcon />} onClick={() => navigate("/my-vault/private-holding-add")}>Add new</Button>
                            </Box>
                            <Box className="PrivateHoldingCardsWrapper">
                                <PrivateHoldingCards fetchPrivateHoldingsList={fetchPrivateHoldingsList}/>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Layout>
        </>
    )
}

export default privateHolding
