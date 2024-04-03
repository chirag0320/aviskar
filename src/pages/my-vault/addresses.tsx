import React, { useState } from "react"
import { Box, Button, Container, Stack, Typography } from "@mui/material"
import { PageTitle } from "@/components/common/Utils"
import Seo from "@/components/common/Seo"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { ENDPOINTS } from "@/utils/constants"
import { getTopicDetails } from "@/redux/reducers/topicReducer"
import { useAppSelector } from "@/hooks"
import Layout from "@/components/common/Layout"
import Loader from "@/components/common/Loader"
import { AddressCard } from "@/components/common/Card"
import UpdateAddress from "@/components/partials/checkout/UpdateAddress"
import { PlusIcon } from "../../assets/icons/index"

function Addresses(paramsData: any) {
  const { topicDetails, loading } = useAppSelector(state => state.topic)
  useAPIoneTime({ service: getTopicDetails, endPoint: ENDPOINTS.topicDetail?.replace('{{topic-name}}', paramsData?.params?.['topic-name']) })


  const [updateAddress, setUpdateAddress] = useState<boolean>(false)


  const handleUpdateAddress = () => {
    setUpdateAddress(true);
  }
  const handleCloseUpdateAddress = () => {
    setUpdateAddress(false);
  }
  return (
    <>
      <Loader open={loading} />
      {!loading && <Layout>
        <Seo
          keywords={[`QMint Topics`]}
          title="Address"
          lang="en"
        />
        <PageTitle title="Addresses" backToDashboard={true} />

        <Box className="AddressesPage">
          <Container>
            <Box className="AddressList">
              <Box sx={{ textAlign: 'right' }}>
                <Button onClick={handleUpdateAddress} variant="outlined" startIcon={<PlusIcon />}>Add new</Button>
              </Box>
              <Box className="AddressListWrapper">
                <AddressCard showDelete={true} />
              </Box>
            </Box>
            <UpdateAddress dialogTitle="Add new address" open={updateAddress} onClose={handleCloseUpdateAddress} />
          </Container>
        </Box>
      </Layout>}
    </>
  )
}

export default Addresses