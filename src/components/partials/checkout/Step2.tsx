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

function Step2() {
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
        {productImages.map((product) => {
          return (
            <CartCard data={product} />
          )
        })}
      </Stack>
      <Typography className="StepNote"><Typography variant="titleLarge">Note:</Typography> Prices are live prices and will be locked on confirm order. </Typography>
    </StepWrapper>
  )
}

export default Step2