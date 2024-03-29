import React, { useState } from 'react'
import Seo from "../components/common/Seo"
import Layout from "@/components/common/Layout";
import { Box, Container } from "@mui/material"
import { PageTitle } from "@/components/common/Utils"
import { getShoppingCartData } from '@/redux/reducers/shoppingCartReducer';
import { ENDPOINTS } from '@/utils/constants';
import useAPIoneTime from '@/hooks/useAPIoneTime';
import CartDetails from '@/components/partials/shopping-cart/CartDetails';
import CartOrderSummary from '@/components/partials/shopping-cart/CartOrderSummary';
import Toaster from '@/components/common/Toaster'
import { useAppSelector } from '@/hooks';
import ShoppingCartComponent from '@/components/partials/shopping-cart/ShoppingCartComponent';


function ShoppingCart() {
    const openToaster = useAppSelector(state => state.homePage.openToaster)

    useAPIoneTime({
        service: getShoppingCartData, endPoint: ENDPOINTS.getShoppingCartData, body: {
            "search": "",
            "pageNo": 0,
            "pageSize": -1,
            "sortBy": "",
            "sortOrder": "",
            "filters": {}
        }
    });

    return (
        <Layout>
            <>
                {openToaster && <Toaster />}
                <Seo
                    keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
                    title="Home"
                    lang="en"
                />
                <Box id="ShoppingCart" component="section" className='ShoppingCartPage'>
                    <Box className="TitleWrapper">
                        <PageTitle title="Shopping cart" />
                    </Box>
                    <Container>
                        <ShoppingCartComponent />
                    </Container>
                </Box>
            </>
        </Layout>
    )
}

export default ShoppingCart
