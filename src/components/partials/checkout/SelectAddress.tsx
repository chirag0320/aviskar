
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
}


function SelectAddress(props: SelectAddress) {
  const { open, onClose } = props
  const [selectAccount, setSelectAccount] = useState<string>('Address1')
  const handleSelectAccount = (event: SelectChangeEvent) => {
    setSelectAccount(event.target.value as string);
  }
  const x = document.getElementById('menu-')
  useEffect(() => {
    x?.addEventListener('click', () => {
      onClose()
    })
  }, [x])
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
      >
        <MenuItem value="Address1"><Typography variant="titleLarge">Steve Test 1</Typography>59, McMullen Road, Brookfield, 4069 Australia</MenuItem>
        <MenuItem value="Address2"><Typography variant="titleLarge">Steve Test 2</Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit.</MenuItem>
        <MenuItem value="Address3"><Typography variant="titleLarge">Steve Test 3</Typography>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit dolorem ipsam quae nostrum laborum minima.</MenuItem>
      </Select>
    </StyledDialog>
  )
}

export default SelectAddress