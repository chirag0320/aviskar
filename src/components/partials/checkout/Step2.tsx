import React, { useState } from "react"
import { Box, Checkbox, FormControlLabel, IconButton, MenuItem, Select, Stack, Typography } from "@mui/material"

// Type
import type { SelectChangeEvent } from "@mui/material"

// Componenets
import StepWrapper from "./StepWrapper"
import { CartCard } from "@/components/common/Card"
import { InfoIcon, SelectDropdown } from "@/assets/icons"
import { HoverTooltip } from "@/components/common/CustomTooltip"
import { productImages } from "@/utils/data"
import { useAppSelector } from "@/hooks"

function Step2() {
  // const {checkoutPageData} = useAppSelector((state)=>state.checkoutPage)
  // console.log("🚀 ~ Checkout ~ checkoutPageData:", checkoutPageData)
  const [deliveryMethod, setDeliveryMethod] = useState<string>('DifferentMethod')
  const handleDeliveryMethod = (event: SelectChangeEvent) => {
    setDeliveryMethod(event.target.value as string);
  }
  return (
    <StepWrapper title="Step 2" className="Step2">
      <Box className="StepHeader">
        <Stack className="HeaderWrapper">
          <Typography className="Title" variant="subtitle1">
            Delivery Method
            <HoverTooltip
              placement="right"
              renderComponent={<IconButton className="InfoButton"><InfoIcon /></IconButton>}
              infoTooltip
              arrow
            >
              This is a helper text to justify pricing discount.
            </HoverTooltip>
          </Typography>
          <Select
            color="secondary"
            className="DeliveryMethodSelect"
            value={deliveryMethod}
            onChange={handleDeliveryMethod}
            IconComponent={SelectDropdown}
          >
            <MenuItem value="DifferentMethod">Different Method</MenuItem>
            <MenuItem value="SecureShipping">Secure Shipping</MenuItem>
            <MenuItem value="VaultStorage">Vault Storage</MenuItem>
          </Select>
        </Stack>
        <FormControlLabel
          className="DeliveryCheckbox"
          control={<Checkbox />}
          label="Select different delivery method for products"
        />
      </Box>
      <Stack className="ProductList">
        {[
    {
        "id": 20206,
        "shoppingCartTypeId": 1,
        "customerId": 74038,
        "productId": 6134,
        "storeCode": 12,
        "quantity": 1,
        "productName": "1oz Queensland Mint Silver Crown",
        "shortDescription": "Stunning Silver Crown with Ultra Shine",
        "friendlypagename": "1oz-queensland-mint-silver-crown",
        "imageUrl": "https://qmintstoremedia.blob.core.windows.net/pictures/products/queensland-mint-silver-crown-story_120320242303434.jpeg?sv=2018-03-28&sr=b&sig=ueMA3EBSQsOygx2mJnnVTm3wI5OxBdV7eywwEwbMPmA%3D&st=2024-03-11T13%3A48%3A43Z&se=3024-03-12T13%3A48%3A43Z&sp=r&c=638458481234177677",
        "productPrice": 0,
        "premiumDiscount": 0,
        "productWeight": 31.1,
        "parentProductId": 1221,
        "colorClass": "green-circle",
        "iconClass": "fa fa-check-circle",
        "availability": "In Stock",
        "shippingInfo": "Ships by Mar 28 2024 12:00AM or collect immediately",
        "stock": 17074,
        "shippingMethod": [
            1,
            2,
            3
        ],
        "shippableCountrys": [
            6
        ],
        "LivePriceDetails": {
            "productId": 6134,
            "price": 46.62,
            "discount": 0,
            "productLowestPrice": 36.62,
            "tierOff": 10,
            "taxPrice": 3.33,
            "tierPriceList": [
                {
                    "fromQty": 1,
                    "toQty": 19,
                    "price": 46.52,
                    "discount": 0,
                    "taxPrice": 4.23
                },
                {
                    "fromQty": 20,
                    "toQty": 99,
                    "price": 44.32,
                    "discount": 0,
                    "taxPrice": 4.03
                },
                {
                    "fromQty": 100,
                    "toQty": 499,
                    "price": 42.12,
                    "discount": 0,
                    "taxPrice": 3.83
                },
                {
                    "fromQty": 500,
                    "toQty": 999,
                    "price": 41.02,
                    "discount": 0,
                    "taxPrice": 3.73
                },
                {
                    "fromQty": 1000,
                    "toQty": 999999,
                    "price": 36.62,
                    "discount": 0,
                    "taxPrice": 3.33
                }
            ]
        }
    },
    {
        "id": 18235,
        "shoppingCartTypeId": 1,
        "customerId": 74038,
        "productId": 3287,
        "storeCode": 12,
        "quantity": 1,
        "productName": "1oz Queensland Mint Kangaroo Gold Cast bar",
        "shortDescription": "#1 customer choice in gold bars",
        "friendlypagename": "1oz-queensland-mint-gold-cast-bar",
        "imageUrl": "https://qmintstoremedia.blob.core.windows.net/pictures/products/1oz-Queensland-Mint-Gold-Cast-Bar-Front-min_120320242303248.png?sv=2018-03-28&sr=b&sig=6XDtoxPWueW9OQgCGgjtlAtPeQW9MNeVZIfm35BSCB4%3D&st=2024-03-11T13%3A47%3A24Z&se=3024-03-12T13%3A47%3A24Z&sp=r&c=638458480448154933",
        "productPrice": 0,
        "premiumDiscount": 0,
        "productWeight": 31.1,
        "parentProductId": 314,
        "colorClass": "green-circle",
        "iconClass": "fa fa-check-circle",
        "availability": "Available to Order",
        "shippingInfo": "Ship or collect after Apr  4 2024 12:00AM",
        "stock": 306,
        "shippingMethod": [
            1,
            2,
            3
        ],
        "shippableCountrys": [
            6
        ],
        "LivePriceDetails": {
            "productId": 3287,
            "price": 3396.53,
            "discount": 0,
            "productLowestPrice": 3396.53,
            "tierOff": 0,
            "taxPrice": 0,
            "tierPriceList": []
        }
    }
].map((cartItem) => {
          return (
            <CartCard key={cartItem.productId} cartItem={cartItem} hideDeliveryMethod={false} hideRightSide={true} quantity={100} increaseQuantity={()=>{}} decreaseQuantity={()=>{}} removeItem={()=>{}} />
          )
        })}
      </Stack>
      <Typography className="StepNote"><Typography variant="titleLarge">Note:</Typography> Prices are live prices and will be locked on confirm order. </Typography>
    </StepWrapper>
  )
}

export default Step2