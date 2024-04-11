import React from "react";
import { Box, Container, Divider } from "@mui/material";
import { PageTitle } from "@/components/common/Utils";
import OrderDateStatusSelector from "@/components/partials/my-vault/OrderDateStatusSelector";
import OrderDetailsCard from "@/components/partials/my-vault/OrderDetailsCard";
import Seo from "@/components/common/Seo";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { ENDPOINTS } from "@/utils/constants";
import { getTopicDetails } from "@/redux/reducers/topicReducer";
import { useAppSelector, useAppDispatch } from "@/hooks";
import Layout from "@/components/common/Layout";
import Loader from "@/components/common/Loader";
import { useEffect } from "react";
import { getOrderHistory } from "@/redux/reducers/myVaultReducer";
import { requestBodyOrderHistory } from "./buy-back-order-history";

function OrderHistory() {
  const loading = useAppSelector(state => state.myVault.loading)
  const dispatch = useAppDispatch();
  const orderHistoryDetails = useAppSelector((state) => state.myVault.orderHistory);

  useEffect(() => {
    dispatch(
      getOrderHistory({
        url: ENDPOINTS.getOrderHistory,
        body: { ...requestBodyOrderHistory, pageSize: -1 },
      })
    );
  }, []);
  // useAPIoneTime({service : getOrderHistory , endPoint : ENDPOINTS.getOrderHistory , body :{ ...requestBodyDefault, filters: {} } })

  return (
    <>
      <Loader open={loading} />
      <Layout>
        <Seo
          keywords={[`QMint OrderHistory`]}
          title="Order History"
          lang="en"
        />
        <PageTitle title="Orders" backToDashboard={true} />
        <Box
          id="OrderHistoryPage"
          className="OrderHistoryPage"
          component="section"
        >
          <Container>
            <Box className="Content OrderHistoryContent">
              <Divider />
              <OrderDateStatusSelector orderHistoryType="normal" />
              <Divider />
              <Box className="OrderDetailsCardsWrapper">
                <OrderDetailsCard orderHistoryDetails={orderHistoryDetails} />
              </Box>
            </Box>
          </Container>
        </Box>
      </Layout>
    </>
  );
}

export default OrderHistory;
