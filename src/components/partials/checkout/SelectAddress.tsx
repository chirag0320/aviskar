
import React, { useEffect, useState } from "react"
import { MenuItem, Select, Typography } from "@mui/material"

// Type
import type { SelectChangeEvent } from "@mui/material"

// Assets
import { SelectDropdown } from "@/assets/icons"

// Componenets
import StyledDialog from "@/components/common/StyledDialog"

interface SelectAddress {
  open: boolean
  onClose: () => void
  listOfAddress: any
  handleAddressUpdate: any
  isbillingAddress: boolean
  defaultSelectedAddress?: string
}
export type address = {
  "addressId": number,
  "addressType": number,
  "customerId": number,
  "firstName": string,
  "lastName": string,
  "addressLine1": string,
  "addressLine2": string,
  "city": string,
  "state": number,
  "postcode": number,
  "country": number,
  "phone1": string,
  "email": string,
  "isSource": string,
  "isVerified": true,
  "company": null,
  "isactive": true,
  "storeCode": number,
  "stateName": string,
  "countryName": string
}


function SelectAddress(props: SelectAddress) {
  const { open, onClose, listOfAddress, handleAddressUpdate, isbillingAddress, defaultSelectedAddress } = props
  // console.log("🚀 ~ SelectAddress ~ listOfAddress:", listOfAddress)
  const [selectAccount, setSelectAccount] = useState<string>(defaultSelectedAddress ?? "")

  const handleSelectAccount = (event: SelectChangeEvent) => {
    setSelectAccount(event.target.value as string);
    handleAddressUpdate(event.target.value, isbillingAddress)
    onClose();
  }

  useEffect(() => {
    const x = document.getElementById('menu-')
    x?.addEventListener('click', () => {
      onClose()
    })
  }, [])

  return (
    <StyledDialog
      id="SelectAddress"
      open={open}
      dialogTitle="Select Address"
      onClose={onClose}
      primaryActionText="Save"
    >
      <Select
        open
        color="secondary"
        className="AccountSelect"
        value={selectAccount}
        onChange={handleSelectAccount}
        IconComponent={SelectDropdown}
        fullWidth
        MenuProps={{
          disablePortal: true,
        }}
      >
        {
          listOfAddress?.length > 0 && listOfAddress?.map((address: address) => <MenuItem value={address as any}><Typography variant="titleLarge">{address?.firstName} {address.lastName}</Typography>{address.addressLine1}, {address.addressLine2}, {address.city}, {address.postcode} {address.countryName}</MenuItem>)
        }
      </Select>
    </StyledDialog>
  )
}

export default SelectAddress